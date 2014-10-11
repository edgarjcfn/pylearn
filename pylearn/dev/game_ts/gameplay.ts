module Pylearn {
    export class Gameplay extends Phaser.State {
    	character:Pylearn.Character;
    	level:Pylearn.Level;

    	create() {
    		this.character = new Pylearn.Character(this.game, 0, 0);
    		this.character.create();
    		
    		this.level = new Pylearn.Level(this.game);
    		this.level.create();
    	}
    }
}