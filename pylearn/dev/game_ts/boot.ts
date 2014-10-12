module Pylearn {

    export class Boot extends Phaser.State {

        preload() { 
            this.load.image('preloadBar', 'pylearn/dev/game/assets/loader.png');
        }
 
        create() { 

            this.game.time.advancedTiming = true;

            // Add and enable the plug-in.
            this.game.plugins.add(new Phaser.Plugin.Isometric(this.game));
            this.game.iso.anchor.set(0.5, 0.2);

            this.game.state.start('Preloader', true, false);
        }
    }
}