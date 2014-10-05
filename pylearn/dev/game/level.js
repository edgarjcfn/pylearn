"use strict";

var LevelLoader = function()
{
	// this.isoGroup = null;
}

LevelLoader.prototype.preload = function() {
	game.load.image('tile', 'pylearn/dev/game/assets/tile.png');
}

LevelLoader.prototype.create = function() {
	this.isoGroup = game.add.group();
	this.spawnTiles();

}

LevelLoader.prototype.update = function() {

}

LevelLoader.prototype.spawnTiles = function() {
    var tile;
    for (var xx = 0; xx < 256; xx += 64) {
        for (var yy = 0; yy < 256; yy += 64) {
            // Create a tile using the new game.add.isoSprite factory method at the specified position.
            // The last parameter is the group you want to add it to (just like game.add.sprite)
            tile = game.add.isoSprite(xx, yy, 0, 'tile', 0, isoGroup);
            tile.anchor.set(0.5, 0);
        }
    }
}

