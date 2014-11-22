module Pylearn.Interfaces {
	export interface IMessageProvider {
		nextMessageIntro():Pylearn.Model.Message;
		nextMessageSuccess():Pylearn.Model.Message;
	}
}