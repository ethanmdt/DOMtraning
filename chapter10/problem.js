function moveMessage(elementID, finalx, finaly) {
	var text = document.getElementById(elementID);
	var xpot = parseInt(text.style.left);	
	var ypot = parseInt(text.style.top);
	if (xpot == finalx && ypot == finaly)
		return true;
	if (xpot > finalx)
		xpot--; else xpot++;
	if (ypot > finaly)
		ypot--; else ypot++;
	text.style.left = xpot + "px";
	text.style.top = ypot +"px";
	var movment = setTimeout('moveMessage("message",300,300)',10);
}

window.onload = function() {
	moveMessage("message",300,300);
}