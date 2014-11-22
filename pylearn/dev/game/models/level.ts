module Pylearn.Model {

	export class Level {
       tiles: Tile[]
       introMessages: Message[];
       winMessages: Message[];

       constructor() {
       		this.tiles = [];
       		this.introMessages = [];
       		this.winMessages = [];
       }

       loadFromJson(json:any):void {
       		for (var y=0; y < json.tiles.length; y++) {
       			var rows = json.tiles[y];
       			for (var x=0; x < rows.length; x++) {
       				var tile = new Tile();
       				var jsonData = rows[x];
       				tile.loadFromJson(x, y, jsonData);
       				this.tiles.push(tile);
				}       				
       		}

       		for (var i=0; i < json.introMessages.length; i++) {
       			var jsonData = json.introMessages[i];
       			var message = new Message(jsonData.title, jsonData.content, null);
       			this.introMessages.push(message);
       		}

       		for (var i=0; i < json.winMessages.length; i++) {
       			var jsonData = json.winMessages[i];
       			var message = new Message(jsonData.title, jsonData.content, 'success');
       			this.winMessages.push(message);
       		}
       }

    }
}