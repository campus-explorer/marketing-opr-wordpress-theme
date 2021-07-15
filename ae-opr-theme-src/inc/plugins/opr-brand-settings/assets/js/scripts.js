document.onreadystatechange = () => {
	if (document.readyState === 'complete') {
//DOM is ready

		/*const containers = document.querySelectorAll('div.settings_container');
		const form = document.querySelector('form');
		containers.forEach((container)=>{
			form.insertBefore(container, form.childNodes[0]);
		})*/
		
			
	/////Logo Selector
		const imgButton = document.querySelector('.upload_image_button')
		imgButton && imgButton.addEventListener('click', function(){
			const displayButton = this;
			const hiddenField = displayButton.nextElementSibling;
			const removeButton = hiddenField.nextElementSibling;		
    		var custom_uploader = wp.media({
					title: 'Insert image',
					library : {
						type : 'image'
					},
					button: {
						text: 'Use this image' // button label text
					},
					multiple: false // for multiple image selection set to true
				}).on('select', function() { // it also has "open" and "close" events 
					var attachment = custom_uploader.state().get('selection').first().toJSON();
					displayButton.innerHTML='<img class="true_pre_image" src="' + attachment.url + '" style="max-width:250px;display:block;" />';
					displayButton.classList.remove('button')
					hiddenField.value=attachment.id;
					removeButton.style.display="block";
				})
				.open();
			});
		 
			/*
			 * Remove image event
			 */
			const removeButton = document.querySelector('.remove_image_button')
			removeButton && removeButton.addEventListener('click', function(){
				const hiddenField = this.previousElementSibling;
				const button = hiddenField.previousElementSibling;
				this.style.display="none";
				hiddenField.value='';
				button.classList.add('button');
				button.innerHTML='Select Image';
				return false;
			});
	
	}
}


	


/*jQuery(function($){

	$('body').on('click', '.upload_image_button', function(e){
		e.preventDefault();

    		var button = $(this),
    		    custom_uploader = wp.media({
			title: 'Insert image',
			library : {
				type : 'image'
			},
			button: {
				text: 'Use this image' // button label text
			},
			multiple: false // for multiple image selection set to true
		}).on('select', function() { // it also has "open" and "close" events 
			var attachment = custom_uploader.state().get('selection').first().toJSON();
			$(button).removeClass('button').html('<img class="true_pre_image" src="' + attachment.url + '" style="max-width:250px;display:block;" />').next().val(attachment.id).next().show();
		})
		.open();
	});
 
	/*
	 * Remove image event
	 *
	$('body').on('click', '.remove_image_button', function(){
		$(this).hide().prev().val('').prev().addClass('button').html('Upload image');
		return false;
	});
});*/

