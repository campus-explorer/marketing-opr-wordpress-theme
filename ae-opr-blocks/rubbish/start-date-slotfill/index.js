import { registerPlugin } from '@wordpress/plugins';
import { PluginDocumentSettingPanel } from '@wordpress/edit-post';
const {
	InspectorControls,
} = wp.editor;
const {
	ToggleControl
} = wp.components;
const{
	select, 
	dispatch, 
	withSelect,
	withDispatch,
	useSelect
}=wp.data;
const{
	compose	
}=wp.compose
const{
	useEntityProp
}=wp.coreData


//if the meta for _aeopr_start_date_show is not set, then default to true
let PluginMetaFields = compose(
	withSelect(
		
	  (select) => {
		  if (!select('core/editor').getEditedPostAttribute('meta'))return;
		const dateShowMeta = select('core/editor').getEditedPostAttribute('meta')['_aeopr_start_date_show'];
	    return {
	      start_date_metafield: (null != dateShowMeta  && "undefined" != typeof dateShowMeta)? dateShowMeta :true
	    }
	  }
	),
	
	withDispatch(
	  (dispatch) => {
	    return {
	      onMetaFieldChange: (value) => {
	        dispatch('core/editor').editPost({meta: {_aeopr_start_date_show: value}})
	      }
	    }
	  })
)(({start_date_metafield, onMetaFieldChange}) =>{
	return(
		<ToggleControl
			label="Show Start Date Bar"
			checked={start_date_metafield}
			onChange={(value)=>{
				onMetaFieldChange(value)
			}}
		/>
	)
});
const PluginDocumentSettingPanelStartDate = (props) => {    
	return(
	    <PluginDocumentSettingPanel
	        name="start-date-bar"
	        title="Start Date Bar"
	        className="start-date-bar"
	    >
	    	<PluginMetaFields/>
	        
	    </PluginDocumentSettingPanel>
	)
}
 
registerPlugin( 'plugin-document-setting-panel-start-date', {
    render: PluginDocumentSettingPanelStartDate,
    icon: 'calendar',
    name: 'start-date-bar'
} );