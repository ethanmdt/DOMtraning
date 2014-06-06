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

function displayCite() {
	if (!document.createElement) return false;
	if (!document.getElementsByTagName) return false;
	if (!document.createTextNode) return false;
	var block = document.getElementsByTagName("blockquote");
	if (block.length < 1) return false;
	var array = new Array();
	for (var i = 0; i < block.length; i++) {
		if (!block[i].getAttribute("cite")) continue;
		var url = block[i].getAttribute("cite");
		var blockChildren = block[i].getElementsByTagName("*");
		if (blockChildren.length < 1) continue;
		var elem = blockChildren[blockChildren.length - 1];
		var link = document.createElement("a");
		var link_text = document.createTextNode("source");
		link.appendChild(link_text);
		link.setAttribute("href",url);
		var superscript = document.createElement("sup");
		superscript.appendChild(link);
		elem.appendChild(superscript);
	}	
}

function displayNavigation() {
	if (!document.createElement) return false;
	if (!document.getElementsByTagName) return false;
	if (!document.createTextNode) return false;
	var navigation = document.getElementsByTagName("a");
	var list = document.createElement("ul");
	var body = document.getElementsByTagName("body")[0];
	body.appendChild(list);
	for (var i = 0; i < navigation.length; i++) {
		var current_a = navigation[i];
		if (!current_a.getAttribute("accesskey")) continue;
		var href = current_a.getAttribute("href");
		var accesskey = current_a.getAttribute("accesskey");
		var li = document.createElement("li");
		var li_text = document.createTextNode(href + "'accesskey: " + accesskey);
		li.appendChild(li_text);
		list.appendChild(li);
	}
}
window.onload = function() {
	display();
	displayCite();
	displayNavigation();
}