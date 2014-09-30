var CommandChain = function() {
	this.commands = [];
	this.currentIndex = 0;

	var append = function(command) {

		if (this.commands.length > 0)
		{
			var lastCmd = this.commands[this.commands.length-1];
			lastCmd.next = proceed;
		}

		this.commands.push(fn);
	}

	var proceed = function() {
		this.currentIndex++;
		execute();
	}

	var execute = function() {
		if (currentIndex < commands.length)
		{
			this.commands[currentIndex].execute();
		}
		else
		{
			console.log('command chain finished')
		}
	}


}