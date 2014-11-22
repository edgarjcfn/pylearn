module Pylearn {
    declare var SkulptAnimator : Pylearn.Interfaces.ICharacterController;
    declare var SkulptLevel : Pylearn.Interfaces.ITileController;
    
    export class Gameplay extends Phaser.State {
        characterController : Pylearn.Controller.CharacterController;
        levelController : Pylearn.Controller.LevelController;
        messageController : Pylearn.Controller.MessagesController;
        currentLevel: string;

        create() {

            this.currentLevel = this.getLevelToPlay();
            var pylearnGame = <Pylearn.Game> this.game;

            this.levelController = new Pylearn.Controller.LevelController(pylearnGame, this.currentLevel);
            this.characterController = new Pylearn.Controller.CharacterController(pylearnGame);
            this.messageController = new Pylearn.Controller.MessagesController(this.levelController, pylearnGame.showMessage, pylearnGame.hideMessage);

            this.levelController.create();
            this.characterController.create(this.levelController.pirate);

            SkulptAnimator = this.characterController;
            SkulptLevel = this.levelController;

            this.levelController.onLevelWon = this.onLevelWon.bind(this);
            this.messageController.onGameOverMessageDismissed = this.onMessageDismissed.bind(this);
            this.messageController.showIntro();
        }

        getLevelToPlay() {
            var levelName = window.location.hash;
            levelName = levelName.substring(1);

            if (!levelName) {
                levelName = Pylearn.LevelNames()[0];
            }

            return levelName;
        }

        onLevelWon() {
            this.messageController.showCongratulations();
        }

        onMessageDismissed() {
            var allLevels = Pylearn.LevelNames();
            var currentIndex = allLevels.indexOf(this.currentLevel);
            var nextIndex = currentIndex+1;
            
            if (nextIndex < allLevels.length) {
                var nextLevelName = allLevels[nextIndex];
                window.location.href = window.location.href.replace(window.location.hash, '#' + nextLevelName);
                this.game.state.start('Gameplay', true, false);
            }
        }
    }
}