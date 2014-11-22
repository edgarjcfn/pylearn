module Pylearn.Controller {
    export class LevelController {

        game:Pylearn.Game;
        isoGroup:Phaser.Group;

        constructor(game: Pylearn.Game) {
            this.game = game;
            this.isoGroup = this.game.add.group();
        }

        setPlayerSpawn(isoX:number, isoY:number, direction:String):void {
            // TODO: Do something here
        }

        addIsoSprite(isoX:number, isoY:number, spriteName:String):void {
            var screenX = isoX * 64;
            var screenY = isoY * 64;

            var tile = this.game.isoPlugin.addIsoSprite(screenX, screenY, 0, spriteName, 0, this.isoGroup);
            tile.anchor.set(0.5, 0);
        }

        create() {
            // TODO: Do something here
        }

    }
}