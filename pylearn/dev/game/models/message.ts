module Pylearn.Model {

	export class Message {
		title: String
		content: String
		icon: String

		constructor(title:String, content:String, icon:String) {
			this.title = title;
			this.content = content;
			this.icon = icon;
		}
	}
}