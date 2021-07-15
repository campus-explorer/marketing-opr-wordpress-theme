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
		backgroundRepeart
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
		{
			'has-background': backgroundColor || customBackgroundColor,
			[ backgroundClass ]: backgroundClass,

		}
	);
	
	return (
		<section 
			className={ classes }
			style={{
				backgroundImage:backgroundImage?'url('+backgroundImage.url+')':undefined,
				opacity: backgroundOpacity/100,
				backgroundRepeat: backgroundRepeat,
				backgroundSize:backgroundSize,
				backgroundPosition:backgroundPosition,
			}}
			>
			<InnerBlocks.Content />
		</section>
	);
};

export default save;
