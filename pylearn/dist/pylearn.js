//
// Character Animator
// 
var CharacterAnimator = function(scene, character) {
	this._character = character
	this._game = scene;
}

CharacterAnimator.prototype.moveTo = function (tile, next) {
	var actualPos = getWorldPos(tile);
	var moveTween = this._game.add.tween(this._character).to(actualPos, 1000);
	moveTween.onComplete.add(next);
	moveTween.start();
    this._character.animations.play('walkE');
}

CharacterAnimator.prototype.rotateTo = function(direction, next) {
	var angle = getDirectionAngle(direction);
	var rotateTween = this._game.add.tween(this._character).to({rotation:angle}, 1000);
	rotateTween.onComplete.add(next);
	rotateTween.start();
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

function getWorldPos(tilePos) {
    return {
        'x' : 350 + (tilePos.x * 30), 
        'y' : 300 + (tilePos.y * 30)
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

	var _this = this;
	command.next = function() {
		_this.proceed();
	};

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


var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameCanvas', { preload: preload, create: create, update: update });

var characterAnimator;
var isoGroup;
var mainChar;

function preload() {
    game.load.image('tile', 'pylearn/dev/game/assets/tile.png');
    game.load.atlasJSONHash('knight', 'pylearn/dev/game/assets/knight.png', 'pylearn/dev/game/assets/knight.json');

    game.time.advancedTiming = true;

    // Add and enable the plug-in.
    game.plugins.add(new Phaser.Plugin.Isometric(game));

    // This is used to set a game canvas-based offset for the 0, 0, 0 isometric coordinate - by default
    // this point would be at screen coordinates 0, 0 (top left) which is usually undesirable.
    game.iso.anchor.setTo(0.5, 0.2);
}

function create() {
    // Create a group for our tiles.
    isoGroup = game.add.group();
    mainChar = game.add.sprite(128,128,'knight');

    mainChar.animations.add('walkE', Phaser.Animation.generateFrameNames('ne000', 0, 11), 30, true);
    mainChar.animations.add('walkN', Phaser.Animation.generateFrameNames('nw000', 0, 11), 30, true);
    mainChar.animations.add('walkS', Phaser.Animation.generateFrameNames('se000', 0, 11), 30, true);
    mainChar.animations.add('walkW', Phaser.Animation.generateFrameNames('sw000', 0, 11), 30, true);

    // Let's make a load of tiles on a grid.
    spawnTiles();

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
            tile = game.add.isoSprite(xx, yy, 0, 'tile', 0, isoGroup);
            tile.anchor.set(0.5, 0);
        }
    }
}