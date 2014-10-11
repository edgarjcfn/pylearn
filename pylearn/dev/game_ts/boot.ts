module Pylearn {

    export class Boot extends Phaser.State {

        preload() { 
            this.load.image('preloadBar', 'pylearn/dev/game/assets/loader.png');
        }
 
        create() { 

            this.game.time.advancedTiming = true;

            // Add and enable the plug-in.
            var isoPlugin = new Phaser.Plugin.Isometric(this.game, this.game.plugins);
            isoPlugin.anchor = new Phaser.Point(0.5, 0.2);
            this.game.plugins.add(isoPlugin);
            this.game.state.start('Preloader', true, false);
        }
    }
}