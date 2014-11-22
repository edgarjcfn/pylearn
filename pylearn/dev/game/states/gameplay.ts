module Pylearn {
    declare var SkulptAnimator : Pylearn.Controller.ICharacterController;
    export class Gameplay extends Phaser.State {
        character : Pylearn.Controller.CharacterController;
        level : Pylearn.Controller.LevelController;

        create() {

            var levelToPlay = 'level01';

            this.level = new Pylearn.Controller.LevelController(<Pylearn.Game>this.game, levelToPlay);
            this.character = new Pylearn.Controller.CharacterController(<Pylearn.Game> this.game);

            this.level.create();
            this.character.create(this.level.pirate);

            SkulptAnimator = this.character;

        }
    }
}