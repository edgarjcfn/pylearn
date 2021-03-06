module Pylearn.Controller {

	export interface MessageDismissedDelegate {
		():void;
	}

	export class MessagesController {

		showMessage:Pylearn.ShowMessageDelegate;
		hideMessage:Pylearn.HideMessageDelegate;
		provider:Pylearn.Interfaces.IMessageProvider;
		onGameOverMessageDismissed:MessageDismissedDelegate

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

		showCongratulations():void {
			var message = this.provider.nextMessageSuccess();
			if (message)
			{
				this.showMessage(message.title, message.content, message.icon, this.showCongratulations.bind(this));
			}
			else
			{
				this.hideMessage();
				this.onGameOverMessageDismissed();
			}
		}
	}
}