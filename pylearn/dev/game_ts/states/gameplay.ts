module Pylearn {
    export class Gameplay extends Phaser.State {
        character : Pylearn.Controller.CharacterController;
        level : Pylearn.Controller.LevelController;

        create() {

            var pirate = new Pylearn.Model.Character(0, 0, Pylearn.Model.Direction.N);
            this.level = new Pylearn.Controller.LevelController(<Pylearn.Game>this.game);
            this.character = new Pylearn.Controller.CharacterController(<Pylearn.Game> this.game, pirate);

            this.level.create();
            this.character.create();

        }
    }
}