const { render, useState } = wp.element;
/*import { 
	ApolloProvider,
	ApolloClient, 
	InMemoryCache,
		useQuery, 
	gql  
} from '@apollo/client';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";*/

import LeadFormPanel from './form'



const crmConfig = {
	endpoint:crmvars.endpoint,
	midpoint:crmvars.midpoint,
	apiKey:crmvars.apiKey,
	redirect:crmvars.redirect
  
}
const { 
	endpoint,
	midpoint, 
	apiKey,
	redirect
	} = crmConfig;

//console.log(endpoint,'endpoint')


 
const LeadFormApp = () => {
	return(
			<LeadFormPanel 
				formtype={"crm"}
				endpoint={endpoint}
				midpoint={midpoint}
				origin={"Website_RFI"}
				redirect={redirect}
			/>
	)
}
if(document.getElementById(`leadform-area`)) render(<LeadFormApp/>, document.getElementById(`leadform-area`));

const ApplyFormApp = () => {
	//console.log(endpoint, midpoint)
	return(
			<LeadFormPanel
				endpoint = {endpoint} 
				midpoint={midpoint}
				redirect={'https://csprdsc.nebraska.edu/psc/csprdsc/NBP/HRMS/s/WEBLIB_DSHBOARD.ISCRIPT1.FieldFormula.IScript_GETPAGE?cref=NBP_NVC_DASH_ADMISSIONSAPP&next_path=admissionsapp.root.app&check_apps=NBPAD_APP&institution=PSCNE&void=all'}
				origin={'Apply Now Short Form'}
				formtype={'crm'}
			/>
	)
}
if(document.getElementById(`applyform-area`)) render(<ApplyFormApp/>, document.getElementById(`applyform-area`));
