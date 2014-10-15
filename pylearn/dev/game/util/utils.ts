module Pylearn {
	export class Util {
		static getDirectionAngle(direction:Pylearn.Model.Direction) : number {
			switch (direction) {
				case Pylearn.Model.Direction.N :
		            return 0;
		        case Pylearn.Model.Direction.E : 
		            return Math.PI/2;
		        case Pylearn.Model.Direction.S :
		            return Math.PI;
		        case Pylearn.Model.Direction.W : 
		            return 3*(Math.PI/2);
			}
		}

		static getWorldPosition(tile:Pylearn.Model.TileCoordinate) : Phaser.Point {
			return new Phaser.Point(tile.x * 64, tile.y * 64);
		}
	}
}