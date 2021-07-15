//This is the frontend scrtipts


///Accordion interactions
const accHeaders = document.querySelectorAll('.aeopr-accordion-header');
for(accHead of accHeaders){
	const container = accHead.parentElement;
	container.classList.add('closed')
	accHead.addEventListener('click', function(){
		container.classList.toggle('closed');
	})
}