import { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import NumberFormat from 'react-number-format'
import {Formik, Field, Form} from 'formik';
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


import './form.scss'
///repeated number phone validator regex: (|(\d)(?!\d))(\d)\3{6,9}

const customStyles = {
   placeholder: (provided, state) => {
    const color = '#666';
    return { ...provided, color };
  }
 }

/// --> Student Hub needs a unique request ID. We use the customAlphabet function from nanoid to generate this

const getId = customAlphabet(
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
  12
);

/// --> this will be the request's id for Student Hub
//const [leadId, setLeadId] = useState(getId());

/// --> Apollo/GraphQL set up for Student Hub

/// --> Student Hub GraphQL needs a Mutation sent as the query in order to add a lead

const leadFormSend = gql`
  mutation leadformsend($leadInput: CreateLeadInput!) {
	  createLead(lead: $leadInput)
	}
`

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
	
const renameKeys = (oldProp,newProp,{ [oldProp]: old, ...others }) => ({
    [newProp]: old,
    ...others
})	
	
function decorateUrl(urlString) {
  var ga = window[window['GoogleAnalyticsObject']];
  var tracker;
  if (ga && typeof ga.getAll === 'function') {
    tracker = ga.getAll()[0]; // Uses the first tracker created on the page
    urlString = (new window.gaplugins.Linker(tracker)).decorate(urlString);
  }
  return urlString;
}

/// -->> Helper function to get element position in the document
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



/// -->> Persistent Param Cookie Reader
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
//// Landing Page form refresh not using current state in React Select and Formik
/// Does Formik Initial values need to refresh, or is it React Select that is not rehydrating after render

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
	
	
/// --> detect testing flags in url. and set test values as needed 
	const testLead=(location.search.search('testform')>=0)?true:false;
	const testRedirect = (location.search.search('redirect')>=0)?true:false;
	
	//(searchVars.testform)?true:false;

	const testDirect = (testLead && testRedirect)?true:false;  //only set to true if testform flag is present
	
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
///serialize search vars string for use in urls	
	let searchString = Object.entries(searchVars).map(([key, val]) => `${key}=${encodeURIComponent(val)}`).join('&');
	



	const [createLead, { data }] = useMutation(leadFormSend);

	
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

let ProgramsSelectList= [];///[{value:'',label:'Select...'}];///initial null value of options
for(const program in programList){
	const programOption = {
		label:programList[program]['label'],
		value: program
		}
	ProgramsSelectList.push(programOption)///push each object into the Select List for react-select... {value, label}
}
//console.log('list',ProgramsSelectList)


/// -->> Define validation schema

//// -->> Need validation of react-select 

///const repeatRegExp = /^(|(\d)(?!\d))(\d)\3{6,9}$/;
//const areaCodeExp = /^\(?(\d{3})\)?/;
//const protectAreaExp = /^\(1[0-9]{2}\)?/
const phoneRegExp=/^\(?([2-9][0-9]{2})\)?[-. ]?([1-9][0-9]{2})[-. ]?([0-9]{4})$/;
const areaCodeValidate =/^\(?(1[0-9]{2}|\d{3}|\d1{2})+/;
const areaCodeTest = string => areaCodeValidate.test(string)

const validateSchema = Yup.object().shape({
	                  email: Yup.string()
	                    .email()
	                    .required('We will need a valid email address'),
	                  firstName: Yup.string()
	                    .required("We'll need your first name"),
	                  lastName: Yup.string()
	                    .required("We'll need your last name"),	                
	                  phoneNumber: Yup.string()
	                  	.required("We'll need your phone number")
						//.matches(phoneRegExp,"A valid phone number is needed")
						.test(
							'Area Code',
							"We'll need your area code",
							(value)=>{
								console.log(value, areaCodeTest(value))
								}
							),

					programCode: Yup.string()
	                    .required("Let us know what program you are interested in")
	                    .nullable(),
	                  
	                })		
	return(

		<section className="formPanel" data-version={props.formversion}>
		      <span className="spacer" id="leadform"/>
		      <div className={['formBox'].join(' ')}>
		        {testLead && (<span>TEST LEAD</span>)}

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
				 		campusCodes:'',
				 		programCode:programCode,
				 		programs:'',
				 		request:false,
				 		isSingle:props.isSingle||false
				 		}}
	                onSubmit={(values, { setSubmitting}) => {
						//console.log('submit',programCode, state)


////// ---- BEING SUBMISSION FUNCTION ---- //////						
						/** while sumbmitting and waiting for a repsonse, show spinner
						on response, if success, redirect to viewdo, else show thankyou message */
												
						setState({request:true})
						const leadId=getId();
/// --> Set dataLayer value based on form
						const dataLayerType = (formFocus==='applyForm')?'Start Application Button Click':'Request Info Button Click';

/// -->> Set the dataLayer for the button click event						
						if(values.request!==true && typeof window != 'undefined'){
							window.dataLayer.push({event:dataLayerType})
						}
						
						const sourceCode = searchVars.utm_source||'UNKNOWN';
						
						// create campus and product codes from selected value
						const campusProgramCodes = programCode.split('--');
						//console.log('codes',campusProgramCodes)
						//if(campusProgramCodes.length >1){
						const passedCampusCode = campusProgramCodes[0]||'';
				
						
						
						//cleanse phone number of non-numeric characters .replace(/\D/g,'')
						const body = {
						'captureUrl': location.href,
						'leadId': leadId,
						'partnerCode':partnerCode, /// Need to be variable
						'collegeCode': collegeCode, /// Need to be variable
						'campusCode': passedCampusCode, /// Need to be variable
						'sourceCode': sourceCode,
						'programCode': campusProgramCodes[1]||clientPrefix+'_UNDERGRAD_UNDECIDED', /// Need to be variable
						'phoneNumberCountry': 'US',
						'formType': origin,
						'email': values.email,
						'phoneNumber': values.phoneNumber,
						'firstName': values.firstName,
						'lastName': values.lastName,
						'deviceType': searchVars.utm_device||'UNKNOWN',
						'isTestLead': testLead,
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
						console.log(body,'form')

						let crmData = (formtype=="crm")?[
								"firstname="+encodeURIComponent(values.firstName),
								"lastname="+encodeURIComponent(values.lastName),
								"email="+encodeURIComponent(values.email),
								"phone="+encodeURIComponent(values.phoneNumber),
								"ocid="+encodeURIComponent(programCode),
								"leadsource="+encodeURIComponent(sourceCode),
								"captureurl="+encodeURIComponent(location.href),
								"tcpaconsent="+true,
								"segment="+encodeURIComponent(programCode),///Legacy parameter
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
						if(!testDirect && testLead)redirectTarget=null;
						
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


	                }}
	                
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
									        <Select
												id={`programCode-${cid}`}
												key={`selected-${programCode}`}
												className="program-select"
												name="programCode"
												aria-labelledby={`programs-label-${cid}`}
												value={programObj}
												placeholder = "Select Program..."
												options={ProgramsSelectList}
												menuShouldScrollIntoView={true}
												onFocus={()=>{
													//(window.innerWidth< 1024)&&
													(cid!=='modal-form')&&
													offsetScroll(document.querySelector(`#${formFocus}`),60);
													
												}}
												onChange={selectedOption=>{
													//let event = { target : { name:'programCode',value: selectedOption.value}}
												//	setFieldValue('programCode',programObj)
													setProgramCode(selectedOption.value)
													cookies.set('aeoprSelectedProgram',selectedOption.value, {path:'/'}) 
													//handleChange(event)
												}}
												styles={customStyles}
												>									        
									        </Select>
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
											className={['aeopr-button','aeopr-primary-button','aeopr-send-button', props.buttonClass].join(' ')}
										
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