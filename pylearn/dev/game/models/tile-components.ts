import LevelBuilder = Pylearn.Controller.LevelController;

module Pylearn.Model {
	export enum TileTypeId {
		Simple,
		Chest,
        SpawnPlayer
	}

    export interface ITileComponent {
    	id():TileTypeId;
        build(builder:LevelBuilder):void;
        setTile(tile:Tile):void;
        onPlayerAction(action:String):void;
    }

    // 
    // Empty Tile
    // 
    export class EmptyTileComponent implements ITileComponent {

    	tile:Tile;

    	id():TileTypeId {
    		return TileTypeId.Simple;
    	}

        build(builder:LevelBuilder):void {
        	builder.addIsoSprite(this.tile.position.x, this.tile.position.y, 'tile');
        }

        setTile(tile:Tile):void {
        	this.tile = tile;
        }

        onPlayerAction(action:String):void {
        	// do nothing
        }

    }

    // 
    // Treasure Chest
    // 
    export class ChestTileComponent extends EmptyTileComponent {

    	build(builder:LevelBuilder):void {
        	builder.addIsoSprite(this.tile.position.x, this.tile.position.y, 'blue-tile');
        	builder.addIsoSprite(this.tile.position.x, this.tile.position.y, 'chest');
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

    	build(builder:LevelBuilder):void {
    		super.build(builder);
    		builder.setPlayerSpawn(this.tile.position.x, this.tile.position.y, this.direction);
    	}
    }

}