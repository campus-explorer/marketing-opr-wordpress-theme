/**
 * Inspector Controls
 */

// Setup the block
const { __ } = wp.i18n;
const { Fragment } = wp.element;

import compact from 'lodash/compact';
import map from 'lodash/map';
import RenderSettingControl from '../../../utils/components/settings/renderSettingControl';
import Select from 'react-select';

import { htmlDecode } from '../helpers/helpers';

import VideoSelector from './videoSelector';

// Import block components
const { InspectorControls } = wp.blockEditor;

// Import Inspector components
const {
	PanelBody,
	PanelRow,
	QueryControls,
	RangeControl,
	SelectControl,
	TextControl,
	ToggleControl,
} = wp.components;



/**
 * Create an Inspector Controls wrapper Component
 */
export default function Inspector(props) {

		// Setup the attributes
		const { attributes, setAttributes} = props;

		const { order, orderBy } = attributes;


		// Section title tags
		const sectionTags = [
			{ value: 'div', label: __( 'div', 'aeopr' ) },
			{ value: 'section', label: __( 'section', 'aeopr' ) },
			{ value: 'article', label: __( 'article', 'aeopr' ) },
			{ value: 'aside', label: __( 'aside', 'aeopr' ) },
		];

		// Section title tags
		const sectionTitleTags = [
			{ value: 'h2', label: __( 'H2', 'aeopr' ) },
			{ value: 'h3', label: __( 'H3', 'aeopr' ) },
			{ value: 'h4', label: __( 'H4', 'aeopr' ) },
		];


		return (
			<InspectorControls>
				<PanelBody 
					title={ __('Select a Video','aeopr') }
				>
				
						<VideoSelector {...props}/>
				</PanelBody>
				
				<PanelBody
					title={ __(
						'Video Settings',
						'aeopr'
					) }
					
				>
						
						<ToggleControl
							label={ __(
								'Display Section Title',
								'aeopr'
							) }
							checked={ attributes.displaySectionTitle }
							onChange={ () =>
								setAttributes( {
									displaySectionTitle: ! attributes.displaySectionTitle,
								} )
							}
						/>
					
					{ attributes.displaySectionTitle && (
						
							<TextControl
								label={ __( 'Section Title', 'aeopr' ) }
								type="text"
								value={ attributes.sectionTitle }
								onChange={ ( value ) =>
									setAttributes( {
										sectionTitle: value,
									} )
								}
							/>
						
					) }
						
						<TextControl
								label={ __( 'Video Title', 'aeopr' ) }
								type="text"
								value={ attributes.title }
								onChange={ ( value ) =>
									setAttributes( {
										title: value,
									} )
								}
						/>
						<ToggleControl
							label={ __( 'Display Excerpt', 'aeopr' ) }
							checked={ attributes.displayPostExcerpt }
							onChange={ () =>
								setAttributes( {
									displayPostExcerpt: ! attributes.displayPostExcerpt,
								} )
							}
						/>

						<ToggleControl
							label={ __(
								'Display See More Videos Link',
								'aeopr'
							) }
							checked={ attributes.displayPostLink }
							onChange={ () =>
								setAttributes( {
									displayPostLink: ! attributes.displayPostLink,
								} )
							}
						/>

					{ attributes.displayPostLink && (
						<>
							<TextControl
								label={ __(
									'Customize Continue Reading Text',
									'aeopr'
								) }
								type="text"
								value={ attributes.readMoreText }
								onChange={ ( value ) =>
									setAttributes( {
										readMoreText: value,
									} )
								}
							/>
							<TextControl
								label={ __(
									'Customize URL',
									'aeopr'
								) }
								type="text"
								value={ attributes.readMoreLink }
								onChange={ ( value ) =>
									setAttributes( {
										readMoreLink: value,
									} )
								}
							/>
						</>

					) }
				</PanelBody>
				<PanelBody
					title={ __( 'Post and Page Grid Markup', 'aeopr' ) }
					initialOpen={ false }
					className="aeopr-block-video-testimonial-markup-settings"
				>

						<SelectControl
							label={ __(
								'Post Grid Section Tag',
								'aeopr'
							) }
							options={ sectionTags }
							value={ attributes.sectionTag }
							onChange={ ( value ) =>
								setAttributes( {
									sectionTag: value,
								} )
							}
							help={ __(
								'Change the post grid section tag to match your content hierarchy.',
								'aeopr'
							) }
						/>

					{ attributes.sectionTitle && (

							<SelectControl
								label={ __(
									'Section Title Heading Tag',
									'aeopr'
								) }
								options={ sectionTitleTags }
								value={ attributes.sectionTitleTag }
								onChange={ ( value ) =>
									setAttributes( {
										sectionTitleTag: value,
									} )
								}
								help={ __(
									'Change the post/page section title tag to match your content hierarchy.',
									'aeopr'
								) }
							/>

					) }
					{ attributes.displayPostTitle && (

							<SelectControl
								label={ __(
									'Post Title Heading Tag',
									'aeopr'
								) }
								options={ sectionTitleTags }
								value={ attributes.postTitleTag }
								onChange={ ( value ) =>
									setAttributes( {
										postTitleTag: value,
									} )
								}
								help={ __(
									'Change the post/page title tag to match your content hierarchy.',
									'aeopr'
								) }
							/>

					) }
				</PanelBody>
			</InspectorControls>
		);
	}
