'use strict';

var CommandChain = function() {
	this.commands = [];
	this.currentIndex = 0;
};

CommandChain.prototype.append = function(command) {

	var _this = this;
	command.next = function() {
		_this.proceed();
	};

	this.commands.push(command);
};

CommandChain.prototype.proceed = function() {
	console.debug('this', this);
	this.currentIndex++;
	this.execute();
};

CommandChain.prototype.execute = function() {
	if (this.currentIndex < this.commands.length)
	{
		this.commands[this.currentIndex].execute();
	}
	else
	{
		console.log('command chain finished')
	}
};

CommandChain.prototype.clear = function () {
	this.commands = [];
};