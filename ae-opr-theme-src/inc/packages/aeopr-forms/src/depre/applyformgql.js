const { render, useState, useEffect } = wp.element;
import {
	InputLabel,
	MenuItem,
	FormControl,
	FormHelperText,
	Select,
	Container,
	makeStyles,
	Grid,
	TextField,
	CssBaseline,
	CircularProgress	
} from '@material-ui/core';
import MuiPhoneNumber from 'material-ui-phone-number';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {customAlphabet} from 'nanoid'


import './applyform.scss'

//import ApolloClient from 'apollo-boost';
//import gql from 'graphql-tag'

import { 
	useQuery, 
	gql,
	InMemoryCache,
	useMutation, 
	ApolloClient
} from '@apollo/client';


/// --> get list of programs for select menu

const getId = customAlphabet(
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
  12
);

const leadId = getId();

/// --> Apollo/GraphQL set up for Student Hub



///GraphQL Query/Mutation


const leadFormSend = gql`
  mutation leadformsend($leadInput: CreateLeadInput!) {
	  createLead(lead: $leadInput)
	}
`




/***
 * Material UI style cusomtizations
 ***/
const useStyles = makeStyles(theme => ({
	paper: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	form: {
		width: '90%', // Fix IE 11 issue.
		margin:0,
	},
	selectControl:{
		background:'white',
		

		
	},
	select: {
		minWidth: 120,
		margin:0,
		width:'100%',
		'&$focused': {
		      background: 'white',
	    }
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
	submit: {
		marginTop: theme.spacing(5),
		height:'3rem',
		fontSize:'1.4rem',
	},
	headline:{
		marginBottom: theme.spacing(4)
	},
	textfield:{
		background:'white'
	},
	container:{
		top:'90px',
	}
	}));



	
export default function FormPanel(props){


	const { endpoint, midpoint} = props;
	
	const searchVars = {}
	const location = window.location;
	const searchParams = (location)?new URLSearchParams(location.search):'';
	if(searchParams){
		for(var item of searchParams.entries()){
			searchVars[item[0]]=decodeURIComponent(item[1])
		}
	}
	
	const [createLead, { data }] = useMutation(leadFormSend);
	
	const {phone,headline, subheadline, redirect, redirectUrl, successMsg} = props;
	
	//clear if subheadline is only a br
	
	const classes = useStyles();
	const [state, setState] = React.useReducer(
	    (state, newState) => ({...state, ...newState}),
	    {formData:{
		    firstName:'',
			lastName:'',
			email:'',
			phoneNumber:'',
			programCode:'',//props.state.formSelect,
			location:props.location,
			},
		submitted:false,
		request:false
		}
	  )
	
	const inputLabel = React.useRef(null);
	
	const [programCode, setProgramCode] = useState(); 

	const ProgramsSelectList = crmvars.programsList.map(({title, code},index) => (
							<MenuItem 
								value={'PERU_'+code.replace('-','_')}
								key={index} 
								>
									{title}
							</MenuItem>
							))	
	return(

		<Container component="section" maxWidth={false} disableGutters={true} className={classes.container+' formPanel'}>
		      <CssBaseline />
		      <span className="spacer" id="leadform"/>
		      <div className={[classes.paper, 'formBox'].join(' ')}>
		        
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
				 		programCode:'' ,
				 		programs:'',
				 		request:false,
				 		isSingle:props.isSingle||false
				 		}}
	                onSubmit={(values, { setSubmitting}) => {
	                   //on response, if success, redirect to viewdo, else show thankyou message
	                   setState({request:true})
					   //console.log(values, 'submitting');	
	                   if(values.request!==true && typeof window != 'undefined')window.dataLayer.push({event:'Start Application Button Click'});
						const body = {
							'captureUrl': location.href,
							'leadId': leadId,
							'partnerCode':'PERU',
							'collegeCode': 'PERU',
							'campusCode': 'PERU_ONLINE',
							'sourceCode': searchVars.utm_medium||'UNKNOWN',
							'programCode': values.programCode||'PERU_UNDERGRAD_UNDECIDED',
							'phoneNumberCountry': 'US',
							'formType': 'Website_RFI',
							'email': values.email,
							'phoneNumber': values.phoneNumber,
							'firstName': values.firstName,
							'lastName': values.lastName,
							'deviceType': searchVars.device||'UNKNOWN',
							"isTestLead": false,
							'sourceTracking': {
								'campaignName': searchVars.utm_campaign||'',
								'adGroupId': searchVars.utm_adgroup||'',
								'keyword': searchVars.utm_term||'',
								'matchType': searchVars.matchtype||'',
								'network': searchVars.network||'',
								'creativeId': searchVars.creative||'',
								'placement': searchVars.placement||'',
								'target': searchVars.target||'',
								'feedItemId': searchVars.feeditemid||'',
								'agencyTrackingCode':  searchVars.agencytrackingcode||''
							}
						};
						const redirectTarget = 'https://csprdsc.nebraska.edu/psc/csprdsc/NBP/HRMS/s/WEBLIB_DSHBOARD.ISCRIPT1.FieldFormula.IScript_GETPAGE?cref=NBP_NVC_DASH_ADMISSIONSAPP&next_path=admissionsapp.root.app&check_apps=NBPAD_APP&institution=PSCNE&void=all';
						
						createLead({ variables: {leadInput:body} }).then((response)=>{
								setSubmitting(false);
								(redirectTarget)?window.location.href = redirectTarget:setState({'submitted':true})
							}).catch((e)=>{
								setSubmitting(false);
								console.log(e.message)
								
							})
							/***
							//while sumbmitting and waiting for a repsonse, show spinner
	                   //on response, if success, redirect to viewdo, else show thankyou message
	                   ///required for Student Hub:universityId, campusCode (PERU_ONLINE), source
	                   
/// --> v1 api call
	                   setState({request:true})
	                  // if(values.request!==true)window.dataLayer.push({event:'Request Info Button Click'});
	                   const headers = new Headers();
					   headers.append('Content-Type', 'application/json');
						const body = {
						 "universityId": "102",
						  "programCode": values.programCode,
						  "firstName": values.firstName,
						  "lastName": values.lastName,
						  "secondaryLastName": "",
						  "email": values.email,
						  "phoneNumber": "",
						  "cellNumber": values.phoneNumber,
						  "countryCode": "US",
						  "comments": "",
						  "origin": "Apply Now Short Form",
						  "source": searchVars.utm_source,
						  "subSource": searchVars.utm_medium,
						  "campaignName": searchVars.utm_campaign,
						  "adGroupName": searchVars.utm_adgroup,
						  "keyword": searchVars.utm_term,
						  "matchType": searchVars.matchtype,
						  "network": searchVars.network,
						  "device": searchVars.device,
						  "deviceModel": searchVars.devicemodel,
						  "creative": searchVars.creative,
						  "placement": searchVars.placement,
						  "target": searchVars.target,
						  "adPosition": searchVars.adposition,
						  "feedItemId": searchVars.feeditemid,
						  "agencyTrackingCode": searchVars.agencytrackingcode,
						  "webUrl": location.href,
						  "ip": ""
						};
						
						const init = {
						  method: 'POST',
						  headers,
						  body:JSON.stringify(body)		  
						};
/// --> redirect to the full application form
						const redirectTarget = 'https://csprdsc.nebraska.edu/psc/csprdsc/NBP/HRMS/s/WEBLIB_DSHBOARD.ISCRIPT1.FieldFormula.IScript_GETPAGE?cref=NBP_NVC_DASH_ADMISSIONSAPP&next_path=admissionsapp.root.app&check_apps=NBPAD_APP&institution=PSCNE&void=all';
						const url = midpoint+'?url='+encodeURIComponent(endpoint);
						console.log(url, 'url')
						fetch(url, init)
						.then((response) => {	
							setSubmitting(false)
							console.log(response)
							if(response.status===200){
								(redirectTarget)?window.location.href = redirectTarget:setState({'submitted':true})								
							}
							
						})
						.catch((e) => {
						  console.log(e)
						});**/
	                }}

	                validationSchema={Yup.object().shape({
	                  email: Yup.string()
	                    .email()
	                    .required('Required'),
	                  firstName: Yup.string()
	                    .required('Required'),
	                  lastName: Yup.string()
	                    .required('Required'),
	                  phoneNumber: Yup.string()
	                    //.matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, "Phone number is not valid")
						.required("Must enter a phone number"),
	                  programCode: Yup.string()
	                    .required('Required')
	                })}
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
	                    programs
	                  } = props;
	                 return(
						<>
							<div className={["form_overlay",isSubmitting===true?'':'hide'].join(' ')}>
				                <CircularProgress variant='indeterminate' thickness={5}/>
				                <h4>Sending Request</h4>
							</div>
							
		                    <form onSubmit={handleSubmit} className={[classes.form, state.submitted?'hide':''].join(' ')}>
		                    	<Grid container spacing={0}>
									<Grid item xs={12}> 
							            <FormControl fullWidth className={[classes.selectControl,' selectControl', values.isSingle?"single-program":""].join(' ')}>
							            	<InputLabel ref={inputLabel} id="programs-label" variant="outlined" style={{marginTop:'-7px'}}>
									         Select a Program
									        </InputLabel>
									        <Select
									          labelId="programs-label"
									          id="programs"
									          name="programCode"
									          variant='outlined' 
									          margin='dense'
									          value={values.programCode}
									          onChange={(e) => {
											      //setProgramCode(e.target.value);
											      handleChange(e);
										    }}
									          className={classes.select}
									          style={{whiteSpace: 'normal'}}
									          error={errors.programCode && touched.programCode && <FormHelperText>'Please choose a program of interest'</FormHelperText>}
									        >
										        <MenuItem value=''>Please Select a Program</MenuItem>
												{ProgramsSelectList}										        
									        </Select>
									    </FormControl>
						            </Grid>
						            <Grid item xs={12} >
										<TextField
										label="First Name"
										name="firstName"
										id="firstName"
										className={[classes.textfield,'textfield'].join(' ')}
										value={values.firstName}
										onChange={handleChange}
										onBlur={handleBlur}
										error={errors.firstName && touched.firstName}
										helperText={(errors.firstName && touched.firstName) && errors.firstName  && 'Your first name is required'}
										variant="outlined"
										fullWidth
										margin='dense'
										/>
									</Grid>
									 <Grid item xs={12} >
										<TextField
										label="Last Name"
										name="lastName"
										id="lastName"
										className={[classes.textfield, 'textfield'].join(' ')}
										value={values.lastName}
										onChange={handleChange}
										onBlur={handleBlur}
										error={errors.lastName && touched.lastName}
										helperText={(errors.lastName && touched.lastName) && errors.lastName && 'Your last name is required'}
										variant="outlined"
										fullWidth
										margin='dense'
										/>
									</Grid>	
									<Grid item xs={12}>
										<TextField
										variant="outlined"
										error={errors.email && touched.email}
										helperText={(errors.email && touched.email) && errors.email && 'Please provide a valid email address'}
										fullWidth
										id="email"
										label="Email Address"
										name="email"
										autoComplete="email"
										margin='dense'
										className={classes.textfield}
										onChange={handleChange}
										onBlur={handleBlur}
										/>
									</Grid>
									<Grid item xs={12}>
										<MuiPhoneNumber
											//autoFormat={false}
											defaultCountry={'us'}
											disableDropdown={true}
											disableCountryCode={true}
											onlyCountries={['us']}
											variant="outlined"
											error={errors.phoneNumber && touched.phoneNumber}
											helperText={(errors.phoneNumber && touched.phoneNumber) && errors.phoneNumber && 'Please provide a valid phone number'}
											fullWidth
											id="phoneNumber"
											label="Phone"
											name="phoneNumber"
											//autoComplete="phoneNumber"
											margin='dense'
											className={classes.textfield}
											onChange={handleChange ('phoneNumber')}
											onBlur={handleBlur}
											value={values.phoneNumber}
										/>
									</Grid>
									
								</Grid>
								
								<Grid container justify="flex-end" className="applyform-actions">
									<Grid item xs={12}>
										<button
											type="submit"
											fullWidth
											variant="contained"
											color="primary"
											className={['aeopr-button','aeopr-primary-button','aeopr-send-button'].join(' ')}
										
										>
											Request Info
										</button>
										<p className="ctaSection">
											or call <a className="mobile-only phone-link" href={"tel:+1 (402) 902-3005"}>(402) 902-3005</a>
											<span className="desktop-only">(402) 902-3005</span>
										</p>
										<div className=" legal-text ctpaText">
											<p>By submitting this form, I am providing my digital signature agreeing that Peru State College may email me or contact me regarding educational services by telephone and/or text message utilizing automated technology at the telephone number(s) provided above. I understand this consent is not a condition to attend Peru State College or to purchase any other goods or services.</p>
										</div>
									</Grid>
								</Grid>
		                    </form>
	                    </>
	                  );
	                }}
		        </Formik>
		      </div>
		    </Container>
		)
	}