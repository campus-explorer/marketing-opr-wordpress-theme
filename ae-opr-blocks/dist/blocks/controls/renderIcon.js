/**
 * Set inline CSS class.
 * @param {object} props - The block object.
 * @return {array} The inline CSS class.
 */

import Archer_OPR_SVG_Icon from "./ArcherOPRIcons"
import parseSVG from "./parseIcon"


function renderSVG ( svg, fill ) {
	// svg = object id, fill = passed fill color
	//console.log(svg, 'passed svg')

	let svg_icon_data;
	let fetchIcons  = async function(){
		var response = await fetch(`${window.location.origin}${aeopr_settings.client_icon_library}`)
		//.then((res)=>res?.json())
		/*.then((data) =>{
			svg_icon_data =(data)?data:Archer_OPR_SVG_Icon
			console.log('library loaded')
				
		})
		.catch((err)=>{
			console.log(err,'error')
			svg_icon_data = Archer_OPR_SVG_Icon
		})*/
		//console.log(response.json())
	}
	var fontAwesome = (svg_icon_data)&&svg_icon_data[svg]
			
	//console.log('icon found',fontAwesome)

	if ( "undefined" != typeof fontAwesome ) {

		var viewbox_array = fontAwesome["svg"]["solid"]["viewBox"]
		var path =  fontAwesome["svg"]["solid"]["path"]
		var viewBox = viewbox_array.join( " " )

		return (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox={viewBox} className={svg+" svg"}><path fill={fill} d={path}></path></svg>
		)
	}
				

		

}

export default renderSVG
