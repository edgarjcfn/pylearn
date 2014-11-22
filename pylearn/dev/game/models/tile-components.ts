module Pylearn.Model {
	export enum TileTypeId {
		Simple,
		Chest,
        SpawnPlayer
	}

    export interface ITileComponent {
    	id():TileTypeId;
        sprite():String;
        setTile(tile:Tile):void;
        onPlayerAction(action:String):void;
    }

    // 
    // Empty Tile
    // 
    export class EmptyTileComponent implements ITileComponent {

    	_tile:Tile;

    	id():TileTypeId {
    		return TileTypeId.Simple;
    	}

        sprite():String {
        	return null;
        }

        setTile(tile:Tile):void {
        	this._tile = tile;
        }

        onPlayerAction(action:String):void {
        	// do nothing
        }

    }

    // 
    // Treasure Chest
    // 
    export class ChestTileComponent extends EmptyTileComponent {

    }

    //
    // Spawn Player
    // 
    export class SpawnPlayerComponent extends EmptyTileComponent {
    	_direction:String;

    	constructor(direction:String) {
    		super();
    		this._direction = direction;

    	}
    }

}