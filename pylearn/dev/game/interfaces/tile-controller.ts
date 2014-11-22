module Pylearn.Interfaces {
	export interface ITileController {

		getHeight():number;
		getWidth():number;
		playerActionOnTile(action:String):void;
		
	}
}