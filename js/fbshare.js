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
  // FB.ui({
  //     display: 'popup',
  //     method: 'feed',
  //     name: '150 pontos',
  //     caption: 'teste',
  //     description: 'COMING SOON - 29.06.2019',
  //     link: 'http://lucascassan.github.io/bttc/',
  //     picture: 'https://i.imgur.com/fHX8cL7.png'//,
  //     //href: 'http://lucascassan.github.io/bttc/'

  var obj = {
    method: 'feed',
    link: 'http://lucascassan.github.io/bttc/',
    description: "$ Pontos",
    picture: 'https://i.imgur.com/fHX8cL7.png',
    name: 'BACK TO THE CASSOSHI'
  };
  FB.ui(obj);



}
