module Pylearn {
    export class Game extends Phaser.Game {
        iso : Phaser.Plugin.Isometric;
        
        constructor() {
            super(700, 600, Phaser.AUTO, 'gameCanvas', null);

            this.state.add('Boot', Boot, false);
            this.state.add('Preloader', Preloader, false);
            this.state.add('Level1', Level1, false);

            this.state.start('Boot');
        }
        
    }
}   

window.onload = () =>  {
    var game = new Pylearn.Game();
}