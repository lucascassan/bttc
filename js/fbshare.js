// this loads the Facebook API
    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) { return; }
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    window.fbAsyncInit = function () {
        var appId = '2227084750941616';
        FB.init({
            appId: appId,
            xfbml: true,
            version: 'v2.9'
        });
    };

    // FB Share with custom OG data.
    (function($) {

        $('.fb_share_btn').on('click', function (event) {
            event.preventDefault();
            event.stopImmediatePropagation();

                // Dynamically gather and set the FB share data.
                var FBDesc      = 'Your custom description';
                var FBTitle     = 'Your custom title';
                var FBLink      = 'http://lucascassan.github.io/bttc/';
                var FBPic       = 'https://i.imgur.com/fHX8cL7.png';

                // Open FB share popup
                FB.ui({
                    method: 'share_open_graph',
                    action_type: 'og.shares',
                    action_properties: JSON.stringify({
                        object: {
                            'og:url': FBLink,
                            'og:title': FBTitle,
                            'og:description': FBDesc,
                            'og:image': FBPic
                        }
                    })
                },
                function (response) {
                // Action after response
                })
        })

    })( jQuery );
