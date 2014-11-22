module Pylearn.Model {

    export class TileCoordinate {
        x: number;
        y: number;

        constructor(x:number, y:number) {
            this.x = x;
            this.y = y;
        }
    }

	export class Tile {
        public position: TileCoordinate;
        private _components: Array<ITileComponent>;

        constructor() {
        	this._components = [];
        }

        loadFromJson(x:number, y:number, jsonData:String):void {
            this.position = new TileCoordinate(x, y);

            switch (jsonData)
            {
                case "O":
                    this.addComponent(new EmptyTileComponent());
                case "X":
                    this.addComponent(new ChestTileComponent());
                case "N":
                case "S":
                case "E":
                case "W":
                    this.addComponent(new SpawnPlayerComponent(jsonData));
            }
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