function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function() {
      oldonload();
      func();
    }
  }
}


function insertAfter(newElement,targetElement) {
  var parent = targetElement.parentNode;
  if (parent.lastChild == targetElement) {
    parent.appendChild(newElement);
  } else {
    parent.insertBefore(newElement,targetElement.nextSibling);
  }
}

function addClass(element,value) {
  if (!element.className) {
    element.className = value;
  } else {
    newClassName = element.className;
    newClassName+= " ";
    newClassName+= value;
    element.className = newClassName;
  }
}

function highlightPage() {
	if (!document.getElementsByTagName) return false;
	if (!document.getElementById) return false;
	var headers = document.getElementsByTagName('header');
	if (headers.length == 0) return false;
	var navs = headers[0].getElementsByTagName('nav');
	if (navs.length == 0) return false;
	var links = navs[0].getElementsByTagName("a");
	var linkurl;
	for (var i = 0; i < links.length; i++) {
		linkurl = links[i].getAttribute("href");
		if (window.location.href.indexOf(linkurl) != -1) {
			links[i].className = "here";
			var linktext = links[i].lastChild.nodeValue.toLowerCase();
			document.body.setAttribute("id", linktext);
		}
	}
}


function moveElement(elementID,final_x,final_y,interval) {
  if (!document.getElementById) return false;
  if (!document.getElementById(elementID)) return false;
  var elem = document.getElementById(elementID);
  if (elem.movement) {
    clearTimeout(elem.movement);
  }
  if (!elem.style.left) {
    elem.style.left = "0px";
  }
  if (!elem.style.top) {
    elem.style.top = "0px";
  }
  var xpos = parseInt(elem.style.left);
  var ypos = parseInt(elem.style.top);
  if (xpos == final_x && ypos == final_y) {
    return true;
  }
  if (xpos < final_x) {
    var dist = Math.ceil((final_x - xpos)/10);
    xpos = xpos + dist;
  }
  if (xpos > final_x) {
    var dist = Math.ceil((xpos - final_x)/10);
    xpos = xpos - dist;
  }
  if (ypos < final_y) {
    var dist = Math.ceil((final_y - ypos)/10);
    ypos = ypos + dist;
  }
  if (ypos > final_y) {
    var dist = Math.ceil((ypos - final_y)/10);
    ypos = ypos - dist;
  }
  elem.style.left = xpos + "px";
  elem.style.top = ypos + "px";
  var repeat = "moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
  elem.movement = setTimeout(repeat,interval);
}

function preSlideshow() {
	if (!document.getElementsByTagName) return false;
	if (!document.getElementById) return false;
	if (!document.getElementById("intro")) return false;
	var  intro = document.getElementById("intro");
	var slideshow = document.createElement("div");
	slideshow.setAttribute("id", "slideshow");
	var frame = document.createElement("img");
	frame.setAttribute("src","images/frame.gif");
	frame.setAttribute("alt","");
	frame.setAttribute("id","frame");
	slideshow.appendChild(frame);
	var preview = document.createElement("img");
	preview.setAttribute("src", "images/slideshow.gif");
	preview.setAttribute("alt", "a glimpse of what awaits you");
	preview.setAttribute("id","preview");
	slideshow.appendChild(preview);
	insertAfter(slideshow,intro);
	var links = document.getElementsByTagName("a");
	var destination;
	for (var i = 0; i < links.length; i++) {
		links[i].onmouseover = function(){
			destination = this.getAttribute("href");
			if (destination.indexOf("index.html") != -1) {
				moveElement("preview",0,0,5);
			} 
			if (destination.indexOf("about.html") != -1) {
				moveElement("preview",-150,0,5);
			} 
			if (destination.indexOf("photos.html") != -1) {
				moveElement("preview",-300,0,5);
			}
			if (destination.indexOf("live.html") != -1) {
				moveElement("preview",-450,0,5);
			}
			if (destination.indexOf("contact.html") != -1) {
				moveElement("preview",-600,0,5);
			}
		}
	}
}
function showSection(id) {
  var sections = document.getElementsByTagName("section");
  for (var i = 0; i < sections.length; i++) {
    if (sections[i].getAttribute("id") != id) {
      sections[i].style.display = "none";
    } else {
      sections[i].style.display = "block";
    }
  }
}
function prepareInternalnav() {
  if (!document.getElementsByTagName) return false;
  if (!document.getElementById) return false;
  var articles = document.getElementsByTagName("article");
  if (articles.length == 0) return false;
  var navs = articles[0].getElementsByTagName("nav");
  if (navs.length == 0) return false;
  var nav = navs[0];
  var links = nav.getElementsByTagName("a");
  for (var i = 0; i < links.length; i++) {
    var sectionId = links[i].getAttribute("href").split("#")[1];
    if (!document.getElementById(sectionId)) continue;
    document.getElementById(sectionId).style.display = "none";
    links[i].destination = sectionId;
    links[i].onclick = function() {
      showSection(this.destination);
      return false;
    }
  }
}


