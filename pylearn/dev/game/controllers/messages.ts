module Pylearn.Controller {
	export class MessagesController {

		showMessage:Pylearn.ShowMessageDelegate;
		hideMessage:Pylearn.HideMessageDelegate;
		provider:Pylearn.Interfaces.IMessageProvider;

		constructor(provider:Pylearn.Interfaces.IMessageProvider, showMessage:Pylearn.ShowMessageDelegate, hideMessage:Pylearn.HideMessageDelegate) {
			this.provider = provider;
			this.showMessage = showMessage;
			this.hideMessage = hideMessage
		}

		showIntro():void {
			var message = this.provider.nextMessageIntro();
			if (message)
			{
				this.showMessage(message.title, message.content, message.icon, this.showIntro.bind(this));
			}
			else
			{
				this.hideMessage();
			}
		}
	}
}