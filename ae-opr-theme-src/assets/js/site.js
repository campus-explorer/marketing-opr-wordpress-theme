function loadForm(){
	var script = document.createElement("script");
    // This script has a callback function that will run when the script has
    // finished loading.
    script.src = "http://www.google.com/jsapi?callback=loadGraphs";
    script.type = "text/javascript";
    document.getElementsByTagName("head")[0].appendChild(script);
}

document.addEventListener("DOMContentLoaded", function(event) {

/// --> set all a.menulinks to menuitem	
	const menuItems = document.querySelectorAll('a.menu-link');
	for(menuItem of menuItems){
		menuItem.setAttribute('role', 'menuitem')
	}
/// --> set all submenu uls to role of menu
	const menuSubMenus = document.querySelectorAll('a.menu-link > ul, ul.sub-menu');
	for(menuSubMenu of menuSubMenus){
		menuSubMenu.setAttribute('role', 'menu')
	}
/// --> need to set all li to role=none to turn off listitem role
	const menuListItems = document.querySelectorAll('li.menu-item, li.menu-row, li.menu-column');
	for(menuListItem of menuListItems){
		menuListItem.setAttribute('role', 'presentation');
	}
/// --> set main container roles
	const navMenus = document.querySelectorAll('ul.mega-menu');
	for(navMenu of navMenus){
		navMenu.setAttribute('role', 'menubar');
	}
	
	/*const navNoLinks = document.querySelectorAll('.menu-no-link > a')//, .nav-main-menu-item > a');
	for(navNoLink of navNoLinks){
//		const navLinkTag = navNoLink.getElementsByTagName('a');
//		navLinkTag.setAttribute('href', '#');
		navNoLink.setAttribute('href', '#');
		navNoLink.addEventListener('click', function(e){
			e.preventDefault();
		})
	}*/
	

/// --> Blog filter conversion
	const blogNavHeads = document.querySelectorAll('.blog-navigation .side-bar-links h4');
	//const blogNavMenus = document.querySelectorAll('.blog-navigation .side-bar-links ul');

	for(blogNavHead of blogNavHeads){
		if (window.getComputedStyle(blogNavHead.nextElementSibling).display === "none") {
			blogNavHead.addEventListener('click', function(){
				this.parentElement.parentElement.classList.toggle('menu-open');
			})
		}
	}
	
	
	
	
});

