import { useState } from 'react';

import { 
	ApolloProvider,
	ApolloClient, 
	InMemoryCache 
} from '@apollo/client';

import LeadFormPanel from './formgql';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

import {version } from "../package.json"


const crmConfig = {	
	midpoint:aeopr_settings.ash_midpoint,
	apiKey:aeopr_settings.apiKey,
	redirect:aeopr_settings.redirect,
	applyRedirect:aeopr_settings.applyredirect,
	clientPrefix: aeopr_settings.partnerCode,
	campusCode: aeopr_settings.campusCode,
	collegeCode: aeopr_settings.collegeCode,
	partnerCode: aeopr_settings.partnerCode,
	clientCTPA: aeopr_settings.clientCTPA,
	defaultPhone: aeopr_settings.defaultPhone,
	programsList: aeopr_settings.programsList
	
  
}
const { 
	midpoint, 
	apiKey,
	redirect,
	applyRedirect,
	clientPrefix,
	campusCode,
	collegeCode,
	partnerCode,
	clientCTPA,
	defaultPhone,
	programsList
	} = crmConfig;

//console.log(crmConfig);

const gqlClient = new ApolloClient({
	uri: midpoint,
	headers: {'x-api-key':apiKey},
	cache: new InMemoryCache()
})
 

const LeadFormApp = (props) => {
/// -->> set parent state for pulling the program code from root	
	const [rootProgramCode, setRootProgramCode] = useState();


/// -->> set up MustationObserver on DOM Container to detect changes to the data-program attribute	
	let observeTarget = document.querySelector('.program-modal'),
		options={
			attributes:true
			},
		observer = new MutationObserver(refreshState);

/// -->> on change, set the state to the value of the attribute. 		
		function refreshState (mutations) {
			for (let mutation of mutations) {
				if (mutation.attributeName === 'data-program') {
					setRootProgramCode(observeTarget.getAttribute('data-program'))
					
				}
			}		
		}
		
/// -->> this inits the observer		
		if(observeTarget)observer.observe(observeTarget, options);

/// -->> set the cookie for the applynow preselect when the user navigates away
		if(props.programFocus)cookies.set('aeoprSelectedProgram', campusCode+'--'+props.programFocus, {path:'/'});	
/// -->> we will pass the state item as programSelect prop to the form function

/// -->> check for campusCode override
		const campusToggle =false;//Array.isArray(campusCode);



		
	return(
		<ApolloProvider client={gqlClient} >
			<LeadFormPanel 
				midpoint={midpoint}
				origin={"Website_RFI"}
				programFocus = {rootProgramCode||props.programFocus}
				formtype={"crm"}
				formFocus={'rfiForm'}
				programSelect = {rootProgramCode||props.programFocus}
				programList={programsList}
				clientPrefix = {clientPrefix}
				partnerCode={partnerCode}
				campusCode = {campusCode}
				campusToggle = {campusToggle}
				collegeCode={collegeCode}
				clientCTPA = {clientCTPA}
				defaultPhone = {defaultPhone}
				cid={props.cid}
				formversion={version}
				{...props}
				
			/>
		</ApolloProvider>

	)
}

const leadFormArea = document.querySelectorAll('.aeopr-leadform[data-has-form="1"]');

if(leadFormArea){
	for(let area of leadFormArea){
		const customRedirect = area.getAttribute('data-redirect');
		let redirectTarget= customRedirect||redirect;
		/// -->> check for query flag on redirect url
		const redirectUrl = (redirectTarget && redirectTarget.indexOf('?')<0)?redirectTarget+'?':redirectTarget+'&';
		const programFocus = area.getAttribute('data-program-focus')||null;/// setting on the container from the WP page
		const container = area.getAttribute('id')||'main';
		const displayType = area.getAttribute('data-type')||'inline';

		
		ReactDOM.render(
		 	<LeadFormApp 
		 		redirect={redirectUrl}
		 		programFocus = {programFocus}
		 		displayType = {displayType}
		 		cid={container}
		 		formversion={version}
		 		/>, 
		 		area
		 )
		 	
	}
	 
 };

const ApplyFormApp = () => {
	const selectedProgram = cookies.get('aeoprSelectedProgram');
	/// -->> check for query flag on redirect url
	let redirectApplyUrl = (applyRedirect && applyRedirect.indexOf('?')<0)?applyRedirect+'?':applyRedirect+'&';
	return(
			<ApolloProvider client={gqlClient} >
				<LeadFormPanel
					midpoint={midpoint}
					redirect={redirectApplyUrl}
					origin={'Apply Now Short Form'}
					formtype={"crm"}
					formFocus={'applyForm'}
					programSelect = {selectedProgram||null}
					programList={programsList}
					clientPrefix = {clientPrefix}
					campusCode = {campusCode}
					collegeCode={collegeCode}
					partnerCode={partnerCode}
					clientCTPA = {clientCTPA}
					defaultPhone = {defaultPhone}
					buttonClass = {'aeopr-apply-button'}
					formversion={version}
				/>
			</ApolloProvider>
	)
}
if(document.getElementById(`applyform-area`)) ReactDOM.render(<ApplyFormApp/>, document.getElementById(`applyform-area`));