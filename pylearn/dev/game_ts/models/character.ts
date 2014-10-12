module Pylearn.Model {
	export enum Direction {N, S, E, W}
	export class TileCoordinate {
		x: number;
		y: number;

		constructor(x:number, y:number) {
			this.x = x;
			this.y = y;
		}
	}
    export class Character {

    	position: TileCoordinate;
    	direction: Direction;

    	constructor(x: number, y: number, direction:Direction) {
    		this.position = new TileCoordinate(x, y);
    		this.direction = direction;
    	}
    }
}