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

		constructor(amount: number, controller: CharacterAnimator) {
			this.amount = amount;
			this.animator = controller;
		}

		execute():void {

			switch (this.animator.character.direction) {
				case (Pylearn.Model.Direction.N) :
					this.animator.character.moveBy(0, -(this.amount));
					break;
				case (Pylearn.Model.Direction.S) :
					this.animator.character.moveBy(0, (this.amount));
					break;
				case (Pylearn.Model.Direction.E) :
					this.animator.character.moveBy((this.amount), 0);
					break;
				case (Pylearn.Model.Direction.W) :
					this.animator.character.moveBy(-(this.amount), 0);
					break;
			}

			var newPosition = this.animator.character.position;
			this.animator.moveTo(newPosition, this.next);

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