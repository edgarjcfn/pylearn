import LevelController = Pylearn.Controller.LevelController;

module Pylearn.Model {
    export enum TileTypeId {
        Simple,
        Chest,
        SpawnPlayer
    }

    export interface ITileComponent {
        id():TileTypeId;
        build(builder:LevelController):void;
        setTile(tile:Tile):void;
        onPlayerAction(action:String, builder:LevelController):void;
    }

    // 
    // Empty Tile
    // 
    export class EmptyTileComponent implements ITileComponent {

        tile:Tile;

        id():TileTypeId {
            return TileTypeId.Simple;
        }

        build(builder:LevelController):void {
            builder.addIsoSprite(this.tile.position.x, this.tile.position.y, 'tile');
        }

        setTile(tile:Tile):void {
            this.tile = tile;
        }

        onPlayerAction(action:String, levelController:LevelController):void {
            // do nothing
        }

    }

    // 
    // Treasure Chest
    // 
    export class ChestTileComponent extends EmptyTileComponent {

        build(builder:LevelController):void {
            builder.addIsoSprite(this.tile.position.x, this.tile.position.y, 'blue-tile');
            builder.addIsoSprite(this.tile.position.x, this.tile.position.y, 'chest');
            builder.treasureChests++;
        }

        onPlayerAction(action:String, levelController:LevelController):void {
            if (action == "attack") {
                levelController.capturedChest();
            }
        }
    }

    //
    // Spawn Player
    // 
    export class SpawnPlayerComponent extends EmptyTileComponent {
        direction:String;

        constructor(direction:String) {
            super();
            this.direction = direction;
        }

        build(builder:LevelController):void {
            super.build(builder);
            builder.setPlayerSpawn(this.tile.position.x, this.tile.position.y, this.direction);
        }
    }

}