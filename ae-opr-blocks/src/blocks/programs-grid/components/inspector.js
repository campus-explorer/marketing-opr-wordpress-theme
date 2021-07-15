/**
 * Inspector Controls
 */

///add url field for LInkOut True
// Setup the block
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;

import compact from 'lodash/compact';
import map from 'lodash/map';
import RenderSettingControl from 'Src/utils/components/settings/renderSettingControl';
import Select from 'react-select';

// Import block components
const { InspectorControls } = wp.blockEditor;

// Import Inspector components
const {
	PanelBody,
	QueryControls,
	RangeControl,
	SelectControl,
	TextControl,
	ToggleControl,
} = wp.components;

const { addQueryArgs } = wp.url;

const { apiFetch } = wp;

const MAX_POSTS_COLUMNS = 4;

/**
 * Create an Inspector Controls wrapper Component
 */
export default class Inspector extends Component {
	constructor() {
		super( ...arguments );
		this.state = { programTypeTax: [] };
	}

	componentDidMount() {
		this.stillMounted = true;
		this.fetchRequest = apiFetch( {
			path: addQueryArgs( '/wp/v2/program_types', { per_page: -1 } ),
		} )
			.then( ( programTypeTax ) => {
				if ( this.stillMounted ) {
					this.setState( { programTypeTax } );
				}
			} )
			.catch( () => {
				if ( this.stillMounted ) {
					this.setState( { programTypeTax: [] } );
				}
			} );
			
	}

	componentWillUnmount() {
		this.stillMounted = false;
	}

	render() {

		// Setup the attributes
		const { attributes, setAttributes, programsList } = this.props;

		const { order, orderBy, program_types } = attributes;

		const { programTypeTax } = this.state;

		
		const programTypes = programTypeTax && programTypeTax.map(obj=>{
			let pObj = {}
			pObj['value'] = obj.id
			pObj['label'] = obj.name
			return pObj
			})
		//add blank item to front of programTypes Array
		programTypes.unshift({value:'', label:'All'});
		
		
		// Section title tags
		const sectionTags = [
			{ value: 'div', label: __( 'div', 'aeopr' ) },
			{ value: 'section', label: __( 'section', 'aeopr' ) },
			{ value: 'article', label: __( 'article', 'aeopr' ) },
		];

		// Section title tags
		const sectionTitleTags = [
			{ value: 'h3', label: __( 'H3', 'aeopr' ) },
			{ value: 'h4', label: __( 'H4', 'aeopr' ) },
		];

		// Check for posts
		const hasPosts = programsList && Array.isArray( programsList ) && programsList.length;


		return (
			<InspectorControls>
				<PanelBody
					title={ __(
						'Programs Grid Settings',
						'aeopr'
					) }
				>
					<Fragment>
				
						<RenderSettingControl id="aeopr_programsgrid_programQueryControls">						
							<SelectControl
								label="Program Type"
								options={  programTypes }
								value={ program_types }
								onChange={(value)=>{
									setAttributes({program_types: value});
									//change entityREcords
									
								}}
							/>
						

						
						</RenderSettingControl>

						
					</Fragment>

					{ 'grid' === attributes.postLayout && (
						<RenderSettingControl id="aeopr_programsgrid_columns">
							<RangeControl
								label={ __( 'Columns', 'aeopr' ) }
								value={ attributes.columns }
								onChange={ ( value ) =>
									setAttributes( { columns: value } )
								}
								min={ 1 }
								max={ MAX_POSTS_COLUMNS
									/*! hasPosts
										? MAX_POSTS_COLUMNS
										: Math.min(
												MAX_POSTS_COLUMNS,
												latestPosts.length
										  )*/
								}
							/>
						</RenderSettingControl>
					) }
				</PanelBody>
				<PanelBody
					title={ __(
						'Programs Grid Content',
						'aeopr'
					) }
					initialOpen={ false }
				>
				<RenderSettingControl id="aeopr_programsgrid_sectionTitle">
					<TextControl
						label={ __( 'Section Title', 'aeopr' ) }
						type="text"
						value={ attributes.sectionTitle }
						onChange={ ( value ) =>
							this.props.setAttributes( {
								sectionTitle: value,
							} )
						}
					/>
				</RenderSettingControl>
									
				<RenderSettingControl id="aeopr_programsgrid_linkOut">
					<ToggleControl
						label={ __(
							'Link to separate page',
							'aeopr'
						) }
						checked={ attributes.linkOut }
						onChange={ () =>
							this.props.setAttributes( {
								linkOut: ! attributes.linkOut,
							} )
						}
					/>
				</RenderSettingControl>
				<RenderSettingControl id="aeopr_programsgrid_extPages">
					<ToggleControl
						label={ __(
							'Include External Pages',
							'aeopr'
						) }
						checked={ attributes.extPages }
						onChange={ () =>
							this.props.setAttributes( {
								extPages: ! attributes.extPages,
							} )
						}
					/>
				</RenderSettingControl>
				
				

				</PanelBody>
				<PanelBody
					title={ __( 'Programs Grid Markup', 'aeopr' ) }
					initialOpen={ false }
					className="aeopr-block-programs-grid-markup-settings"
				>
					<RenderSettingControl id="aeopr_programsgrid_sectionTag">
						<SelectControl
							label={ __(
								'Post Grid Section Tag',
								'aeopr'
							) }
							options={ sectionTags }
							value={ attributes.sectionTag }
							onChange={ ( value ) =>
								this.props.setAttributes( {
									sectionTag: value,
								} )
							}
							help={ __(
								'Change the programs grid section tag to match your content hierarchy.',
								'aeopr'
							) }
						/>
					</RenderSettingControl>
					{ attributes.sectionTitle && (
						<RenderSettingControl id="aeopr_programsgrid_sectionTitleTag">
							<SelectControl
								label={ __(
									'Section Title Heading Tag',
									'aeopr'
								) }
								options={ sectionTitleTags }
								value={ attributes.sectionTitleTag }
								onChange={ ( value ) =>
									this.props.setAttributes( {
										sectionTitleTag: value,
									} )
								}
								help={ __(
									'Change the programs section title tag to match your content hierarchy.',
									'aeopr'
								) }
							/>
						</RenderSettingControl>
					) }
						<RenderSettingControl id="aeopr_programsgrid_postTitleTag">
							<SelectControl
								label={ __(
									'Program Title Heading Tag',
									'aeopr'
								) }
								options={ sectionTitleTags }
								value={ attributes.postTitleTag }
								onChange={ ( value ) =>
									this.props.setAttributes( {
										postTitleTag: value,
									} )
								}
								help={ __(
									'Change the program title tag to match your content hierarchy.',
									'aeopr'
								) }
							/>
						</RenderSettingControl>

				</PanelBody>
			</InspectorControls>
		);
	}
}
