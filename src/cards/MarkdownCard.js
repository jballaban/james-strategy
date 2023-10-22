class MarkdownCard {
	
	constructor(content) {
		this.content = content;
	}

	render() {
		return {
			"type": "markdown",
			"content": this.content
		};
	}
}

export {MarkdownCard};