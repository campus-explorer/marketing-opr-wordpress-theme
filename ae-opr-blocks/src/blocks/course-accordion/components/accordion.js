/**
 * Accordion Wrapper
 */

// Setup the block
const { Component } = wp.element;

// Import block dependencies and components
import classnames from 'classnames';

/**
 * Create a Accordion wrapper Component
 */
export default class Accordion extends Component {
	constructor( props ) {
		super( ...arguments );
	}

	render() {
		return (
			<div
				className={ classnames(
					this.props.className,
					this.props.attributes.accordionAlignment
						? 'aeopr-course-align-' + this.props.attributes.accordionAlignment
						: undefined,
					'aeopr-course-accordion',
					this.props.attributes.accordionFontSize
						? 'aeopr-course-font-size-' +
								this.props.attributes.accordionFontSize
						: null
				) }
			>
				{ this.props.children }
			</div>
		);
	}
}
