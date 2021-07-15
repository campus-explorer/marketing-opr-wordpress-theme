<?
	class FormBuild extends DOMDocument{
		protected $form;
		function __construct(){
			parent::__construct('1.0','iso-8859-1' );
			$this->formatOutput = true;
			$this->form = $this->createElement('form');
			$this->form->setAttribute('method','post');
			$this->form->setAttribute('action','options.php');
			
		}
		public function buildForm($root, $fields, $title){

			$container = $this->createElement('div');
			$container->setAttribute('id',$title.'__container');
			$container->setAttribute('class', 'settings_container');
			
			$titleEl = $this->createTitle('h2',$title);
			$container->appendChild($titleEl);
			while ( list($key, $val) = each($fields) ) {
				$label=$this->createElement('label',$key);
				
				$fieldName = 'opr_brand_settings_'.strtolower(str_replace(' ','_',$key));
				if(is_array($val)){

					switch($val['type']){
						case 'uploader':
							$key=$this->createUploader($fieldName, 'opr_settings_input');
							break;
						case 'date':
							$key=$this->createInput('date',$fieldName,'opr_settings_input');
							break;
						case 'file':
							$key=$this->createInput('file',$fieldName,'opr_settings_input');
							break;
						case 'textarea':
							$key=$this->createArea($fieldName,'opr_settings_textarea opr_settings_input');
							break;
						default:
							$key=$this->createInput('text',$fieldName,'opr_settings_input');
							break;

					}
				}else{
					$key=$this->createInput('text',$fieldName,'opr_settings_input');

				}
				
				$label->appendChild($key);
				$container->appendChild($label);
			    //echo "$key => $val ||\n";
			}
			
			$root->appendChild($container);
			return;
			
		}
		
		public  function createInput($type,$name,$class){
			$temp= $this->createElement('input');
			$temp->setAttribute('name',$name);
			$temp->setAttribute('class',$class);
			$temp->setAttribute('type',$type);
			$temp->setAttribute('value',esc_attr( get_option($name)));
			return $temp;
		}
		
		public  function createArea($name,$class){
			$temp= $this->createElement('textarea');
			$temp->setAttribute('name',$name);
			$temp->setAttribute('class',$class);
			$temp->setAttribute('rows','10');
			$temp->setAttribute('cols','50');
			$content = $this->createTextNode(esc_attr( get_option($name)));
			$temp->appendChild($content);
			return $temp;
		}
		
		
		public function createUploader( $name, $class) {
			$image = $this->createElement('span','Select image');
			$actionType = 'button';
			$image_size = 'full'; // it would be better to use thumbnail size here (150x150 or so)
			$display = 'none'; // display state ot the "Remove image" button
			
			$input= $this->createElement('input');
			$input->setAttribute('type', 'hidden');
			$input->setAttribute('name', $name);
			$input->setAttribute('id',$name);
			$input->setAttribute('value', esc_attr(get_option($name)));
			
			$imageInput = $this->createElement('a');
			$imageInput->setAttribute('href', '#');
			$imageInput->setAttribute('class', 'upload_image_button '.$actionType);

			
			if( $image_attributes = wp_get_attachment_image_src( esc_attr(get_option($name)), $image_size ) ) {
		 
				// $image_attributes[0] - image URL
				// $image_attributes[1] - image width
				// $image_attributes[2] - image height
		 
				$image = $this->createElement('img');
				$image->setAttribute('src',$image_attributes[0]);
				$image->setAttribute('style','max-width:250px; width:80%; display:block');
				$display = 'block';
				$actionType = "";
		 
			} 
			
/// if $image is an object, append it, else set as value			
			if(gettype($image)==='object'){
				$imageInput->appendChild($image);
			}else{
				$imageInput.setAttribute('value',$image);
			}
			
			$imageRemove = $this->createElement('a', 'Remove Image');
			$imageRemove->setAttribute('href','#');
			$imageRemove->setAttribute('class', 'remove_image_button');
			$imageRemove->setAttribute('style', 'display:'.$display);
			
			
			$form_group = $this->createElement('div');
			$form_group->appendChild($imageInput);
			$form_group->appendChild($input);
			$form_group->appendChild($imageRemove);
			
			return $form_group;
			
		}
		
		public  function createTitle($type,$content){
			$temp= $this->createElement($type,$content);
			return $temp;
		}
		
		
		public  function saveHTML(){
			return  html_entity_decode(parent::saveHTML());
		}	
	}