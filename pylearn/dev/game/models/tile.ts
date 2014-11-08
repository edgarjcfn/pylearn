module Pylearn.Model {

	export enum TileTypeId {
		Simple,
		Chest
	}

    export interface ITileComponent {
    	setTile(tile:Tile):void;
    	id():TileTypeId;
    }

    export class Tile {
        public position: TileCoordinate;
        private _components: Array<ITileComponent>;

        constructor() {
        	this._components = [];
        }

        addComponent(comp:ITileComponent):void {
        	this._components.push(comp);
        	comp.setTile(this);
        }

        getComponent(id:TileTypeId):ITileComponent {
        	for (var i=0; i < this._components.length; i++)
        	{
        		if (this._components[i].id() == id)
        		{
        			return this._components[i];
        		}
        	}

        	return null;
        }

        removeComponent(id:TileTypeId):void {
        	for (var i=0; i < this._components.length; i++)
        	{
        		if (this._components[i].id() == id)
        		{
        			this._components.splice(i, 1);
        			break;
        		}
        	}
        }

    }
}