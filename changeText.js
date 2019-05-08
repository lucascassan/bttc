
function Counter(elem, delay) {
  var value = parseInt(elem.getAttribute("value"), 10);
  var interval;

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

  function updateDisplay(value) {
    elem.innerHTML = value;
  }

  function run() {
    value += 1;
    if (value == titles.length) value = 0;


    elem.setAttribute("value", value);
    updateDisplay(titles[value]);
  }




  function start() {
    interval = window.setInterval(run, delay);
    value = Math.floor(Math.random() * titles.length -1);
  }


  this.start = start;
}


function randomText(){
  var elem = document.getElementById("title-switcher");
  counter = new Counter(elem, 2000);
  counter.start();
}
