/// <reference path="../../../bower_components/phaser/build/phaser.d.ts" />

module Pylearn {
    export class Game extends Phaser.Game {
        constructor() {
            super(700, 600, Phaser.AUTO, 'gameCanvas', null);

            this.state.add('Boot', Boot, false);
            this.state.add('Preloader', Preloader, false);
            this.state.add('Level1', Level1, false);

            this.state.start('Boot');
        }
        
    }
}   