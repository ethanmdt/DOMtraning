/*window.onload = function() {
	var para = document.createElement("p");
	var info = "nodeName";
	info += para.nodeName;
	info += " nodeType ";
	info += para.nodeType;
	alert(info);
}

window.onload = function() {
	var para = document.createElement("p");
	var testdiv = document.getElementById("testdiv");
	testdiv.appendChild(para);
	var txt = document.createTextNode("Hello world");
	para.appendChild(txt);
}*/


function preparePlaceholder() {
	if (!document.createElement) return false;
	if (!document.createTextNode) return false;
	if (!document.getElementById) return false;
	if (!document.getElementById("gallery")) return false;
	var placeholder = document.createElement("img");
	placeholder.setAttribute("id","placeholder");
	placeholder.setAttribute("src","#");
	placeholder.setAttribute("alt","empty");
	var description = document.createElement("p");
	description.setAttribute("id","description");
	var text = document.createTextNode("This is image");
	description.appendChild(text);
	var body = document.getElementsByTagName("body")[0];
	body.appendChild(placeholder);
	body.appendChild(description);
	var gallery = document.getElementById("gallery");
	insertAfter(placeholder,gallery);
	insertAfter(description,placeholder);
}

function insertAfter(newElement, targetElement) {
	var parent = targetElement.parentNode;
	if (parent.lastChild == targetElement) {
		parent.appendChild(newElement);
	} else {
		parent.insertBefore(newElement, targetElement.nextSibling);
	}
}

function showPic(whichPic) {
	if (!document.getElementById("placeholder")) return false;
	var source = whichPic.getAttribute("href");
	var placeholder = document.getElementById("placeholder");
	if (placeholder.nodeName != "IMG") {
		return false;
	}
	placeholder.setAttribute("src",source);
	if (document.getElementById("description")) {
		var text = whichPic.getAttribute("title") ? whichPic.getAttribute("title") : "";
		var description = document.getElementById("description");
		if (description.firstChild.nodeType == 3) {
			description.firstChild.nodeValue = text;
		}
	}
	return true;
}


function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof window.onload !== 'function') {
		window.onload = func;
	} else {
		window.onload = function() {
			oldonload();
			func();
		}
	}
}

function prepareGallery() {
	if (!document.getElementsByTagName) {
		return false;
	}
	if (!document.getElementById) {
		return false;
	}
	if (!document.getElementById("gallery")) {
		return false;
	}
	var gallery = document.getElementById("gallery");
	var links = gallery.getElementsByTagName("a");
	for (var i = 0; i < links.length; i++) {
		links[i].onclick = function() {
			return !showPic(this);
		}
	}
}
addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);