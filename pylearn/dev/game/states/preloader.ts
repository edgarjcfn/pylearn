module Pylearn {
 
    export class Preloader extends Phaser.State {
 
        preloadBar: Phaser.Sprite;
        levelNames: Array<String>;
 
        preload() {

            this.levelNames = [
                'level01'
            ];
 
            //  Set-up our preloader sprite
            this.preloadBar = this.add.sprite(200, 250, 'preloadBar');
            this.load.setPreloadSprite(this.preloadBar);
 
            //  Load our actual games assets
            this.load.image('tile', 'pylearn/dev/game/assets/tile.png');
            this.load.image('blue-tile', 'pylearn/dev/game/assets/blue-tile.png');
            this.load.image('chest', 'pylearn/dev/game/assets/chest.png');
            this.load.atlasJSONHash('pirate', 'pylearn/dev/game/assets/pirate.png', 'pylearn/dev/game/assets/pirate.json');

            for (var i=0; i < this.levelNames.length; i++) {
                this.load.text(this.levelNames[i], 'pylearn/dev/game/assets/levels/' + this.levelNames[i] + '.json');
            }
        }
 
        create() {
            var tween = this.add.tween(this.preloadBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startGame, this);
 
        }
 
        startGame() { 

            this.game.state.start('Gameplay', true, false);
         
         }
 
    }
 
}