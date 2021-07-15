/**
 * BLOCK: OPR Form Block
 * in the Editor, this will be a placholder div
 */
import classnames from "classnames"

import Archer_OPR_Block_Icons from "controls/block-icons"
import edit from "./components/edit"
import "./assets/style.scss"
import "./assets/editor.scss"


const { __ } = wp.i18n

const {
	registerBlockType
} = wp.blocks

registerBlockType( "aeopr/rfi-form", {
	title: "Lead Form",
	description: "Target for the RFI form",
	icon: Archer_OPR_Block_Icons.post_timeline,
	category: 'aeopr',
	supports:{
		anchor: true,
	},
	attributes:{
		block_id: {
			type: "string"
		},
		label: {
			type:"string",
		},
		redirect:{
			type:"string",
			default: aeopr_settings.redirect
		}, 
		program_focus:{
			type:"string",
		}	
	},
	edit,
	save: function( props ) {
		
		const { attributes, className } = props
	
		const {
			label,
			block_id,
			redirect,
			program_focus
		} = attributes
		
	
		return (
			<div
				className={ classnames(
						"aeopr-form__wrapper",
						"aeopr-leadform",
						
					) }
					id={`aeopr-form-container`}
					data-has-form="1" 
					data-redirect={redirect}
					data-program-focus={program_focus}
			/>
		)
	},
} )