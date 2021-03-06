import { useState, useEffect } from 'react'

//const { useState, useEffect } = wp.element
import {
	gql,
	useMutation
} from '@apollo/client'
import { Field, Formik } from 'formik'
/// --> these modules are fgor interacting with Student Hub's GraphQL
import { customAlphabet } from 'nanoid'
import PropTypes from 'prop-types'
import NumberFormat from 'react-number-format'
import Select from 'react-select' //maybe use instead
import * as Yup from 'yup'
import './form.scss'





const customStyles = {
	placeholder: ( provided, state ) => {
		const color = '#666'
		return { ...provided, color }
	}
}

/// --> Student Hub needs a unique request ID. We use the customAlphabet function from nanoid to generate this

const getId = customAlphabet(
	"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
	12
)

/// --> this will be the request's id for Student Hub
const leadId = getId()

/// --> Apollo/GraphQL set up for Student Hub

/// --> Student Hub GraphQL needs a Mutation sent as the query in order to add a lead

const leadFormSend = gql`
  mutation leadformsend($leadInput: CreateLeadInput!) {
	  createLead(lead: $leadInput)
	}
`

/// --> Phone Number Field Formatter

function NumberFormatCustom( props ) {
	const { inputRef, onChange, ...other } = props

	return (
		<NumberFormat
			{...other}
			getInputRef={inputRef}
			onValueChange={( values ) => {
				onChange( {
					target: {
						name: props.name,
						value: values.value,
					},
				} )
			}}
			format="(###) ###-####" mask="_"
		/>
	)
}

NumberFormatCustom.propTypes = {
	inputRef: PropTypes.func.isRequired,
	name: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
}

const renameKeys = ( oldProp, newProp, { [oldProp]: old, ...others } ) => ( {
	[newProp]: old,
	...others
} )

function decorateUrl( urlString ) {
	var ga = window[window['GoogleAnalyticsObject']]
	var tracker
	if ( ga && typeof ga.getAll === 'function' ) {
		tracker = ga.getAll()[0] // Uses the first tracker created on the page
		urlString = ( new window.gaplugins.Linker( tracker ) ).decorate( urlString )
	}
	return urlString
}

/// -->> Helper function to get element position in the document
function offsetScroll( el, offset = 0 ) {
	var rect = el.getBoundingClientRect(),
		scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
		scrollTop = window.pageYOffset || document.documentElement.scrollTop
	const elTop = rect.top + scrollTop
	window.scrollTo( {
		top: ( elTop - offset ),
		left: 0,
		behavior: 'smooth'
	} )
}


/// -->> Persistent Param Cookie Reader
function getPersistCookie( cname ) {
	var name = cname + "="
	var decodedCookie = decodeURIComponent( document.cookie )
	var ca = decodedCookie.split( ';' )
	for ( var i = 0; i < ca.length; i++ ) {
		var c = ca[i]
		while ( c.charAt( 0 ) == ' ' ) {
			c = c.substring( 1 )
		}
		if ( c.indexOf( name ) == 0 ) {
			let cSub = c.substring( name.length, c.length )

			return cSub.substring( cSub.indexOf( '?' ) )
		}
	}
	return ""
}
//// Landing Page form refresh not using current state in React Select and Formik
/// Does Formik Initial values need to refresh, or is it React Select that is not rehydrating after render

/// --> Begin the function to build the form

