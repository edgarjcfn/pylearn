module Pylearn.Controller {
	export class MessagesController {

		showMessage:Pylearn.ShowMessageDelegate;
		provider:Pylearn.Interfaces.IMessageProvider;

		constructor(provider:Pylearn.Interfaces.IMessageProvider, delegate:Pylearn.ShowMessageDelegate) {
			this.provider = provider;
			this.showMessage = delegate;
		}

		showIntro():void {
			var message = this.provider.nextMessageIntro();
			if (message)
			{
				this.showMessage(message.title, message.content, message.icon, this.showIntro.bind(this));
			}
		}
	}
}