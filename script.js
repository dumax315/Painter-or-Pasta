var gamestage = 0;
var clicked = false;
var mouse = [0,0];
var itemT = "";
var item;
var pOrP = 0;
var ans = 0;
var streek = 0;
var imgready = false;
var qust;
var qustI;
var loaded=false;
var img;
var myVar = setInterval(updateScreen, 50);

var pastas = ["Bavette", "Bigoli", "Bucatini", "Busiate", "Capellini", "Fedelini", "Ferrazuoli", "Fettuccine", "Fileja", "Linguine", "Lagane", "Lasagna", "Lasagnette", "Lasagnotte", "Mafalde", "Matriciani", "Pappardelle", "Perciatelli", "Pici", "Pillus", "Rustiche", "Sagne 'Ncannulate", "Scialatelli Spaghetti", "Spaghetti", "Stringozzi", "Tagliatelle", "Taglierini", "Trenette", "Tripoline", "Vermicelli", "Vermicelloni", "Ziti", "Anelli", "Calamarata", "Torchio", "Casarecce", "Castellane", "Cavatappi", "Cavatelli", "Chifferi", "Cicioneddos", "Conchiglie", "Fagioloni", "Farfalle", "Fazzoletti", "Festoni", "Fiorentine", "Fiori", "Fusilli", "Fusilli Bucati", "Garganelli", "Gemelli", "Gnocchi", "Gomiti", "Kusksu", "Lanterne", "Lorighittas", "Maccheroni", "Maccheroncelli", "Mafaldine", "Maltagliati", "Malloreddus", "Mandala", "Marille", "Mezzani", "Maniche", "Nuvole", "Paccheri", "Passatelli", "Penne", "Penne Ricce", "Picchiarelli", "Pipe rigate", "Pizzoccheri", "Quadrefiore", "Radiatori", "Riccioli", "Ricciolini", "Ricciutelle", "Rigatoncini", "Rigatoni", "Rombi", "Rotelle", "Sagnette", "Sagnarelli", "Sedani", "Spirali", "Spiralini", "Strapponi", "Strozzapreti", "Testaroli", "Tortiglioni", "Treccioni", "Trenne", "Trofie", "Tuffoli", "Vesuvio", "Cencioni", "Corzetti", "Fainelle", "Foglie D'ulivo", "Orecchiette"];
var painters = ["Francesco Albani", "Mariotto Albertinelli", "Fra Angelico", "Pietro Annigoni", "Antonello da Messina", "Fra Bartolomeo", "Gentile Bellini", "Giovanni Bellini", "Jacopo Bellini", "Gianlorenzo Bernini", "Andrea di Bertholotti", "Sandro Botticelli", "Agnolo Bronzino", "Nicolao Branceleon", "Canaletto", "Elio Carletti", "Annibale Carracci", "Ludovico Carracci", "Caravaggio", "Carpaccio", "Cimabue", "Leonardo Coccorante", "Correggio", "Giorgio de Chirico", "Domenichino", "Donatello", "Enrico Donati", "Dosso Dossi", "Duccio", "Gentile da Fabriano", "Rosso Fiorentino", "Andrea da Firenze", "Piero della Francesca", "Artemisia Gentileschi", "Domenico Ghirlandaio", "Giampietrino", "Giorgione", "Giotto", "Giuseppe Grisoni", "Francesco Guardi", "Achille Leonardi", "Filippino Lippi", "Fra Filippo Lippi", "Ambrogio Lorenzetti", "Luigi Malice", "Andrea Mantegna", "Simone Martini", "Masaccio", "Michelangelo", "Amedeo Modigliani", "Lelio Orsi", "Eleuterio Pagliano", "Giovanni Paolo Panini", "Parmigianino", "Ferdinando Partini", "Perugino", "Pietro Pezzati", "Baldassare Peruzzi", "Pinturicchio", "Sebastiano del Piombo", "Pisanello", "Antonio Pollaiuolo", "Pontormo", "Raphael", "Tommaso Redi", "Guido Reni", "Salvator Rosa", "Andrea del Sarto", "Gherardo Stamina", "Bartolomeo Suardi", "Tiepolo", "Tintoretto", "Titian", "Cosimo Tura", "Giorgio Vasari", "Paolo Uccello", "Raffaello Di Vecchio", "Domenico Veneziano", "Paolo Veronese", "Andrea del Verrocchio", "Leonardo da Vinci", "Daniele da Volterra"];
var canvas = document.getElementById("myCanvas");
canvas.height=window.innerHeight;
canvas.width=window.innerWidth;
var ctx = canvas.getContext("2d");
function background() {
	ctx.fillStyle = "#5DADE2";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function titleDesp () {
	ctx.font = canvas.width/15 + "px Arial";
	ctx.fillStyle = '#17202A';
	ctx.fillText("The Painter or Pasta Game", window.innerWidth/2-ctx.measureText("The Painter or Pasta Game").width/2 ,canvas.width/10);
}

function startButton() {
	ctx.fillStyle = 'rgb(255,255,255)';
	ctx.fillRect(window.innerWidth/2-75 ,window.innerHeight/2,150,70 );
	ctx.font = "30px Arial";
	ctx.fillStyle = '#17202A';
	ctx.fillText("Start", window.innerWidth/2-ctx.measureText("Start").width/2 ,window.innerHeight/2+ctx.measureText("Start").width*2/3);
}

function data(thing) {
	var request = new XMLHttpRequest()
	if ((thing.split(" ").length - 1) !== 0){
		var replaced = thing.split(' ').join('%20');

	}
	else {
		var replaced = thing;

	}
	var replaced = thing.split(' ').join('%20');
	request.open('GET', 'https://api.duckduckgo.com/?format=json&pretty=1&q=' + replaced, true)
	request.onload = function() {
		// Begin accessing JSON data here
		var body = JSON.parse(this.response)
		qust = "";
		qustI = "";
		if (request.status >= 200 && request.status < 400) {
			if(body["Abstract"] == ""){
				body["Abstract"]= body["RelatedTopics"][0]["Text"]
			}   
			qust = body["Abstract"];
			console.log(body["Abstract"]);
			if(body["Image"] == ""){
				body["Image"]= body["Icon"][0]["URL"]
			} 
			qustI = body["Image"];
			console.log(qustI);
			if (qustI !== undefined && qustI !== ""){
				imgobj(qustI,false);
			}
			
		} else {
			console.log('error')
			qust = "";
			qustI = "";
		}
	}

	request.send()

}


function imgobj(url) {
	imgready = false;
	img = new Image();
	img.src = url;
	img.onload =  function () {
		imgready = true;
	};
	img.src = url;
}

 /**
     * Divide an entire phrase in an array of phrases, all with the max pixel length given.
     * The words are initially separated by the space char.
     * @param phrase
     * @param length
     * @return
     */
function getLines(ctx, text, maxWidth) {
    var words = text.split(" ");
    var lines = [];
    var currentLine = words[0];

    for (var i = 1; i < words.length; i++) {
        var word = words[i];
        var width = ctx.measureText(currentLine + " " + word).width;
        if (width < maxWidth) {
            currentLine += " " + word;
        } else {
            lines.push(currentLine);
            currentLine = word;
        }
    }
    lines.push(currentLine);
    return lines;
}

function last(words) {
    var n = words.split(" ");
    return n[n.length - 1];

}

function anss(ri) {
	ctx.font = canvas.height/24 + "px Arial";
	if (ri){
		ctx.fillStyle = "black";
		ctx.fillText("Correct", canvas.width/2-ctx.measureText("Correct").width/2, canvas.height/9);
	}
	else {
		ctx.fillStyle = "black";
		ctx.fillText("Wrong", canvas.width/2-ctx.measureText("Wrong").width/2, canvas.height/9);
	}
	ctx.fillText("Click to continue", canvas.width/2-ctx.measureText("Click to continue").width/2, canvas.height/1.2);
	ctx.fillText("streak: " + streek, canvas.width/2-ctx.measureText("streak: " + streek).width/2, canvas.height/1.2 + ctx.measureText("m").width+canvas.height/80);
	if (imgready) {
		var scale = 3.5;
		var ks = canvas.height/scale/img.height;
		ctx.drawImage(img, canvas.width/2-img.width*ks/2, canvas.height/2,img.width*ks,canvas.height/scale);
	}
	if (qust !== undefined) {
		ctx.font = canvas.height/45 + "px Arial";
		var broken = getLines(ctx,qust,canvas.width*.9);
		for (var i = 0;i < broken.length; i++) {
			ctx.fillText(broken[i], canvas.width/2-ctx.measureText(broken[i]).width/2, canvas.height/6+(ctx.measureText("m").width+10)*i);
		}
	}
}

function clickC(event){
	var rect = canvas.getBoundingClientRect();
	clicked = true;
	mouse = [event.clientX - rect.left, event.clientY - rect.top ]

}

function lAndR() {
	ctx.fillStyle = "paleturquoise";
	ctx.fillRect(0, 0, canvas.width/2, canvas.height);
	ctx.fillStyle = "pink";
	ctx.fillRect(canvas.width/2, 0, canvas.width/2, canvas.height);
	ctx.fillStyle = "thistle";
	ctx.fillRect(0, 0, canvas.width, canvas.height/4);
	ctx.fillStyle = "blue";
	ctx.font = canvas.width/25+canvas.height/35 + "px Arial";
	ctx.fillText(last(itemT), canvas.width/2-ctx.measureText(last(itemT)).width/2, canvas.height/8);
	ctx.fillText("Painter", canvas.width/4-ctx.measureText("Painter").width/2, canvas.height/1.5);
	ctx.fillText("Pasta", canvas.width/1.5, canvas.height/1.5);
}

function updateScreen () {
	background();
	if(gamestage == 0) {
		if (clicked == true) {
			clicked = false;
			if (mouse[0] >= window.innerWidth/2-75 && mouse[1] >= window.innerHeight/2 &&mouse[0] <= window.innerWidth/2-75+150 && mouse[1] <= window.innerHeight/2+70 ) {
				gamestage = 1;
			}
		}
		titleDesp()
		startButton()
	}
	if(gamestage === 1) {
		//pick a person or pasta
		pOrP = Math.floor(Math.random() * 2);
		if (pOrP === 0) {
			item = Math.floor(Math.random() * painters.length);
			itemT = painters[item];
		}
		else {
			item = Math.floor(Math.random() * pastas.length);
			itemT = pastas[item];
		}

		gamestage = 2;
		qust = "";
		qustI = "";
		img= undefined;
		imgready = false;
		data(itemT)
	}
	if (gamestage === 2) {
		lAndR();
		if (clicked == true) {
			console.log(mouse)
			clicked = false;
			if (mouse[0] <= canvas.width/2) {
				ans = 0;
			}
			else {
				ans = 1;
			}
			if (pOrP === ans) {
				streek++;
			}
			else {
				streek = 0;
			}
			gamestage = 3;
		}
	}
	if (gamestage === 3){
		if (pOrP === ans) {
			anss(true);
		}
		else {
			anss(false);
		}
		if (clicked === true) {
			clicked = false;
			gamestage = 1;
		}
	}
}
