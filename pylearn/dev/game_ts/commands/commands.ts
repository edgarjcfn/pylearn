module Pylearn.Command {

	export interface ICommand {
		next: Pylearn.Controller.ControllerDelegate;
		execute():void;
	}

	export class MoveCommand implements ICommand {
		next: Pylearn.Controller.ControllerDelegate;
		amount: number;
		animator: Pylearn.Controller.ICharacterController;

		constructor(amount: number, controller: Pylearn.Controller.ICharacterController) {
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

	export class TurnLeftCommand implements ICommand {
		next: Pylearn.Controller.ControllerDelegate;
		animator: Pylearn.Controller.ICharacterController;

		constructor(controller: Pylearn.Controller.ICharacterController) {
			this.animator = controller;
		}

		execute():void {
			
			switch (this.animator.character.direction) {
				case (Pylearn.Model.Direction.N) :
					this.animator.character.direction = Pylearn.Model.Direction.W;
					break;
				case (Pylearn.Model.Direction.S) :
					this.animator.character.direction = Pylearn.Model.Direction.E;
					break;
				case (Pylearn.Model.Direction.E) :
					this.animator.character.direction = Pylearn.Model.Direction.N;
					break;
				case (Pylearn.Model.Direction.W) :
					this.animator.character.direction = Pylearn.Model.Direction.S;
					break;
			}

			var newDirection = this.animator.character.direction;
			this.animator.rotateTo(newDirection, this.next);
		}
	}

	export class TurnRightCommand implements ICommand {
		next: Pylearn.Controller.ControllerDelegate;
		animator: Pylearn.Controller.ICharacterController;

		constructor(controller: Pylearn.Controller.ICharacterController) {
			this.animator = controller;
		}

		execute():void {
			
			switch (this.animator.character.direction) {
				case (Pylearn.Model.Direction.N) :
					this.animator.character.direction = Pylearn.Model.Direction.E;
					break;
				case (Pylearn.Model.Direction.S) :
					this.animator.character.direction = Pylearn.Model.Direction.W;
					break;
				case (Pylearn.Model.Direction.E) :
					this.animator.character.direction = Pylearn.Model.Direction.S;
					break;
				case (Pylearn.Model.Direction.W) :
					this.animator.character.direction = Pylearn.Model.Direction.N;
					break;
			}

			var newDirection = this.animator.character.direction;
			this.animator.rotateTo(newDirection, this.next);

		}
	}

	export class AttackCommand implements ICommand {
		next: Pylearn.Controller.ControllerDelegate;
		animator: Pylearn.Controller.ICharacterController;

		constructor(controller: Pylearn.Controller.ICharacterController) {
			this.animator = controller;
		}

		execute():void {
			
			this.animator.attack(this.next);

		}
	}
}