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

var TurnLeftCommand = function(argv, character, animator) {
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

var TurnRightCommand = function(argv, character, animator) {
	this.next = null;

	this.exectute = function() {
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

