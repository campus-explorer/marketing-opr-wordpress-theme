const { render, useState } = wp.element;
import { 
	ApolloProvider,
	ApolloClient, 
	InMemoryCache 
} from '@apollo/client';

import LeadFormPanel from './formgql'


const version = "2_1";
const crmConfig = {	
	midpoint:aeopr_settings.ash_midpoint,
	apiKey:aeopr_settings.apiKey,
	redirect:aeopr_settings.redirect,
	applyRedirect:aeopr_settings.applyredirect,
	clientPrefix: aeopr_settings.clientPrefix,
	campusCode: aeopr_settings.campusCode,
	partnerCode: aeopr_settings.partnerCode,
	clientCTPA: aeopr_settings.clientCTPA,
	defaultPhone: aeopr_settings.defaultPhone
  
}
const { 
	midpoint, 
	apiKey,
	redirect,
	applyRedirect,
	clientPrefix,
	campusCode,
	partnerCode,
	clientCTPA,
	defaultPhone
	} = crmConfig;


const gqlClient = new ApolloClient({
	uri: midpoint,
	headers: {'x-api-key':apiKey},
	cache: new InMemoryCache()
})
 

const LeadFormApp = (props) => {
		console.log(props);
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
		
/// -->> we will pass the state item as programSelect prop to the form function
		
	return(
		<ApolloProvider client={gqlClient} >
			<LeadFormPanel 
				midpoint={midpoint}
				origin={"Website_RFI"}
				redirect={props.redirect}
				programFocus = {props.programFocus}
				formtype={"crm"}
				formFocus={'rfiForm'}
				programSelect = {rootProgramCode||props.programFocus}
				programList={aeopr_settings?.programsList}
				clientPrefix = {clientPrefix}
				partnerCode={partnerCode}
				campusCode = {campusCode}
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
		const redirectUrl= customRedirect||redirect;
		const programFocus = area.getAttribute('data-program-focus')||null;/// setting on the container from the WP page
		const container = area.getAttribute('id')||'main';
		const displayType = area.getAttribute('data-type')||'inline';
		
		console.log(programFocus, container);
		render(
		 	<LeadFormApp 
		 		redirect={redirect}
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

	return(
			<ApolloProvider client={gqlClient} >
				<LeadFormPanel
					midpoint={midpoint}
					redirect={applyRedirect}
					origin={'Apply Now Short Form'}
					formtype={"crm"}
					formFocus={'applyForm'}
					//programSelect = {rootProgramCode||''} pull this from query
					clientPrefix = {clientPrefix}
					campusCode = {campusCode}
					partnerCode={partnerCode}
					clientCTPA = {clientCTPA}
					defaultPhone = {defaultPhone}
					buttonClass = {'aeopr-apply-button'}
					formversion={version}
				/>
			</ApolloProvider>
	)
}
if(document.getElementById(`applyform-area`)) render(<ApplyFormApp/>, document.getElementById(`applyform-area`));