module Pylearn.Controller {
    export class LevelController implements Pylearn.Interfaces.IMessageProvider, Pylearn.Interfaces.ITileController{

        game:Pylearn.Game;
        isoGroup:Phaser.Group;
        levelName:String;
        pirate:Pylearn.Model.Character;
        level:Pylearn.Model.Level;
        treasureChests:number = 0;

        constructor(game: Pylearn.Game, levelName:String) {
            this.game = game;
            this.isoGroup = this.game.add.group();
            this.levelName = levelName;
        }

        setPlayerSpawn(isoX:number, isoY:number, directionName:String):void {
            var direction = this.directionFromString(directionName);
            this.pirate = new Pylearn.Model.Character(isoX, isoY, direction)
        }

        addIsoSprite(isoX:number, isoY:number, spriteName:String, anchorX:number = 0.5, anchorY:number = 0):void {
            var screenX = isoX * 64;
            var screenY = isoY * 64;

            var tile = this.game.isoPlugin.addIsoSprite(screenX, screenY, 0, spriteName, 0, this.isoGroup);
            tile.anchor.set(anchorX, anchorY);
        }

        capturedChest():void {
            console.debug("Captured chest");
            this.treasureChests--;
            this.checkGameOver();
        }

        checkGameOver():void {
            //TODO: Check Game Over
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
            this.level = new Pylearn.Model.Level();
            this.level.loadFromJson(levelData);

            for (var i=0; i < this.level.tiles.length; i++) {
                var tile = this.level.tiles[i];
                tile.build(this);
            }
        }

        // 
        // IMessageProvider implementation
        //
        introIndex:number = 0;
        successIndex:number = 0;
        nextMessageIntro():Pylearn.Model.Message {
            var message = null;
            if (this.level.introMessages.length > this.introIndex) {
                message = this.level.introMessages[this.introIndex];
                this.introIndex++;
            }
            return message;
        }

        nextMessageSuccess():Pylearn.Model.Message {
            var message = null;
            if (this.level.winMessages.length > this.successIndex) {
                message = this.level.winMessages[this.successIndex];
                this.successIndex++;
            }
            return message;
        }

        // 
        // ITileController implementation
        //
        playerActionOnTile(action:String):void {
            var tilePosition = this.pirate.position;
            var tile = this.level.getTileAt(tilePosition.x, tilePosition.y);
            tile.onPlayerAction(action, this);
        }
    }
}