module Pylearn {
    export class Game extends Phaser.Game {
        constructor() {
            super(700, 600, Phaser.AUTO, 'gameCanvas', null);

            this.state.add('Boot', Boot, false);
            this.state.add('Preloader', Preloader, false);
            this.state.add('Gameplay', Gameplay, false);

            this.state.start('Boot');
        }
        
    }
}   

window.onload = () =>  {
    var game = new Pylearn.Game();
}