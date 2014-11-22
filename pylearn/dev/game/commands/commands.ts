import CharacterAnimator = Pylearn.Interfaces.ICharacterController;

module Pylearn.Command {

	export interface ICommand {
		next: Pylearn.Controller.ControllerDelegate;
		execute():void;
	}

	//
	// Move 
	//
	export class MoveCommand implements ICommand {
		next: Pylearn.Controller.ControllerDelegate;
		amount: number;
		animator: CharacterAnimator;
		tileController: Pylearn.Interfaces.ITileController

		constructor(amount: number, controller: CharacterAnimator, tileController:Pylearn.Interfaces.ITileController) {
			this.amount = amount;
			this.animator = controller;
			this.tileController = tileController;
		}

		execute():void {

			var position = this.animator.character.position;
			var direction = this.animator.character.direction;
			var boundsX = this.tileController.getWidth()-1;
			var boundsY = this.tileController.getHeight()-1;

			switch (direction) {
				case (Pylearn.Model.Direction.N) :
					position.y -= this.amount;
					break;
				case (Pylearn.Model.Direction.S) :
					position.y += this.amount;
					break;
				case (Pylearn.Model.Direction.E) :
					position.x += this.amount;
					break;
				case (Pylearn.Model.Direction.W) :
					position.x -= this.amount;
					break;
			}

			position.x = Math.max(0, position.x);
			position.x = Math.min(boundsX, position.x);
			position.y = Math.max(0, position.y);
			position.y = Math.min(boundsY, position.y);

			this.animator.character.moveTo(position);
			this.animator.moveTo(position, this.next);
		}
	}

	//
	// Turn Left
	//
	export class TurnLeftCommand implements ICommand {
		next: Pylearn.Controller.ControllerDelegate;
		animator: CharacterAnimator;

		constructor(controller: CharacterAnimator) {
			this.animator = controller;
		}

		execute():void {
			var newDirection = this.animator.character.direction-1;
			if (newDirection < 0)
			{
				newDirection = 3;
			}
			this.animator.character.direction = newDirection;
			this.animator.rotateTo(newDirection, this.next);
		}
	}

	// 
	// Turn Right
	// 
	export class TurnRightCommand implements ICommand {
		next: Pylearn.Controller.ControllerDelegate;
		animator: CharacterAnimator;

		constructor(controller: CharacterAnimator) {
			this.animator = controller;
		}

		execute():void {
			var newDirection = (this.animator.character.direction+1) % 4;
			this.animator.character.direction = newDirection;
			this.animator.rotateTo(newDirection, this.next);

		}
	}

	//
	// Pick up treasure
	//
	export class PickUpCommand implements ICommand {
		next: Pylearn.Controller.ControllerDelegate;
		animator: CharacterAnimator;
		tileController: Pylearn.Interfaces.ITileController;

		constructor(animator: CharacterAnimator, tileController:Pylearn.Interfaces.ITileController) {
			this.animator = animator;
			this.tileController = tileController;
		}

		execute():void {
			this.tileController.playerActionOnTile("pickUp");
			this.animator.pickUp(this.next);
		}
	}

	//
	// Attack!
	//
	export class AttackCommand implements ICommand {
		next: Pylearn.Controller.ControllerDelegate;
		animator: CharacterAnimator;
		tileController: Pylearn.Interfaces.ITileController;

		constructor(animator: CharacterAnimator, tileController:Pylearn.Interfaces.ITileController) {
			this.animator = animator;
			this.tileController = tileController;
		}

		execute():void {
			this.tileController.playerActionOnTile("attack");
			this.animator.attack(this.next);
		}
	}
}