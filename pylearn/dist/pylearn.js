//
// Character Animator
// 
var CharacterAnimator = function(scene, character) {
	this._sprite = character
	this._game = scene;
    this._direction = Direction.N;
}

CharacterAnimator.prototype.moveTo = function (tile, next) {
	var actualPos = getIsoPos(tile);
	var moveTween = this._game.add.tween(this._sprite).to(actualPos, 1000);
	moveTween.onComplete.add(next);
	moveTween.start();
    var animation = 'walk'+ this._direction;
    this._sprite.animations.play(animation);
}

CharacterAnimator.prototype.rotateTo = function(direction, next) {
	this._direction = direction;
    next();
}

CharacterAnimator.prototype.attack = function(next) {
    var animName = 'attack'+this._direction;
    var animation = this._sprite.animations.play(animName);
    console.debug(animation);
    animation.onComplete.add(next);
}

CharacterAnimator.prototype.update = function(sprite) {

}

// 
// Helper functions
//
function getDirectionAngle(dir) {
    switch (dir) 
    {
        case Direction.N :
            return 0;
        case Direction.E : 
            return Math.PI/2;
        case Direction.S :
            return Math.PI;
        case Direction.W : 
            return 3*(Math.PI/2);
    }

    return 0;
}

function getIsoPos(tilePos) {
    return {
        'isoX' : tilePos.x * 64, 
        'isoY' : tilePos.y * 64
    };
}
'use strict'; 

var Direction = {
	N: 'N',
	S: 'S',
	E: 'E',
	W: 'W',
}

var Character = function() {
    this.x = 0;
    this.y = 0;
    this.direction = Direction.N;
};

Character.prototype.moveTo = function (x, y) {
	this.x = x;
	this.y = y;
};

Character.prototype.moveBy = function (x, y) {
	this.x += x;
	this.y += y;
};

Character.prototype.get_position = function() {
    var pos = {'x':this.x, 'y':this.y};
    return pos;
};

Character.prototype.get_direction = function() {
	return this.direction;
}

Character.prototype.set_direction = function(dir) {
	this.direction = dir;
};

'use strict';

var CommandChain = function(executeHandler) {
	this.commands = [];
	this.currentIndex = 0;
	this.executeHandler = executeHandler;
};

CommandChain.prototype.append = function(command, lineNumber) {

	// var _this = this;
	// command.next = function() {
		// _this.proceed();
	// };
	command.next = this.proceed.bind(this); 

	this.commands.push({lineNumber:lineNumber, command:command});
};

CommandChain.prototype.proceed = function() {
	this.currentIndex++;
	this.execute();
};

CommandChain.prototype.execute = function() {
	if (this.currentIndex < this.commands.length)
	{
		var toExecute = this.commands[this.currentIndex];
		// Notify line number
		this.executeHandler(toExecute.lineNumber);
		// Execute command
		toExecute.command.execute();
	}
	else
	{
		console.log('command chain finished')
	}
};

CommandChain.prototype.clear = function () {
	this.commands = [];
};
'use strict';

var MoveCommand = function(argv, character, animator) {
	this.next = null;
	this.tiles = argv.tiles || 1;

	this.execute = function() {

		switch (character.get_direction()) {
			case (Direction.N) :
			character.moveBy(0, -(this.tiles));
			break;
			case (Direction.S) :
			character.moveBy(0, (this.tiles));
			break;
			case (Direction.E) :
			character.moveBy((this.tiles), 0);
			break;
			case (Direction.W) :
			character.moveBy(-(this.tiles), 0);
			break;
		}

		var newPosition = character.get_position();
		animator.moveTo(newPosition, this.next);
	}
}

var TurnLeftCommand = function(character, animator) {
	this.next = null;

	this.execute = function() {
		switch (character.get_direction()) {
			case (Direction.N) :
				character.set_direction(Direction.W);
				break;
			case (Direction.S) :
				character.set_direction(Direction.E);
				break;
			case (Direction.E) :
				character.set_direction(Direction.N);
				break;
			case (Direction.W) :
				character.set_direction(Direction.S);
				break;
		}

		var newDirection = character.get_direction();
		animator.rotateTo(newDirection, this.next);
	}
}

