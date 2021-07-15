/**
 * BLOCK: Advanced Section - Save Block
 */

import classnames from "classnames"
const { __ } = wp.i18n

const {
	RichText,
	InnerBlocks
} = wp.blockEditor
const {
	Text
} = wp.components

// Extend component
const { Fragment } = wp.element

export default function save( props ) {
		console.log(props, 'save')
		const { attributes, className } = props

		const {
			area_name,
			menuItems,
		} = props.attributes
		//console.log(attributes,'save')
		const menuList = () =>{
			//const menuListItems = this.state.menuItems;
			if(menuItems){
				//collect items into tags 
				
				//need to check for menu-column-title class, render as li no a and group
				const theList = menuListItems.map((key,index)=>
					<a href={menuListItems[index].url}>{menuListItems[index].title}</a>
				)
				//return the collection to render.
				return theList;
			}
		}
// { menuList() }
		return (
			<div>
			{area_name}
			</div>
		)
	}


