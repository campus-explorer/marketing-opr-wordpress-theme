import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import NumberFormat from 'react-number-format'
import {Formik, Field, Form, useField} from 'formik';
import * as Yup from 'yup';
import Select from 'react-select' //maybe use instead
import Cookies from 'universal-cookie';
const cookies = new Cookies();


/// --> these modules are for interacting with Student Hub's GraphQL
import {customAlphabet} from 'nanoid'
import {  
	gql,
	useMutation
} from '@apollo/client';
/// --> Student Hub needs a unique request ID. We use the customAlphabet function from nanoid to generate this

const getId = customAlphabet(
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
  12
);
/* this will be the request's id for Student Hub
* Apollo/GraphQL set up for Student Hub
* Student Hub GraphQL needs a Mutation sent as the query in order to add a lead
*/
const leadFormSend = gql`
  mutation leadformsend($leadInput: CreateLeadInput!) {
	  createLead(lead: $leadInput)
	}
`


import './form.scss'

const customStyles = {
   placeholder: (provided, state) => {
    const color = '#666';
    return { ...provided, color };
  }
 }

/// --> Phone Number Field Formatter

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      format="(###) ###-####" mask="_"
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

/// <--- End Phone Number Field Formatter


/*** Google Analtyics Helpers ***/
/// ---> Decorate URL function for Google Analytics	
function decorateUrl(urlString) {
  var ga = window[window['GoogleAnalyticsObject']];
  var tracker;
  if (ga && typeof ga.getAll === 'function') {
    tracker = ga.getAll()[0]; // Uses the first tracker created on the page
    urlString = (new window.gaplugins.Linker(tracker)).decorate(urlString);
  }
  return urlString;
}
/// <--- End Decorate URL function for Google Analytics

/// ---> Persistent Param Cookie Reader
function getPersistCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
	  let cSub = c.substring(name.length, c.length);
	  
      return cSub.substring(cSub.indexOf('?'));
    }
  }
  return "";
}
/// <--- End Persistent Param Cookie Reader



/// ---> Helper function to get element position in the document
function offsetScroll(el, offset=0) {
    var rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const elTop = rect.top + scrollTop;
    window.scrollTo({
		top: (elTop - offset),
		left: 0,
		behavior: 'smooth'
	})
}
/// <--- End Helper function to get element position in the document


/// ---> Select field for form with validation
function SelectInput({ label, ...props }) {
  const [field, meta, { setValue, setTouched }] = useField(props);
  const onChange = ({ value }) => {
    setValue(value);
  };
  return (

      <Select
		id={`programCode-${props.cid}`}
		key={`selected-${props.programCode}`}
		className="program-select"
		
		aria-labelledby={`programs-label-${props.cid}`}
		placeholder = "Select Program..."
		options={props.options}
		menuShouldScrollIntoView={true}
		onFocus={()=>{
			(props.cid!=='modal-form')&&
			offsetScroll(document.querySelector(`#${props.formFocus}`),60);
			
		}}
		onChange={onChange}
        onBlur={setTouched}
		styles={customStyles}
		>									        
    </Select>
    )
}
/// <--- End Select field for form with validation

/// -->> Define validation schema

const phoneRegExp = /^\((?=(\d))(?=[2-9])(?!\1{3})(?!\d11)[\d]{3}\) [\d]{3}-[\d]{4}$/;
const validateSchema = Yup.object().shape( 
	{
		email: Yup.string()
			.email()
			.required( 'We will need a valid email address' ),
		firstName: Yup.string()
			.required( "We'll need your first name" ),
		lastName: Yup.string()
			.required( "We'll need your last name" ),
		phoneNumber: Yup.string()
			.required( "We'll need your phone number" )
			.matches( phoneRegExp, "A valid phone number is needed" ),
		programCode: Yup.string()
            .required("Let us know what program you are interested in")
            .nullable(),
          
    })
  

/// --> Begin the function to build the form
	
