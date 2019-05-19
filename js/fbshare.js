window.fbAsyncInit = function() {
  FB.init({
    appId      : '2227084750941616',
    xfbml      : true,
    version    : 'v2.9'
  });
  FB.AppEvents.logPageView();
};

(function(d, s, id){
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement(s); js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function shareonFB(){

  // Dynamically gather and set the FB share data.
  var FBDesc      = 'Cassoshi';
  var FBTitle     = 'Cassoshi';
  var FBLink      = 'http://lucascassan.github.io/bttc/';
  var FBPic       = 'https://i.imgur.com/WGeBNZq.png';

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
  })
}
