//
// Character Animator
// 
var CharacterAnimator = function(scene, character) {
	this._ship = character
	this._game = scene;
}

CharacterAnimator.prototype.moveTo = function (tile, next) {
	var actualPos = getWorldPos(tile);
	var moveTween = this._game.add.tween(this._ship).to(actualPos, 500);
	moveTween.onComplete.add(next);
	moveTween.start();
}

CharacterAnimator.prototype.rotateTo = function(direction, next) {
	var angle = getDirectionAngle(direction);
	var rotateTween = this._game.add.tween(this._ship).to({rotation:angle}, 500);
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

var CommandChain = function() {
	this.commands = [];
	this.currentIndex = 0;
};

CommandChain.prototype.append = function(command) {

	var _this = this;
	command.next = function() {
		_this.proceed();
	};

	this.commands.push(command);
};

CommandChain.prototype.proceed = function() {
	this.currentIndex++;
	this.execute();
};

CommandChain.prototype.execute = function() {
	if (this.currentIndex < this.commands.length)
	{
		console.log('Going to execute command ' + this.currentIndex);
		this.commands[this.currentIndex].execute();
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
var ship;

function preload() {
	game.load.image('ship', 'pylearn/dev/game/assets/ship.png');
}
 
function create() {
	ship = game.add.sprite(350, 300, 'ship');
	ship.anchor.setTo(0.5, 0.5);
	characterAnimator = new CharacterAnimator(game, ship);
}
 
function update() {
	characterAnimator.update();
}