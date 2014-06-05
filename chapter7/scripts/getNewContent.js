function getNewContent() {
	var request = getHTTPObject();
	if (request) {
		request.open("GET", "example.txt", true);
		request.onreadystatechange = function() {
			if (request.readyState == 4) {
				alert("response recived")
				var para = document.createElement("p");
				var txt = document.createTextNode(request.responseText);
				para.appendChild(txt);
				document.getElementById('new').appendChild(para);
			}
		}
	}
	request.send(null);
	alert("function done");
}
function dosomething() {
	if (request.readyState == 4) {
		var para = document.createElement("p");
		var txt = document.createTextNode(request.responseText);
		para.appendChild(txt);
		document.getElementById('new').appendChild(para);
	}
}
addLoadEvent(getNewContent);