export default function FormPanel(props){
	const { 
		midpoint, 
		origin, 
		redirect,
		formtype,
		formFocus,
		programFocus,
		programSelect,
		programList,
		clientPrefix,
		campusCode,
		collegeCode,
		campusToggle, //boolean
		partnerCode,
		clientCTPA,
		defaultPhone,
		cid,
		dataType
		} = props;


	const searchVars = {};
	const location = window.location;
	
/// !!! TODO: make test flag detection a function outside the main render !!!///
	
/// --> detect testing flags in url. and set test values as needed 
	const isTestLead = (location.search.search('testform')>=0)?true:false;
	const TestLeadSignal=()=>(isTestLead)?<span>TESTING MODE</span>:false;
	const doTestRedirect = (isTestLead && location.search.search('redirect')>=0)?true:false;
	
/// -->> check for utm_source in query. if not there, set to null	
	const urlParams = (location.search.search('utm_source')>=0)?location.search:null;

/// -->>check for cookie if no valid location query
	const persistParams = (urlParams!==null)?urlParams:getPersistCookie('__gtm_campaign_url');

	const searchParams = (persistParams)?new URLSearchParams(persistParams):'';
	if(searchParams){
		for(var item of searchParams.entries()){
			searchVars[item[0]]=decodeURIComponent(item[1]).toUpperCase();
		}
	}
	
/// ---> serialize search vars string for use in urls	
	let searchString = Object.entries(searchVars).map(([key, val]) => `${key}=${encodeURIComponent(val)}`).join('&');
	


/// ---> Creates Mutation of submitted data for Student Hub

	const [createLead, { data }] = useMutation(leadFormSend);

/// ---> Set default states	
	const [state, setState] = React.useReducer(
	    (state, newState) => ({...state, ...newState}),
	    {formData:{
		    firstName:'',
			lastName:'',
			email:'',
			phoneNumber:'',
			location:props.location,
			},
		submitted:false,
		request:false
		}
	  )

	const inputLabel = React.useRef(null);
	const [campusLocation, setCampusLocation] = useState(campusCode);
	const [programCode, setProgramCode] = useState(programSelect); ///state for only the program code string for Student Hub and the index of ProgramList
	const [programObj, setProgramObj] = useState();///state for the program object for react-select

/// -->> this refreshes the state when the programSelect prop changes. 
	useEffect(() => {
	      setProgramCode(programSelect);
	  }, [programSelect])
	  
	 
	  	 

/// --> build program list for the select form element. this has to be an array of objects
/// !!! TODO: move this to external function, pass in programList !!!///
	let ProgramsSelectList= [];
	for(const program in programList){
		const programOption = {
			label:programList[program]['label'],
			value: program
			}
		ProgramsSelectList.push(programOption)///push each object into the Select List for react-select... {value, label}
	}        
    		
	return(

		<section className="formPanel" data-version={props.formversion}>
		      <span className="spacer" id="leadform"/>
		      <div className={['formBox'].join(' ')}>
		      	<TestLeadSignal/>
		        

		        <div className={["successContainer",state.submitted?'':'hide'].join(' ')}>
					<h3>Thank you for your request.</h3>
					<h4>We have received your request and will contact you shortly</h4>
				</div>
				 <Formik
			 		enableReinitialize={true}
			 		initialValues={{ 
				 		email: '', 
				 		firstName: '',
				 		lastName:'', 
				 		phoneNumber: '', 
				 		programCode:programCode,
				 		isSingle:props.isSingle||false
				 		}}
/// !!! TODO: move Submit function out of export
				 		
	                onSubmit={(values, {setSubmitting})=>{						
						/** while sumbmitting and waiting for a repsonse, show spinner
						on response, if success, redirect to viewdo, else show thankyou message */
							
									
						setState({request:true})

						const leadId=getId();
						if(!isTestLead){
						
						/// --> Set dataLayer value based on form
							const dataLayerType = (formFocus==='applyForm')?'Start Application Button Click':'Request Info Button Click';
						
						/// -->> Set the dataLayer for the button click event						
							if(values.request!==true && typeof window != 'undefined'){
								window.dataLayer.push({event:dataLayerType})
							}
						}
						
						const sourceCode = searchVars.utm_source||'UNKNOWN';
						
						// create campus and product codes from selected value
						const campusProgramCodes = values.programCode.split('--');
						let finalProgramCode = values.programCode
						let finalCampusCode = campusCode
						if(campusProgramCodes.length>1){
							//console.log('array')
							finalProgramCode = campusProgramCodes[1];
							finalCampusCode = campusProgramCodes[0]
							
						}
						
											
						const body = {
							'captureUrl': location.href,
							'leadId': leadId,
							'partnerCode':partnerCode, /// Need to be variable
							'collegeCode': collegeCode, /// Need to be variable
							'campusCode': finalCampusCode, /// Need to be variable
							'sourceCode': sourceCode,
							'programCode': finalProgramCode, /// Need to be variable
							'phoneNumberCountry': 'US',
							'formType': origin,
							'email': values.email,
							'phoneNumber': values.phoneNumber,
							'firstName': values.firstName,
							'lastName': values.lastName,
							'deviceType': searchVars.utm_device||'UNKNOWN',
							'isTestLead': isTestLead,
							'sourceTracking': {
								'campaignName': searchVars.utm_campaign||undefined,
								'adGroupId': searchVars.utm_adgroup||undefined,
								'keyword': searchVars.utm_term||undefined,
								'matchType': searchVars.matchtype||undefined,
								'network': searchVars.network||undefined,
								'creativeId': searchVars.creative||undefined,
								'placement': searchVars.placement||undefined,
								'target': searchVars.target||undefined,
								'feedItemId': searchVars.feeditemid||undefined,
								'agencyTrackingCode':  searchVars.agencytrackingcode||undefined,
								'adGroupId': searchVars.adgroup_id||undefined
							}
						};
						
						if(isTestLead) console.log(body,'form');
					
						let crmData = (formtype=="crm")?[
								"firstname="+encodeURIComponent(values.firstName),
								"lastname="+encodeURIComponent(values.lastName),
								"email="+encodeURIComponent(values.email),
								"phone="+encodeURIComponent(values.phoneNumber),
								"ocid="+encodeURIComponent(finalProgramCode),
								"leadsource="+encodeURIComponent(sourceCode),
								"captureurl="+encodeURIComponent(location.href),
								"tcpaconsent="+true,
								"segment="+encodeURIComponent(finalProgramCode),///Legacy parameter
								searchString		
								
							]:'';

						/// -->> Google CrossDomain Tracking for handoff to redirect
						/// -->> Add these query parameters to any links that point to a separate tracked domain
						let crossDomainTrackingParams='';
						var _hsq = window._hsq = window._hsq || [];
						_hsq.push(['addIdentityListener', function(hstc, hssc, hsfp) {
						   crossDomainTrackingParams = '&__hstc=' + hstc + '&__hssc=' + hssc + '&__hsfp=' + hsfp;
						}]);	
						/// -->> Set Redirect url if redirect prop is true
						let redirectTarget = (redirect)?decorateUrl(redirect+crmData.join('&')+crossDomainTrackingParams):null;
						
						/// -->> if you want to test with no redirect...
						if(!doTestRedirect && isTestLead)redirectTarget=null;
						
						/// -->> Create Lead via apollo UseMutuation hook
					
						createLead({ variables: {leadInput:body} }).then((response)=>{
								setSubmitting(false);
								//put redirect on creatlead:true
								if(response.data.createLead===true){
									(redirectTarget)?window.location.href = redirectTarget:setState({'submitted':true})
									}
							}).catch((e)=>{
								console.log(e.message, 'message')
								
							})

					} }
	                
////// ---- END SUBMISSION FUNCTION ---- //////
	                
/// -->> Formik Validation Schema

	                validationSchema={validateSchema}
	              >
	              
	              
	                {(props) => {
	                  const {
	                    values,
	                    touched,
	                    errors,
	                    isSubmitting,
	                    handleChange,
	                    handleBlur,
	                    handleSubmit,
	                    setFieldValue,
	                    programs
	                  } = props;

/// -->> Update ProgramObj state with selected Program List object at corresponding programCode index
	                  	setProgramObj(programList[programCode])
	                  	if(programCode)cookies.set('aeoprSelectedProgram', programCode, {path:'/'})  
	                  	          
	                 return(
						<>
							<div className={["form_overlay",isSubmitting===true?'':'hide'].join(' ')}>
					        	<div className="loader">
				                	<h4>Sending Request</h4>
			                	</div>
				            </div>
							
		                    <form 
		                    	onSubmit={handleSubmit} 
		                    	className={[state.submitted?'hide':'', isSubmitting===true?'submitting':''].join(' ')}
		                    	id={formFocus}>
		                    	<div className="form-body">
									
									<div className="form-group"> 
							            <div 
							           
						            		className={[
							            		' selectControl', 
							            		values.isSingle?"single-program":""]
							            		.join(' ')
							            		}>
								            		
						            		<label
						            			htmlFor="programCode" 
						            			id={`programs-label-${cid}`}>
												
												Select a Program
												
									        </label>
									        <SelectInput 
									        	name="programCode"
									        	options={ProgramsSelectList}
									        	programCode={programCode}
									        	cid={cid}
									        	formFocus={formFocus}
									        />
									        
									        {
										        (errors.programCode && touched.programCode) && 
										        (<div className="errortext">{errors.programCode}</div>)
										     }									       									       
									    </div>
						            </div>
						            <div className="form-group">
						            	<label id={`firstName-${cid}`}>First Name</label>
										<Field								
											name="firstName"
											id="firstName"
											aria-labelledby={`firstName-${cid}`}
											className={['textfield'].join(' ')}
											value={values.firstName}
											onChange={handleChange}
											onBlur={handleBlur}
											
										/>
										{
											(errors.firstName && touched.firstName) && 
											(<div className="errortext">{errors.firstName}</div>)
										}
									</div>
									<div className="form-group">
										<label id={`lastName-${cid}`}>Last Name</label>
										<Field
											name="lastName"
											id="lastName"
											aria-labelledby={`lastName-${cid}`}
											className={['textfield'].join(' ')}
											value={values.lastName}
											onChange={handleChange}
											onBlur={handleBlur}
										/>
										{
											(errors.lastName && touched.lastName) && 
											(<div className="errortext">{errors.lastName}</div>)
										}
									</div>	
									<div className="form-group">
									<label id={`email-${cid}`}>Email Address</label>
										<Field
											type="email"
											id="email"
											name="email"
											aria-labelledby={`email-${cid}`}											
											onChange={handleChange}
											onBlur={handleBlur}
										/>
										{
											(errors.email && touched.email) && 
											(<div className="errortext">{errors.email}</div>)
										}
									</div>
									<div className="form-group">
										<label id={`phoneNumber-${cid}`}>Phone</label>
										 <NumberFormat										 	
											autoComplete="tel-national"
											id="phoneNumber"
											name="phoneNumber"
											aria-labelledby={`phoneNumber-${cid}`}
											type="tel"
											value={values.phoneNumber} 
											onChange={
																										
												handleChange('phoneNumber')
												
											}
											onBlur={handleBlur}											
											format="(###) ###-####" mask="_"
									      />
									      {
											(errors.phoneNumber && touched.phoneNumber) && 
											(<div className="errortext">{errors.phoneNumber}</div>)
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
											className={
												[
												'aeopr-button',
												'aeopr-primary-button',
												'aeopr-send-button', 
												props.buttonClass].join(' ')
												}
										
										>
											Request Info
										</button>
										<p className="ctaSection">
											or call <a className="mobile-only phone-link" href={`tel:+1 ${defaultPhone}`}>
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
	                  );
	                }}
		        </Formik>
		      </div>
		    </section>
		)
	}