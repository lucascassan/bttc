var titles = [
  "JULIA OUVINDO CRYSTAL CASTLE",
  "BOMBO TRAVADO",
  "BATEU O BOLONHA",
  "HOMEM ARANHA RUPESTRE",
  "NELSON DE ROUPAO",
  "PATY INDIGNADA",
  "BOLO DA DIANA",
  "FILA DE SEXO NO CARRO DO RAUL",
  "VOMITO NOS VIDEOGAMES",
  "BRENONINHO",
  "MALU DOIDONA",
  "JOAO MACEWICIUS DORMINDO",
  "IAGO IGOR GOD",
  "CYNOLA",
  "YOSHI DE CUECA VERMELHA",
  "TORRESGUI TOMOU UMA CUZADA",
  "LUCAS OLIVEIRA TRAVADO",
  "LUCAS FARIA PUTASSO",
  "ESQUECI FAZ OUTRA",
  "3 PARES DE SAPATO",
  "RESPEITINHA",
  "QUEM E MEU MENINAO",
  "NATALIA FICOU SOLTEIRA",
  "JOSE CANSADO",
  "CAINAN PRESO COM FITAS",
  "TBTIAGO",
  "SABONETE DO KENJI E DA GABI",
  "THIS IS CASSOSHI",
  "PALOMA E FERNANDO PERDIDOS",
  "PETERPETERPETER",
  "LEOZAO S2",
  "MATHEUS OTAVIO NEM DORMIU",
  "FOTOGRAFIAS BY BUNHO",
  "EU TROUXE O FEIJAO - NANA",
  "RICARDOBOMBOM",
  "TOBOGA FRUSTRADO",
  "IAGO IGOR PRODUCOES",
  "DJ JULIAO DUAS HORAS DE FUNK SEM INTERVALO",
  "URSAO DA CASSOSHI",
  "MARCIO ROGERIO",
  "CREATURE COMFORT",
  "NO TEARS LEFT TO CRY",
  "RUAAAAAN",
  "BOMBOOOOOOO",
  "BARRIGA SOLTA"
];

var ready = 1;
var min=0;
var max= titles.length;
var random = Math.floor(Math.random() * (+max - +min)) + +min;

function changeCredits(){
    document.getElementById("IDmarquee").innerHTML = titles[random];
    $('.marquee').bind('finished', function () {
      document.getElementById("IDmarquee").innerHTML = "";
      random++;
      changeCredits();
    }).marquee({duration:3000});

  }
