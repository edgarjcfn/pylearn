/// <reference path="../../../bower_components/phaser/build/phaser.d.ts" />
/// <reference path="../../../bower_components/phaser-plugin-isometric/dist/phaser.plugin.isometric.d.ts" />

module Pylearn {
    export class Game extends Phaser.Game {
        isoPlugin: Phaser.Plugin.Isometric;

        constructor() {
            super(700, 600, Phaser.AUTO, 'gameCanvas', null);

            this.state.add('Boot', Boot, false);
            this.state.add('Preloader', Preloader, false);
            this.state.add('Gameplay', Gameplay, false);
        }

        boot() {
            super.boot();
            this.isoPlugin = <Phaser.Plugin.Isometric> this.plugins.add(new Phaser.Plugin.Isometric(this));
            this.isoPlugin.projector.anchor.setTo(0.5, 0.2);
            this.state.start('Boot');   
        }
        
    }
}   

window.onload = () =>  {
    var game = new Pylearn.Game(); 
}