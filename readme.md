This is a little hack to make a d&d gameboard for use on a tablet among my friends.

Feel free to do what you want with the code. It's in the public domain.

## How To

Put Tilemaps in maps and pieces in pieces. I use Tiled to make maps.

The config file is data.js.

Add filenames of pieces to the pieces list and map data to the list of maps. It's in JSON.


e.g.
		{
			name: "Field",
			src: "map.png",
			twidth: 32,
			theight: 32,
			height: 100,
			width: 100
		},

Where
* name is the name of the map.
* src is the filename of the map
* twidth is the pixel width of the tiles
* theight is the pixel height of the tiles
* and width and height are the number of tiles in each dimension of the grid
