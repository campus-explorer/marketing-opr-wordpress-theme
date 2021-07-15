
import {
	MenuItem,
} from '@material-ui/core';



const ProgramsList = () => {
	//console.log(programs, 'select menu')
	//console.log(crmvars.programsList,' vars')
	//console.log(crmvars.programsList,' menu vars')

	return crmvars.programsList.map(({title, code},index) => (
		<MenuItem 
			value={code} 
			key={index} 
			//data-reference={slug}
			>
				{title}
		</MenuItem>
		))
};

export default ProgramsList;