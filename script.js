jQuery(function($){
"use strict";
var Map = $("#map"), // Map Element
	MapHolder = $("#map-holder"), // Map Holder element
	map; // map object


//I know this is bad
NodeList.prototype.foreach = Array.prototype.forEach;
NodeList.prototype.map = Array.prototype.map;

// Setup

data.pieces.forEach(function(src, index){
	$("<img>").attr({
		"class": "piece draggable",
		"src": "pieces/" + src,
		"draggable": "true",
		"id": "piece" + index
	})
	.appendTo("#pieces-holder")
	.on("dragstart", function(e){
      e.originalEvent.dataTransfer.effectAllowed = 'copy'; // only dropEffect='copy' will be dropable
      e.originalEvent.dataTransfer.setData('text', this.id); // required otherwise doesn't work
	  this.classList.add("floating");
	})
});

data.maps.forEach(function(m){
	$("<option>").text(m.name)
	.attr("value", m.src)
	.appendTo("#map-picker");
});


// Events

$("#save-btn").click(save);
$("#load-btn").click(load);
 
$("#checkbox").click(function(){
	map.hidden = this.checked;
	if (this.checked) {
		Map.addClass("hidden");
	} else {
		Map.removeClass("hidden")
	}
});

 $("#reset-btn").click(function(){
 	$(".piece").appendTo("#pieces-holder");
 });

$("#map-picker").change(function(){
	var value = this.value;
	Map.css("background-image", "url(maps/" + value + ")");
	$(".tiles").remove();
	map = data.maps.filter(function(map){
		return value == map.src; 
	})[0];
	var frag = document.createDocumentFragment(),
		width = map.twidth + "px",
		height = map.theight + "px",
		t, tilesNumber = Math.round(map.height*map.width);
	while (tilesNumber-- >= 0) {
		t = new Tile(tilesNumber, width, height);
		frag.appendChild(t.el);
	}
	Map.height(map.height * map.theight)
		.width(map.width * map.twidth)
		.append(frag);
});

// Dragand Drop

Map.on("dragover", ".tile", function(e){
 	if (e.preventDefault) e.preventDefault(); // allows us to drop
    e.originalEvent.dataTransfer.dropEffect = 'copy';
	return false;	
}).on("dragenter",".tile", function(e){
	return false;
}).on("dragover", ".tile", function(){
	return false;
}).on("drop", ".tile", function(e){
	if (e.stopPropagation) e.stopPropagation(); // stops the browser from redirecting...why???

    var src = e.originalEvent.dataTransfer.getData("text");

    $(".piece").filter(function(){
    	return this.src==src;
    }).appendTo(this);

    return false;
}).on("dblclick", ".tile", function(e){
	if (map.hidden)
		$(this).toggleClass("visible");
});


$("#map-picker").val(data.maps[1].src).trigger("change");

function Tile (num, width, height) {
  this.el = document.createElement("div");
  this.el.setAttribute("id", num);
  this.el.className = "tile";
  this.el.textContent = "\n";
  this.el.style.width = width;
  this.el.style.height = height;

}

function save() {
	map.state = $(".piece").map(function(piece){
		return {location: this.parentNode.id, id: this.id};
	}).toArray();
	map.visible = document.querySelectorAll(".visible").map(function(tile){
		return tile.id;
	});
	localStorage.map = JSON.stringify(map);
}

function load() {
	map = JSON.parse(localStorage.map)
	map.state.forEach(function(o){
		document.getElementById(o.location).appendChild(document.getElementById(o.id));
	});
	map.visible.forEach(function(t){
		document.getElementById(t).className = "tile visible";
	});
	if (map.hidden) {
		$("#checkbox").click();
	}
}

});