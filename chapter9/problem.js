window.onload = function() {
	var para = document.getElementById("example");
	styleHeaderSibling();
	stripeTables();
	display();
}

function getNextElement(node) {
	if (node.nodeType == 1) {
		return node;
	} 
	if (node.nextSibling) {
		return getNextElement(node.nextSibling);
	}
	return null;
}

function styleHeaderSibling() {
	if (!document.getElementsByTagName) return false;
	var header = document.getElementsByTagName("h1");
	var elem;
	for (var i = 0; i < header.length; i++) {
		elem = getNextElement(header[i].nextSibling);
		elem.style.fontWeight = "bold";
		elem.style.fontSize = "1.2em";
	}
}

function stripeTables(){
	var table = document.getElementsByTagName("table");
	for (var i = 0; i < table.length; i++) {
		var tr = table[i].getElementsByTagName("tr");
		for (var j = 0; j < tr.length; j++) {
			tr[j].onmouseover = function() {
				this.style.fontWeight = "bold";
			}
			tr[j].onmouseout = function() {
				this.style.fontWeight = "normal";
			}
			if (j % 2 !== 0) {
				tr[j].style.backgroundColor = "#ffc";
			}
		}
	}
}

function display() {
	if (!document.createElement) return false;
	if (!document.getElementsByTagName) return false;
	if (!document.createTextNode) return false;
	var abbr = document.getElementsByTagName("abbr");
	if (abbr.length < 1) return false;
	var array = new Array();
	for (var i = 0; i < abbr.length; i++) {
		if (abbr[i].childNodes.length < 1) continue;
		var defintion = abbr[i].getAttribute("title");
		var key = abbr[i].lastChild.nodeValue;
		array[key] = defintion;
	}
	var dlist = document.createElement("dl");
	for (var prop in array) {
		var current_title = document.createElement("dt");
		var title_text = document.createTextNode(array[prop]);
		var current_key = document.createElement("dd");
		var key_text = document.createTextNode(prop);
		current_title.appendChild(title_text);
		current_key.appendChild(key_text);
		dlist.appendChild(current_title);
		dlist.appendChild(current_key);
	}
	if (dlist.childNodes.length < 1) return false;
	var header = document.createElement("h2");
	var head_text = document.createTextNode("abbreviations");
	header.appendChild(head_text);
	var body = document.getElementsByTagName("body")[0];
	body.appendChild(header);
	body.appendChild(dlist);
}
