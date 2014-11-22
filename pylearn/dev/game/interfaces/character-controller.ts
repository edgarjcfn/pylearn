module Pylearn.Interfaces {
	export interface ICharacterController {
        character: Pylearn.Model.Character;

        moveTo(tile: Pylearn.Model.TileCoordinate, next: Pylearn.Controller.ControllerDelegate) : void;
        rotateTo(direction: Pylearn.Model.Direction, next: Pylearn.Controller.ControllerDelegate) : void;
        attack(next: Pylearn.Controller.ControllerDelegate) : void;
        pickUp(next: Pylearn.Controller.ControllerDelegate) : void;
    }
}