export default function FormPanel( props ) {
	const {
		midpoint,
		origin,
		redirect,
		programFocus,
		formtype,
		formFocus,
		programSelect,
		clientPrefix,
		campusCode,
		partnerCode,
		clientCTPA,
		defaultPhone,
		cid,
		dataType
	} = props

	//console.log(cid, dataType,'form attr')
	const searchVars = {}
	const location = window.location

	/// -->> check for utm_source in query. if not there, set to null	
	const urlParams = ( location.search.search( 'utm_source' ) >= 0 ) ? location.search : null

	/// -->>check for cookie if no valid location query
	const persistParams = ( urlParams !== null ) ? urlParams : getPersistCookie( '__gtm_campaign_url' )

	const searchParams = ( persistParams ) ? new URLSearchParams( persistParams ) : ''
	if ( searchParams ) {
		for ( var item of searchParams.entries() ) {
			searchVars[item[0]] = decodeURIComponent( item[1] ).toUpperCase()
		}
	}
	///serialize search vars string for use in urls	
	let searchString = Object.entries( searchVars ).map( ( [key, val] ) => `${ key }=${ encodeURIComponent( val ) }` ).join( '&' )

	/// --> detect testing flags in url. and set test values as needed 
	const testLead = ( searchVars.testform ) ? true : false
	const testDirect = ( testLead && searchVars.redirect ) ? true : false  //only set to true if testform flag is present


	const [createLead, { data }] = useMutation( leadFormSend )


	const [state, setState] = React.useReducer(
		( state, newState ) => ( { ...state, ...newState } ),
		{
			formData: {
				firstName: '',
				lastName: '',
				email: '',
				phoneNumber: '',
				//programCode:'',
				location: props.location,
			},
			submitted: false,
			request: false
		}
	)

	const inputLabel = React.useRef( null )

	const [programCode, setProgramCode] = useState( programFocus )

	/// -->> this refreshes the state when the programSelect prop changes. 
	useEffect( () => {
		setProgramCode( programSelect )
	}, [programSelect] )


	/// --> build program list for the select form element. this has to be an array of objects
	let initialProgram = { value: '', label: 'Select...' }
	let ProgramsSelectList = []
	for ( const program in aeopr_settings?.programsList ) {
		let programObj = aeopr_settings?.programsList[program]
		if ( programObj.value === programFocus ) {
			initialProgram = programObj
		}

		ProgramsSelectList.push( aeopr_settings?.programsList[program] )
	}
	/// -->> Define validation schema

	//// -->> Need validation of react-select 

	const phoneRegExp = /^\((?=(\d))(?=[2-9])(?!\1{3})(?!\d11)[\d]{3}\) [\d]{3}-[\d]{4}$/
	const validateSchema = Yup.object().shape( {
		email: Yup.string()
			.email()
			.required( 'We will need a valid email address' ),
		firstName: Yup.string()
			.required( "We'll need your first name" ),
		lastName: Yup.string()
			.required( "We'll need your last name" ),
		phoneNumber: Yup.string()
			.required( "We'll need your phone number" )
			.matches( phoneRegExp, "A valid phone number is needed" )

	} )
	return (

		<section className="formPanel">
			<span className="spacer" id="leadform" />
			<div className={['formBox'].join( ' ' )}>
				{searchVars.testform && ( <span>TEST LEAD</span> )}

				<div className={["successContainer", state.submitted ? '' : 'hide'].join( ' ' )}>
					<h3>Thank you for your request.</h3>
					<h4>We have received your request and will contact you shortly</h4>
				</div>
				<Formik
					enableReinitialize={true}
					initialValues={{
						email: '',
						firstName: '',
						lastName: '',
						phoneNumber: '',
						programCode: { programCode },
						programs: '',
						request: false,
						isSingle: props.isSingle || false
					}}
					onSubmit={( values, { setSubmitting } ) => {


						////// ---- BEING SUBMISSION FUNCTION ---- //////	
						/// *** Move to external function ***///					
						/** while sumbmitting and waiting for a repsonse, show spinner
						on response, if success, redirect to viewdo, else show thankyou message */

						setState( { request: true } )


						/// --> Set dataLayer value based on form
						const dataLayerType = ( formFocus === 'applyForm' ) ? 'Start Application Button Click' : 'Request Info Button Click'

						/// -->> Set the dataLayer for the button click event						
						if ( values.request !== true && typeof window != 'undefined' ) {
							window.dataLayer.push( { event: dataLayerType } )
						}

						const sourceCode = searchVars.utm_source || 'UNKNOWN'
						//cleanse phone number of non-numeric characters .replace(/\D/g,'')
						const body = {
							'captureUrl': location.href,
							'leadId': leadId,
							'partnerCode': partnerCode, /// Need to be variable
							'collegeCode': clientPrefix, /// Need to be variable
							'campusCode': campusCode, /// Need to be variable
							'sourceCode': sourceCode,
							'programCode': programCode || clientPrefix + '_UNDERGRAD_UNDECIDED', /// Need to be variable
							'phoneNumberCountry': 'US',
							'formType': origin,
							'email': values.email,
							'phoneNumber': values.phoneNumber,
							'firstName': values.firstName,
							'lastName': values.lastName,
							'deviceType': searchVars.utm_device || 'UNKNOWN',
							"isTestLead": testLead,
							'sourceTracking': {
								'campaignName': searchVars.utm_campaign || undefined,
								'adGroupId': searchVars.utm_adgroup || undefined,
								'keyword': searchVars.utm_term || undefined,
								'matchType': searchVars.matchtype || undefined,
								'network': searchVars.network || undefined,
								'creativeId': searchVars.creative || undefined,
								'placement': searchVars.placement || undefined,
								'target': searchVars.target || undefined,
								'feedItemId': searchVars.feeditemid || undefined,
								'agencyTrackingCode': searchVars.agencytrackingcode || undefined,
								'adGroupId': searchVars.adgroup_id || undefined
							}
						}

						let crmData = ( formtype == "crm" ) ? [
							"firstname=" + encodeURIComponent( values.firstName ),
							"lastname=" + encodeURIComponent( values.lastName ),
							"email=" + encodeURIComponent( values.email ),
							"phone=" + encodeURIComponent( values.phoneNumber ),
							"ocid=" + encodeURIComponent( programCode ),
							"leadsource=" + encodeURIComponent( sourceCode ),
							"captureurl=" + encodeURIComponent( location.href ),
							"tcpaconsent=" + true,
							searchString
							//academiclevel

						] : ''

						/// -->> Google CrossDomain Tracking for handoff to redirect
						/// -->> Add these query parameters to any links that point to a separate tracked domain
						let crossDomainTrackingParams = ''
						var _hsq = window._hsq = window._hsq || []
						_hsq.push( ['addIdentityListener', function ( hstc, hssc, hsfp ) {


							crossDomainTrackingParams = '&__hstc=' + hstc + '&__hssc=' + hssc + '&__hsfp=' + hsfp
						}] )


						/// -->> Set Redirect url if redirect prop is true
						let redirectTarget = ( redirect ) ? decorateUrl( redirect + crmData.join( '&' ) + crossDomainTrackingParams ) : null


						/// -->> if you want to test with no redirect...
						if ( !testDirect && testLead ) {
							redirectTarget = null
						}

						/// -->> Create Lead via apollo UseMutuation hook

						createLead( { variables: { leadInput: body } } ).then( ( response ) => {
							setSubmitting( false )
							//put redirect on creatlead:true
							if ( response.data.createLead === true ) {
								( redirectTarget ) ? window.location.href = redirectTarget : setState( { 'submitted': true } )
							}
						} ).catch( ( e ) => {
							console.log( e.message, 'message' )

						} )

					}}

					////// ---- END SUBMISSION FUNCTION ---- //////

					/// -->> Formik Validation Schema

					validationSchema={validateSchema}
				>


					{( props ) => {
						const {
							values,
							touched,
							errors,
							isSubmitting,
							handleChange,
							handleBlur,
							handleSubmit,
							setFieldValue,
							programs,
							programCode
						} = props

						return (
							<>
								<div className={["form_overlay", isSubmitting === true ? '' : 'hide'].join( ' ' )}>
									<div className="loader">
										<h4>Sending Request</h4>
									</div>
								</div>

								<form
									onSubmit={handleSubmit}
									className={[state.submitted ? 'hide' : ''].join( ' ' )}
									id={formFocus}>
									<div className="form-body">
										<div className="form-group">
											<div

												className={[
													' selectControl',
													values.isSingle ? "single-program" : ""]
													.join( ' ' )
												}>

												<label
													htmlFor="programCode"
													id={`programs-label-${ cid }`}>

													Select a Program

												</label>
												<Select
													id={`programCode-${ cid }`}
													className="program-select"
													name="programCode"
													aria-labelledby={`programs-label-${ cid }`}
													value={programCode}
													defaultValue={initialProgram}
													options={ProgramsSelectList}
													//menuPlacement="auto"
													menuShouldScrollIntoView={true}
													onFocus={() => {
														//(window.innerWidth< 1024)&&
														( cid !== 'modal-form' ) &&
															offsetScroll( document.querySelector( `#${ formFocus }` ), 60 )

													}}
													onChange={selectedOption => {
														let event = { target: { name: 'programCode', value: selectedOption.value } }
														setProgramCode( selectedOption.value )

														//handleChange(selectedOption);     
													}}
													styles={customStyles}
												>
												</Select>
												{
													( errors.programCode && touched.programCode ) &&
													( <div className="errortext">{errors.programCode}</div> )
												}



											</div>
										</div>
										<div className="form-group">
											<label id={`firstName-${ cid }`}>First Name</label>
											<Field
												name="firstName"
												id="firstName"
												aria-labelledby={`firstName-${ cid }`}
												className={['textfield'].join( ' ' )}
												value={values.firstName}
												onChange={handleChange}
												onBlur={handleBlur}

											/>
											{
												( errors.firstName && touched.firstName ) &&
												( <div className="errortext">{errors.firstName}</div> )
											}
										</div>
										<div className="form-group">
											<label id={`lastName-${ cid }`}>Last Name</label>
											<Field
												name="lastName"
												id="lastName"
												aria-labelledby={`lastName-${ cid }`}
												className={['textfield'].join( ' ' )}
												value={values.lastName}
												onChange={handleChange}
												onBlur={handleBlur}
											/>
											{
												( errors.lastName && touched.lastName ) &&
												( <div className="errortext">{errors.lastName}</div> )
											}
										</div>
										<div className="form-group">
											<label id={`email-${ cid }`}>Email Address</label>
											<Field
												type="email"
												id="email"
												name="email"
												aria-labelledby={`email-${ cid }`}
												onChange={handleChange}
												onBlur={handleBlur}
											/>
											{
												( errors.email && touched.email ) &&
												( <div className="errortext">{errors.email}</div> )
											}
										</div>
										<div className="form-group">
											<label id={`phoneNumber-${ cid }`}>Phone</label>
											<NumberFormat
												autoComplete="tel-national"
												id="phoneNumber"
												name="phoneNumber"
												aria-labelledby={`phoneNumber-${ cid }`}
												type="tel"
												value={values.phoneNumber}
												onChange={
													handleChange( 'phoneNumber' )
												}
												onBlur={handleBlur}
												format="(###) ###-####" mask="_"
											/>
											{
												( errors.phoneNumber && touched.phoneNumber ) &&
												( <div className="errortext">{errors.phoneNumber}</div> )
											}

										</div>

									</div>

									<div className="leadform-actions">
										<div className="form-group">
											<button
												type="submit"
												fullWidth
												variant="contained"
												color="primary"
												className={['aeopr-button', 'aeopr-primary-button', 'aeopr-send-button', props.buttonClass].join( ' ' )}

											>
												Request Info
											</button>
											<p className="ctaSection">
												or call <a className="mobile-only phone-link" href={`tel:+1 ${ defaultPhone }`}>
													{defaultPhone}</a>
												<span className="desktop-only">{defaultPhone}</span>
											</p>
											<div className=" legal-text ctpaText">
												<p >{clientCTPA}</p>
											</div>
										</div>
									</div>
								</form>
							</>
						)
					}}
				</Formik>
			</div>
		</section>
	)
}