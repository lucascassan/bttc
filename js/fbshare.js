window.fbAsyncInit = function() {
  FB.init({
    appId      : '2227084750941616',
    xfbml      : true,
    version    : 'v3.3'
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
FB.ui({
    display: 'popup',
    method: 'share',
    title: '150 pontos',
    description: 'BACK TO THE CASSOSHI • COMING SOON • 29.06.2019',
    link: 'THIS IS A LINK TO YOUR QUIZ'S PAGE ON YOUR WEBSITE',
    picture: 'THIS PICTURE WILL BE THE FACEBOOK SHARE IMAGE',
    href: 'http://www.lucascassan.github.io/bttc/',

}, function(response){});

}
