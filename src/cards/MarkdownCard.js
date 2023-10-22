class MarkdownCard {
	
	constructor(content) {
		this.content = content;
	}

	render(info) {
		return {
			"type": "markdown",
			"content": this.content
		};
	}
}

export {MarkdownCard};