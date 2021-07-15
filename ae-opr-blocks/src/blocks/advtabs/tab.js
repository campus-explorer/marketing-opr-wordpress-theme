( function(wpI18n, wpBlocks, wpElement, wpBlockEditor, wpComponents) {
    wpBlockEditor = wp.blockEditor || wp.editor;
    const { __ } = wpI18n;
    const { Component, Fragment } = wp.element;
    const { registerBlockType } = wp.blocks;
    const { InnerBlocks } = wp.blockEditor;
    const { select } = wp.data;

    const tabsBlockIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <path fill="none" d="M0,0h24v24H0V0z"/>
            <path fill="none" d="M0,0h24v24H0V0z"/>
            <path d="M21,3H3C1.9,3,1,3.9,1,5v14c0,1.1,0.9,2,2,2h18c1.1,0,2-0.9,2-2V5C23,3.9,22.1,3,21,3z M21,19H3V5h10v4h8V19z"/>
        </svg>
    );

    /**
     * This allows for checking to see if the block needs to generate a new ID.
     */
    const aeoprTabsUniqueIDs = [];

    class TabItemEdit extends Component {
        constructor() {
            super( ...arguments );
        }

        componentWillMount() {
            const { attributes, setAttributes, clientId } = this.props;

            const { getBlockRootClientId, getBlockAttributes } = !wp.blockEditor ? select( 'core/editor' ) : select( 'core/block-editor' );
            const rootBlockId = getBlockRootClientId( clientId );
            const rootBlockAttrs = getBlockAttributes( rootBlockId );

            // Apply parent style if newly inserted
            if (attributes.changed !== true) {
                if (rootBlockAttrs !== null && rootBlockAttrs.needUpdate !== false) {
                    Object.keys(rootBlockAttrs).map((attribute) => {
                        attributes[attribute] = rootBlockAttrs[attribute];
                    });

                    // Done applied, we will not do this again
                    setAttributes( { changed: true } );
                }
            }
        }

        componentDidMount() {
            const { attributes, setAttributes } = this.props;
            const {id, tabHeaders} = attributes;

            if ( ! this.props.attributes.uniqueID ) {
                this.props.setAttributes( {
                    uniqueID: '_' + this.props.clientId.substr( 2, 9 ),
                } );
                aeoprTabsUniqueIDs.push( '_' + this.props.clientId.substr( 2, 9 ) );
            } else if ( aeoprTabsUniqueIDs.includes( this.props.attributes.uniqueID ) ) {
                this.props.setAttributes( {
                    uniqueID: '_' + this.props.clientId.substr( 2, 9 ),
                } );
                aeoprTabsUniqueIDs.push( '_' + this.props.clientId.substr( 2, 9 ) );
            } else {
                aeoprTabsUniqueIDs.push( this.props.attributes.uniqueID );
            }

            setAttributes({
                header: tabHeaders[id]
            })
        }

        render() {
            const { attributes } = this.props;
            const {tabActive, id, uniqueID} = attributes;

            const tabClassName = [
                `aeopr-tab-${uniqueID}`,
                'aeopr-tab-body'
            ].filter(Boolean).join(' ');
            return (
                <Fragment>
                    <div className={tabClassName}
                         style={{
                             display: id === tabActive ? 'block' : 'none',
                         }}
                    >
                        <InnerBlocks
                            template={[ [ 'core/paragraph' ] ]}
                            templateLock={false}
                        />
                    </div>
                </Fragment>
            );
        }
    }

    registerBlockType( 'aeopr/tab', {
        title: __( 'Tab Item', 'aeopr' ),
        parent: [ 'aeopr/adv-tabs' ],
        icon: {
            src: tabsBlockIcon
        },
        category: 'aeopr',
        attributes: {
            id: {
                type: 'number',
                default: 0
            },
            pid: {
                type: 'string',
            },
            header: {
                type: 'html',
            },
            tabActive: {
                type: 'number',
                default: 0,
            },
            changed: {
                type: 'boolean',
                default: false,
            },
            tabHeaders: {
                type: 'array',
                default: [
                    __( 'Tab 1', 'aeopr' ),
                    __( 'Tab 2', 'aeopr' ),
                    __( 'Tab 3', 'aeopr' ),
                ]
            },
            uniqueID: {
                type: 'string',
                default: '',
            }
        },
        supports: {
            reusable: false,
        },
        keywords: [ __( 'tab', 'aeopr' ) ],
        edit: TabItemEdit,
        save: function( { attributes } ) {
            const {id, uniqueID, header} = attributes;

            const tabClassName = [
                `aeopr-tab-${uniqueID}`,
                'aeopr-tab-body'
            ].filter(Boolean).join(' ');

            return (
                <div className="aeopr-tab-body-container">
                    <div className="aeopr-tab-body-header">{header}</div>
                    <div className={tabClassName} aria-labelledby={`aeopr-tabs-tab${id}`}>
                        <InnerBlocks.Content />
                    </div>
                </div>
            );
        },
        deprecated: [
            {
                attributes: {
                    pid: {
                        type: 'string',
                    },
                    header: {
                        type: 'html',
                    },
                    tabActive: {
                        type: 'number',
                        default: 0,
                    },
                    changed: {
                        type: 'boolean',
                        default: false,
                    },
                    tabHeaders: {
                        type: 'array',
                        default: [
                            __( 'Tab 1', 'aeopr' ),
                            __( 'Tab 2', 'aeopr' ),
                            __( 'Tab 3', 'aeopr' ),
                        ]
                    },
                    uniqueID: {
                        type: 'string',
                        default: '',
                    }
                },
                save: function( { attributes } ) {
                    const {pid, header} = attributes;

                    return (
                        <div className="aeopr-tab-body-container">
                            <div className="aeopr-tab-body-header">{header}</div>
                            <div className="aeopr-tab-body" id={pid}>
                                <InnerBlocks.Content />
                            </div>
                        </div>
                    );
                }
            }
        ]
    });

} ) ( wp.i18n, wp.blocks, wp.element, wp.blockEditor, wp.components );