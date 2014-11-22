module Pylearn {
    declare var SkulptAnimator : Pylearn.Interfaces.ICharacterController;
    declare var SkulptLevel : Pylearn.Interfaces.ITileController;
    
    export class Gameplay extends Phaser.State {
        characterController : Pylearn.Controller.CharacterController;
        levelController : Pylearn.Controller.LevelController;
        messageController : Pylearn.Controller.MessagesController;

        create() {

            var levelToPlay = 'level01';
            var pylearnGame = <Pylearn.Game> this.game;

            this.levelController = new Pylearn.Controller.LevelController(pylearnGame, levelToPlay);
            this.characterController = new Pylearn.Controller.CharacterController(pylearnGame);
            this.messageController = new Pylearn.Controller.MessagesController(this.levelController, pylearnGame.showMessage, pylearnGame.hideMessage);

            this.levelController.create();
            this.characterController.create(this.levelController.pirate);

            SkulptAnimator = this.characterController;
            SkulptLevel = this.levelController;

            this.levelController.onLevelWon = this.messageController.showCongratulations.bind(this.messageController);
            this.messageController.showIntro();
        }
    }
}