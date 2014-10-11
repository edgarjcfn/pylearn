module Pylearn {
 
    export class Preloader extends Phaser.State {
 
        preloadBar: Phaser.Sprite;
 
        preload() {
 
            //  Set-up our preloader sprite
            this.preloadBar = this.add.sprite(200, 250, 'preloadBar');
            this.load.setPreloadSprite(this.preloadBar);
 
            //  Load our actual games assets
            this.load.image('tile', 'pylearn/dev/game/assets/tile.png');
            this.load.atlasJSONHash('pirate', 'pylearn/dev/game/assets/pirate.png', 'pylearn/dev/game/assets/pirate.json');

        }
 
        create() {
 
            var tween = this.add.tween(this.preloadBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startGame, this);
 
        }
 
        startGame() { 

            this.game.state.start('Level1', true, false);
         
         }
 
    }
 
}