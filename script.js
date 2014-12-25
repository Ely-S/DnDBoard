jQuery(function($){
"use strict";
var Map = $("#map"), // Map Element
	MapHolder = $("#map-holder"), // Map Holder element
	map; // map object


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

$("#reload-btn").click(function(){

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


});