function showPic(whichpic) {
  if (!document.getElementById("placeholder")) return true;
  var source = whichpic.getAttribute("href");
  var placeholder = document.getElementById("placeholder");
  placeholder.setAttribute("src",source);
  if (!document.getElementById("description")) return false;
  if (whichpic.getAttribute("title")) {
    var text = whichpic.getAttribute("title");
  } else {
    var text = "";
  }
  var description = document.getElementById("description");
  if (description.firstChild.nodeType == 3) {
    description.firstChild.nodeValue = text;
  }
  return false;
}

function preparePlaceholder() {
  if (!document.createElement) return false;
  if (!document.createTextNode) return false;
  if (!document.getElementById) return false;
  if (!document.getElementById("imagegallery")) return false;
  var placeholder = document.createElement("img");
  placeholder.setAttribute("id","placeholder");
  placeholder.setAttribute("src","images/placeholder.gif");
  placeholder.setAttribute("alt","my image gallery");
  var description = document.createElement("p");
  description.setAttribute("id","description");
  var desctext = document.createTextNode("Choose an image");
  description.appendChild(desctext);
  var gallery = document.getElementById("imagegallery");
  insertAfter(description,gallery);
  insertAfter(placeholder,description);
}

function prepareGallery() {
  if (!document.getElementsByTagName) return false;
  if (!document.getElementById) return false;
  if (!document.getElementById("imagegallery")) return false;
  var gallery = document.getElementById("imagegallery");
  var links = gallery.getElementsByTagName("a");
  for ( var i=0; i < links.length; i++) {
    links[i].onclick = function() {
      return showPic(this);
    }
  }
}

function focusLabels() {
  if (!document.getElementsByTagName) return false;
  var labels = document.getElementsByTagName("label");
  for (var i = 0; i < labels.length; i++) {
    if (!labels[i].getAttribute("for")) continue;
    labels[i].onclick = function() {
        var id = this.getAttribute("for");
        var element = document.getElementById(id);
        element.focus();
    }
  }
}

function resetFields(whichform) {
  if (!Modernizr.input.placeholder) return;
  for (var i = 0; i < whichform.elements.length; i++) {
    var element = whichform.elements[i];
    if (element.type == "submit") continue;
    var check = element.placeholder || element.getAttribute("placeholder");
    if (!check) continue;
    element.onfocus = function() {
      var text = this.placeholder || this.getAttribute("placeholder");
      if (this.value == text) {
        this.className = '';
        this.value = "";
      }
    }
    element.onblur = function() {
      if (this.value == "") {
        this.className = 'placeholder';
        this.value = this.placeholder || this.getAttribute("placeholder");
      }
    }
    element.onblur();
  }
}
function prepareForms() {
  for (var i = 0; i < document.forms.length; i++) {
    var thisform = document.forms[i];
    resetFields(thisform);
    thisform.onsubmit = function() {
      return validateForm(this);
    }
  }
}

function isFilled(field) {
  if (field.value.replace(' ','').length == 0) return false;
  var placeholder = field.placeholder || field.getAttribute("placeholder");
  return (field.value != placeholder);
}
function isEmail(field) {
  return (field.value.indexOf("@") != -1 && field.value.indexOf(".") != -1);
}
function validateForm(whichform) {
  for (var i = 0; i < whichform.elements.length; i++) {
    var element = whichform.elements[i];
    if (element.required == "required") {
      if (!isFilled(element)) {
        alert("please fill in the" + element.name + "field.");
        return false;
      }
      if (element.type == 'email')
        if (!isEmail(element)) {
          alert("the" + element.name + "field must be a valid email address.");
          return false;
        }
    }
    return true;
  }
} 
addLoadEvent(highlightPage);
addLoadEvent(preSlideshow);
addLoadEvent(prepareInternalnav);
addLoadEvent(prepareGallery);
addLoadEvent(preparePlaceholder);
addLoadEvent(focusLabels);
addLoadEvent(prepareForms);