function generateTemplate(name, data, basicElement) {
  	var template = document.getElementById(name).innerHTML;
  	var element = document.createElement(basicElement || 'div');
  
  	Mustache.parse(template);
  	element.innerHTML = Mustache.render(template, data);
  
  	return element;
}

var prefix = 'https://cors-anywhere.herokuapp.com/';
var baseUrl = 'https://kodilla.com/pl/bootcamp-api';
var prefixedUrl = prefix + baseUrl;
var myHeaders = {
  	'X-Client-Id': '4053',
  	'X-Auth-Token': '3d75e7f47f3120d75ed7cb37b71cc90d'
};

fetch(prefixedUrl + '/board', { headers: myHeaders })
  	.then(function(resp) {
    	return resp.json();
  	})
  	.then(function(resp) {
    	setupColumns(resp.columns);
	});

function setupColumns(columns) {
  	columns.forEach(function(column) {
		var col = new Column(column.id, column.name);
      	board.addColumn(col);
      	setupCards(col, column.cards);
  });
}

function setupCards(col, cards) {
	cards.forEach(function (card) {
	    var cardObj = new Card(card.id, card.name);
	  	col.addCard(cardObj);
	});
}
