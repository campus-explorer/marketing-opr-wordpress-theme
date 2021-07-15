/**
 * BLOCK: Advanced Section - Save Block
 */

import classnames from "classnames"
const { __ } = wp.i18n

const {
	RichText,
	InnerBlocks
} = wp.blockEditor


// Extend component
const { Fragment } = wp.element

export default function save( props ) {
		const { attributes, className } = props

		const {
			block_id,
			area_name,
			menuItems,
		} = props.attributes
		
		
		const menu_list = () =>{
				//need to check for menu-column-title class, render as li no a and group
				if("undefined"!=menuItems && menuItems){
					menuItems.map(index=>{
					 	return <p key={`item-${index.db_id}`}>{index.title}</p>
			 		})
				}
		}
		
		return (
			<div
				className={ classnames(
				className,
				"aeopr-page-menu__outer-wrap",
				`aeopr-block-${ block_id }`
				) }
				>
				
			
				{menu_list()}
				
				
			</div>
		)
	}


