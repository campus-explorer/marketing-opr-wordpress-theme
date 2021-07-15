// Import block dependencies and components
import Accordion from './accordion';

/**
 * WordPress dependencies
 */
const { Component } = wp.element;
const { RichText, InnerBlocks } = wp.blockEditor;

export default class Save extends Component {
	constructor() {
		super( ...arguments );
	}

	render() {
		return (
			<Accordion { ...this.props }>
				<details open={ this.props.attributes.accordionOpen }>
					<summary className="aeopr-course-accordion-title accordion-title">
						<RichText.Content
							value={ this.props.attributes.accordionTitle }
						/>
					</summary>
					<div className="aeopr-course-accordion-text">
						<InnerBlocks.Content />
					</div>
				</details>
			</Accordion>
		);
	}
}
