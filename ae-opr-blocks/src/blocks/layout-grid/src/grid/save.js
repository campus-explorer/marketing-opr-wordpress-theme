/**
 * External dependencies
 */

import classnames from 'classnames';

/**
 * WordPress dependencies
 */

import { InnerBlocks, getColorClassName } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */

import { getAsCSS, removeGridClasses, getGutterClasses } from './css-classname';

const save = ( { attributes, innerBlocks } ) => {
	const {
		className,
		backgroundImage,
		backgroundColor,
		customBackgroundColor,
		backgroundOpacity,
		backgroundRepeat,
		backgroundSize,
		backgroundPosition,
		tagName
	} = attributes;
	
	const extra = getAsCSS( innerBlocks.length, attributes );
	
	const backgroundClass = getColorClassName(
		'background-color',
		backgroundColor
	);
	const classes = classnames(
		removeGridClasses( className ),
		extra,
		getGutterClasses( attributes ),
		backgroundClass
	);
	
	const styles = {
			opacity: backgroundOpacity/100,
			backgroundRepeat: backgroundRepeat,
			backgroundSize:backgroundSize,
			backgroundPosition:backgroundPosition,
		};
		
		if(!backgroundColor || undefined==backgroundColor.class) styles.backgroundColor=customBackgroundColor;
		if(undefined != backgroundImage) styles.backgroundImage=`url(${backgroundImage.url})`;
	
	const TagName = tagName||'div';

	return (
		<TagName 
			className={ classes }
			style={styles}>
			<InnerBlocks.Content />
		</TagName>
	);
};

export default save;
