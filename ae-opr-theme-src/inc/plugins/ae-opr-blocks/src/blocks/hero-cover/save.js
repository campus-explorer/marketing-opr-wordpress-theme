/**
 * BLOCK: Hero Cover Block - Save Block
 */

// Import block dependencies and components.
import classnames from "classnames"

const {
	RichText,
	InnerBlocks
} = wp.blockEditor
const {
	G, 
	Path, 
	SVG
	} = wp.components;
const { Fragment } = wp.element;


export default function save( props ) {
	const { attributes, className } = props
	//const { backgroundImage } = props.attributes;
	const {
		label,
		block_id,
		backgroundImage,
		backgroundColor,
		backgroundImageColor,
		backgroundPosition,
		backgroundSize,
		showDate,
		classDate,
		applyDate
	} = attributes
	function GetFormattedDate(date) {
			if(!date)return;
		    var todayTime = new Date(date.split(','));
		    var month = (todayTime.getMonth() + 1);
		    var day = (todayTime .getDate() + 1);
		    var year = (todayTime .getFullYear());
		    return month + "/" + day + "/" + year;
		}
	const bgColor = (backgroundColor)?`has-background-color-${backgroundColor}`:'';
	let overlay = (""==backgroundImageColor)? null: "has-background-overlay has-background-color-"+backgroundImageColor;
		const BgImage = (backgroundImage)?(
				<span className={classnames(
					'aeopr-background-container', 
					'hero_background',
					`aeopr-column__background-position-${backgroundPosition}`,
					`hero__background-size-${backgroundSize}`,
					overlay)}
						style={{
							backgroundImage:'url('+backgroundImage.url+')'
						}}/>):'';

	return (
		<>
			<div
				className={ classnames(
					"aeopr-hero-area__wrapper",
					className,
					(showDate!==true)?null:'has-date-bar'
				) }
				>
				{BgImage}
				<div className="aeopr-hero-area__content-wrapper has-text-color-peruwhite">
				
					<InnerBlocks.Content/>
				</div>

			
				<div
					className={ classnames(
						"aeopr-start-date-bar__wrapper",
						`aeopr-block-${ block_id }`,
						(showDate!==true)?'hide':null
						
					) }
				>
						<div className="aeopr-start-date-bar__inner-wrapper">
							<p id="apply-by-block">Apply By: <span>{GetFormattedDate(applyDate)}</span></p>
							<span id="start-date-block-icon">
									<SVG 
										xmlns="http://www.w3.org/2000/svg" 
										viewBox="0 0 450 450">
										<Path d="M337.07,221.23h29.65a12.18,12.18,0,0,0,12.16-12.16V179.43a12.17,12.17,0,0,0-12.16-12.16H337.07a12.17,12.17,0,0,0-12.15,12.16v29.64a12.17,12.17,0,0,0,12.15,12.16Zm.3-41.51h29.05v29.05H337.37Zm-.3,120.36h29.65a12.17,12.17,0,0,0,12.16-12.15V258.29a12.17,12.17,0,0,0-12.16-12.16H337.07a12.17,12.17,0,0,0-12.15,12.16v29.64a12.16,12.16,0,0,0,12.15,12.15Zm.3-41.5h29.05v29.05H337.37Zm-84.9-37.35h29.65a12.17,12.17,0,0,0,12.16-12.16V179.43a12.17,12.17,0,0,0-12.16-12.16H252.47a12.17,12.17,0,0,0-12.15,12.16v29.64a12.17,12.17,0,0,0,12.15,12.16Zm.3-41.51h29.06v29.05H252.77ZM112.93,321.29H83.28a12.17,12.17,0,0,0-12.16,12.15v29.65a12.17,12.17,0,0,0,12.16,12.15h29.65a12.16,12.16,0,0,0,12.15-12.15V333.44a12.16,12.16,0,0,0-12.15-12.15Zm-.3,41.5h-29V333.74h29.05Zm.3-195.52H83.28a12.17,12.17,0,0,0-12.16,12.16v29.64a12.18,12.18,0,0,0,12.16,12.16h29.65a12.17,12.17,0,0,0,12.15-12.16V179.43a12.17,12.17,0,0,0-12.15-12.16Zm-.3,41.5h-29V179.72h29.05Zm139.84,89.47h29.65a12.17,12.17,0,0,0,12.16-12.16V256.43a12.17,12.17,0,0,0-12.16-12.15H252.47a12.16,12.16,0,0,0-12.15,12.15v29.65a12.17,12.17,0,0,0,12.15,12.16Zm.3-41.51h29.06v29.06H252.77ZM385.06,41H358.44V31.43A19,19,0,0,0,339.51,12.5h-2.86a19,19,0,0,0-18.93,18.93V41H132.28V31.43A19,19,0,0,0,113.35,12.5h-2.86A19,19,0,0,0,91.56,31.43V41H64.94A31.21,31.21,0,0,0,33.77,72.12V406.37A31.17,31.17,0,0,0,64.9,437.5H385.1a31.17,31.17,0,0,0,31.13-31.13V72.12A31.2,31.2,0,0,0,385.06,41Zm-54.89-9.52A6.49,6.49,0,0,1,336.65,25h2.86A6.49,6.49,0,0,1,346,31.43V41H330.17ZM104,31.43A6.49,6.49,0,0,1,110.49,25h2.86a6.49,6.49,0,0,1,6.48,6.48V41H104ZM403.78,406.37a18.7,18.7,0,0,1-18.68,18.68H64.9a18.7,18.7,0,0,1-18.68-18.68v0a31,31,0,0,0,18.72,6.27H317.35a31,31,0,0,0,22-9.13l64.39-64.39ZM333,392.21a26.45,26.45,0,0,0,.76-6.27V344.38A14.22,14.22,0,0,1,348,330.17h41.55a26.47,26.47,0,0,0,6.28-.76Zm70.74-262.29H138.51a6.23,6.23,0,1,0,0,12.45H403.78V303.5a14.23,14.23,0,0,1-14.22,14.21H348a26.7,26.7,0,0,0-26.66,26.67v41.56a14.24,14.24,0,0,1-14.22,14.21H64.94a18.74,18.74,0,0,1-18.72-18.72V142.37h67.39a6.23,6.23,0,0,0,0-12.45H46.22V72.12A18.74,18.74,0,0,1,64.94,53.4H91.56V71.71a19,19,0,0,0,18.93,18.93,6.23,6.23,0,0,0,0-12.45A6.49,6.49,0,0,1,104,71.71V53.4H317.72V71.71a19,19,0,0,0,18.93,18.93,6.23,6.23,0,1,0,0-12.45,6.49,6.49,0,0,1-6.48-6.48V53.4h54.89a18.74,18.74,0,0,1,18.72,18.72ZM112.93,244.28H83.28a12.17,12.17,0,0,0-12.16,12.15v29.65a12.18,12.18,0,0,0,12.16,12.16h29.65a12.17,12.17,0,0,0,12.15-12.16V256.43a12.16,12.16,0,0,0-12.15-12.15Zm-.3,41.51h-29V256.73h29.05Zm55.25-64.56h29.65a12.17,12.17,0,0,0,12.15-12.16V179.43a12.17,12.17,0,0,0-12.15-12.16H167.88a12.17,12.17,0,0,0-12.16,12.16v29.64a12.17,12.17,0,0,0,12.16,12.16Zm.29-41.51h29.06v29.05H168.17Zm84.59,183.07a6.22,6.22,0,0,0-12.44.3,12.16,12.16,0,0,0,12.15,12.15h29.65a12.17,12.17,0,0,0,12.16-12.15V333.44a12.17,12.17,0,0,0-12.16-12.15H252.47a12.16,12.16,0,0,0-12.15,12.15V342a6.23,6.23,0,1,0,12.45,0v-8.25h29.06v29.05Zm-84.88-64.55h29.65a12.17,12.17,0,0,0,12.15-12.16V256.43a12.16,12.16,0,0,0-12.15-12.15H167.88a12.17,12.17,0,0,0-12.16,12.15v29.65a12.17,12.17,0,0,0,12.16,12.16Zm.29-41.51h29.06v29.06H168.17Zm-.29,118.51h29.65a12.16,12.16,0,0,0,12.15-12.15V333.44a12.16,12.16,0,0,0-12.15-12.15H167.88a12.17,12.17,0,0,0-12.16,12.15v29.65a12.17,12.17,0,0,0,12.16,12.15Zm.29-41.5h29.06v29.05H168.17Zm0,0"/>
										</SVG>
									</span>
						<p id="classes-start-block">Classes Start: <span>{GetFormattedDate(classDate)}</span></p>
					</div>
						
				</div>
			</div>	
		</>
	)
}
