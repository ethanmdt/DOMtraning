function chooseImage() {
	var list = document.getElementsByTagName("a");
	var preview = document.getElementById("preview");
	preview.style.left = "0px";
	preview.style.top = "0px";
	preview.style.position = "absolute";
	list.map(function(list, idx) {
	list.onmouseover = function() {
		alert(i);
		moveElement("preview", -100, 0, 20);
	}
});

}
window.onload = function(){
	chooseImage();
}