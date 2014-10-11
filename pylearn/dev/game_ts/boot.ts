module Pylearn {
	
	export class Boot extends Phaser.State {

		preload() { 
            this.load.image('preloadBar', 'pylearn/dev/game/assets/loader.png');
 		}
 
        create() { 

        	this.game.time.advancedTiming = true;

		    // Add and enable the plug-in.
		    this.game.plugins.add(new Phaser.Plugin.Isometric(game));

		    // This is used to set a game canvas-based offset for the 0, 0, 0 isometric coordinate - by default
		    // this point would be at screen coordinates 0, 0 (top left) which is usually undesirable.
		    this.game.iso.anchor.setTo(0.5, 0.2);

			this.game.state.start('Preloader', true, false);
		}
	}
}