var TurnRightCommand = function(character, animator) {
	this.next = null;

	this.execute = function() {
		switch (character.get_direction()) {
			case (Direction.N) :
				character.set_direction(Direction.E);
				break;
			case (Direction.S) :
				character.set_direction(Direction.W);
				break;
			case (Direction.E) :
				character.set_direction(Direction.S);
				break;
			case (Direction.W) :
				character.set_direction(Direction.N);
				break;
		}

		var newDirection = character.get_direction();
		animator.rotateTo(newDirection, this.next);
	}
}

var AttackCommand = function(character, animator) {
	this.next = null;

	this.execute = function() {
		animator.attack(this.next);
	}
}


var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameCanvas', { preload: preload, create: create, update: update });

var characterAnimator;
var isoGroup;
var mainChar;
var isoPlugin;

function preload() {
    game.load.image('tile', 'pylearn/dev/game/assets/tile.png');
    game.load.atlasJSONHash('pirate', 'pylearn/dev/game/assets/pirate.png', 'pylearn/dev/game/assets/pirate.json');

    game.time.advancedTiming = true;

    // Add and enable the plug-in.
    isoPlugin = game.plugins.add(new Phaser.Plugin.Isometric(game));
    // console.debug(isoPlugin);
    // This is used to set a game canvas-based offset for the 0, 0, 0 isometric coordinate - by default
    // this point would be at screen coordinates 0, 0 (top left) which is usually undesirable.
    isoPlugin.projector.anchor.setTo(0.5, 0.2);

    console.log(isoPlugin);
    // this.game.iso.anchor.setTo(0.5, 0.2);
}

function create() {
    // Create a group for our tiles.
    isoGroup = game.add.group();
    mainChar = isoPlugin.addIsoSprite(0,0,0,'pirate',0);
    mainChar.anchor.set(0.5, 0.5);

    mainChar.animations.add('walkN', Phaser.Animation.generateFrameNames('', 52, 60), 24, true);
    mainChar.animations.add('walkW', Phaser.Animation.generateFrameNames('', 61, 69), 24, true);
    mainChar.animations.add('walkE', Phaser.Animation.generateFrameNames('', 70, 78), 24, true);
    mainChar.animations.add('walkS', Phaser.Animation.generateFrameNames('', 79, 87), 24, true);

    mainChar.animations.add('attackN', Phaser.Animation.generateFrameNames('', 0, 12), 24,  false);
    mainChar.animations.add('attackW', Phaser.Animation.generateFrameNames('', 13, 25), 24, false);
    mainChar.animations.add('attackE', Phaser.Animation.generateFrameNames('', 26, 38), 24, false);
    mainChar.animations.add('attackS', Phaser.Animation.generateFrameNames('', 39, 51), 24, false);

    mainChar.animations.add('idleN', [12], 24,  false);
    mainChar.animations.add('idleW', [25], 24, false);
    mainChar.animations.add('idleE', [38], 24, false);
    mainChar.animations.add('idleS', [51], 24, false);


    // Let's make a load of tiles on a grid.
    spawnTiles();

    mainChar.animations.play('idleN');
    characterAnimator = new CharacterAnimator(game, mainChar);
}

function update() {
    characterAnimator.update();
}

function spawnTiles() {
    var tile;
    for (var xx = 0; xx < 256; xx += 64) {
        for (var yy = 0; yy < 256; yy += 64) {
            // Create a tile using the new game.add.isoSprite factory method at the specified position.
            // The last parameter is the group you want to add it to (just like game.add.sprite)
            tile = isoPlugin.addIsoSprite(xx, yy, 0, 'tile', 0, isoGroup);
            tile.anchor.set(0.5, 0);
        }
    }
}
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

