/**
 * BLOCK: Content Area - Edit Class
 */

// Import classes
import classnames from "classnames"
import times from "lodash/times"
import map from "lodash/map"
import memoize from "memize"
import styling from "./styling"

// Import all of our Text Options requirements.
import TypographyControl from "../../components/typography"

// Import Web font loader for google fonts.
import WebfontLoader from "../../components/typography/fontloader"

const { __ } = wp.i18n
const { select } = wp.data;

const {
	Component,
	Fragment,
} = wp.element

const {
	BlockControls,
	BlockAlignmentToolbar,
	InspectorControls,
	InnerBlocks,
} = wp.blockEditor

const {
	PanelBody,
	SelectControl,
	RangeControl,
	Button,
	ToggleControl,
	TabPanel,
	ButtonGroup,
	Dashicon
} = wp.components

const ALLOWED_BLOCKS = [ 
	"aeopr/testimonial",
	"aeopr/content-section",
	"aeopr/jump-links",
	"advgb/columns"
]
	
const BLOCKS_TEMPLATE = [
	['aeopr/jump-links', 
	'aeopr/content-section']  
];

class AEOPRContentArea extends Component {

	constructor() {
		super( ...arguments )
	}

	componentDidMount() {

		// Assigning block_id in the attribute.
		this.props.setAttributes( { block_id: this.props.clientId } )

		this.props.setAttributes( { classMigrate : true } )
		this.props.setAttributes( { childMigrate : true } )

		// Pushing Style tag for this block css.
		const $style = document.createElement( "style" )
		$style.setAttribute( "id", "aeopr-style-content-" + this.props.clientId )
		document.head.appendChild( $style )
	}
	render() {

		const { attributes, setAttributes } = this.props

		const {
			className,
			loadGoogleFonts,
		} = attributes

		let googleFonts

		if( loadGoogleFonts == true ) {

			const hconfig = {
				google: {
					families: [ fontFamily + ( fontWeight ? ":" + fontWeight : "" ) ],
				},
			}

			googleFonts = (
				<WebfontLoader config={ hconfig }>
				</WebfontLoader>
			)
		}

		var element = document.getElementById( "aeopr-style-content-" + this.props.clientId )

		if( null != element && "undefined" != typeof element ) {
			element.innerHTML = styling( this.props )
		}

  
		return (
			<Fragment>
				<div className={ classnames(
					className,
					"aeopr-content__outer-wrap",
					`aeopr-block-${ this.props.clientId }`
				) }>
					<InnerBlocks
						template={ BLOCKS_TEMPLATE }
						templateLock={ false }
						allowedBlocks={ ALLOWED_BLOCKS }
					/>
				</div>
			</Fragment>
		)
	}
}

export default  AEOPRContentArea
