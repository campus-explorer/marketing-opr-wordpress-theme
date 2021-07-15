/**
 * BLOCK: Icon Block - Save Block
 */

// Import block dependencies and components.
import classnames from "classnames"
//import renderSVG from "Dist/blocks/controls/renderIcon"

const {
	getColorClassName,
	getColorObjectByAttributeValues
} = wp.blockEditor

export default function save( props ) {
	
	const { attributes} = props

	const {
		block_id,
		icon,
		icon_library,
		icon_size,
		iconColor,
		customIconColor,
		backgroundColor,
		customBackgroundColor,
		borderRadius,
		borderWidth,
		borderColor,
		borderColorValue,
		iconColorValue,
		customBorderColor,
		link,
		target,
		disableLink,
	} = attributes

	const backgroundClass = getColorClassName(
		'background-color',
		backgroundColor
	);
	

	//const borderColorValue = borderColor&& getColorObjectByAttributeValues(wp.data.select( "core/editor" ).getEditorSettings().colors,borderColor)
	const renderSVGLocal=(svg,fill)=>{

			var targetIcon = icon_library && icon_library[svg];
			if(targetIcon){
				var viewbox_array = targetIcon["svg"]["solid"]["viewBox"]
				var path =  targetIcon["svg"]["solid"]["path"]
				var viewBox = viewbox_array.join( " " )
				return(
					<svg xmlns="http://www.w3.org/2000/svg" viewBox={viewBox} className={svg+" svg"}><path fill={fill} d={path}></path></svg>
				)
			}
		}			
		
		
	const styles = {
		width: `${icon_size}px`, 
		height: `${icon_size}px`, 
		borderRadius: `${borderRadius}%`,
		borderWidth: `${borderWidth}px`,
		borderStyle: 'solid',
	};
	
	if(customBackgroundColor){
		styles.backgroundColor=customBackgroundColor;
	}
	styles.borderColor= customBorderColor || borderColorValue; 


	const icon_html =  icon &&  renderSVGLocal(icon, iconColorValue) ;


	let target_val = ( target ) ? "_blank" : "_self"
	let link_url = ( !disableLink ) ? link : "/"
 
	return (
		<div
			className={ classnames(
				"aeopr-icon-block__content-wrap",
				`aeopr-block-${ block_id }`,
				{
					[ backgroundClass ]: backgroundClass,
				}
			) }
			style={ styles }
		>
				{ ! disableLink &&
					<a target={ target_val } aria-label={label} rel="noopener noreferrer" href={ link_url }></a>
				}
				{(icon && icon_library) && renderSVGLocal(icon, iconColorValue)}
			</div>
	)
}
