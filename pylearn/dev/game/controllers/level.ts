module Pylearn.Controller {
    export class LevelController {

        game:Pylearn.Game;
        isoGroup:Phaser.Group;
        levelName:String;
        pirate:Pylearn.Model.Character;

        constructor(game: Pylearn.Game, levelName:String) {
            this.game = game;
            this.isoGroup = this.game.add.group();
            this.levelName = levelName;
        }

        setPlayerSpawn(isoX:number, isoY:number, directionName:String):void {
            var direction = this.directionFromString(directionName);
            this.pirate = new Pylearn.Model.Character(isoX, isoY, direction)
        }

        addIsoSprite(isoX:number, isoY:number, spriteName:String):void {
            var screenX = isoX * 64;
            var screenY = isoY * 64;

            var tile = this.game.isoPlugin.addIsoSprite(screenX, screenY, 0, spriteName, 0, this.isoGroup);
            tile.anchor.set(0.5, 0);
        }

        directionFromString(dir:String):Pylearn.Model.Direction {
            switch(dir) {
                case "N": return Pylearn.Model.Direction.N;
                case "S": return Pylearn.Model.Direction.S;
                case "E": return Pylearn.Model.Direction.E;
                case "W": return Pylearn.Model.Direction.W;
            }

            return Pylearn.Model.Direction.N;
        }

        create() {
            var levelJson = this.game.cache.getText(this.levelName);
            var levelData = JSON.parse(levelJson);
            var level = new Pylearn.Model.Level();
            level.loadFromJson(levelData);

            for (var i=0; i < level.tiles.length; i++) {
                var tile = level.tiles[i];
                tile.build(this);
            }
        }

    }
}