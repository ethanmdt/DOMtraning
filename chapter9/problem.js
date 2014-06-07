window.onload = function() {
	var para = document.getElementById("example");

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
		elem.style = 
	}
}