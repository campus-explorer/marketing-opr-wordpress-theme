jQuery(document).ready(function ($) {
    $('.aeopr-tabs-wrapper').each(function () {
        var activeTab = $(this).data('tab-active');
        var tabPanel = $(this).find('.aeopr-tab-panel');

        var tab = $(this).find('li.aeopr-tab:not(".aeopr-tab-active")');
        if($(this).prop('id') !== '') {
            tab = $(this).find('li.aeopr-tab:not(".ui-state-active")');
        }
        var tabs = $(this).find('.aeopr-tab');
        var bodyHeaders = $(this).find('.aeopr-tab-body-header');
        var bodyContainers = $(this).find('.aeopr-tab-body-container');
        var bgColor = tab.css('background-color');
        var borderColor = tab.css('border-color');
        var borderWidth = tab.css('border-width');
        var borderStyle = tab.css('border-style');
        var borderRadius = tab.css('border-radius');
        var textColor = tab.find('a').css('color');

        if($(this).prop('id') !== '') {
            $( this ).find( ".aeopr-tab a:not(.ui-tabs-anchor)" ).unbind( "click" );
            // Render tabs UI
            $( this ).tabs( {
                active: parseInt( activeTab ),
                activate: function ( e, ui ) {
                    var newIdx = ui.newTab.index();
                    bodyHeaders.removeClass( 'header-active' );
                    bodyHeaders.eq( newIdx ).addClass( 'header-active' );
                }
            } );
        } else {

            $( this ).find( ".aeopr-tab a:not(.aeopr-tabs-anchor)" ).unbind( "click" );

            tabs.on( 'click', function ( event ) {
                event.preventDefault();
                var currentTabActive = $( event.target ).closest( '.aeopr-tab' );
                var href = currentTabActive.find( 'a' ).attr( 'href' );

                tabs.removeClass( 'aeopr-tab-active' );
                currentTabActive.addClass( 'aeopr-tab-active' );
                bodyContainers.find( '.aeopr-tab-body' ).hide();
                bodyContainers.find( '.aeopr-tab-body[aria-labelledby="' + href.replace( /^#/, "" ) + '"]' ).show();
            } );

            tabs.eq( activeTab ).trigger( 'click' ); // Default
        }

        bodyHeaders.eq(activeTab).addClass('header-active');
        bodyHeaders.css({
            backgroundColor: bgColor,
            color: textColor,
            borderColor: borderColor,
            borderWidth: borderWidth,
            borderStyle: borderStyle,
            borderRadius: borderRadius
        })
    });

    $('.aeopr-tab-body-header').click(function () {
        var bodyContainer = $(this).closest('.aeopr-tab-body-container');
        var bodyWrapper = $(this).closest('.aeopr-tab-body-wrapper');
        var tabsWrapper = $(this).closest('.aeopr-tabs-wrapper');
        var tabsPanel = tabsWrapper.find('.aeopr-tabs-panel');
        var idx = bodyContainer.index();

        bodyWrapper.find('.aeopr-tab-body-header').removeClass('header-active');
        $(this).addClass('header-active');
        tabsPanel.find('.aeopr-tab').eq(idx).find('a').trigger('click');
    })
});