import React, {PureComponent} from 'react'

class CommentForm extends PureComponent {
	state = {}

	handleSubmit = (e) => {
		e.preventDefault()
		this.props.onSubmit(this.state)
	}
 
	handleChange = (event) => {
		const {name, value} = event.target

		this.setState({
			[name]: value
		})
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<div>
					<label htmlFor="content">Content: </label>
					<input name="content" id="content" value={
						this.state.content || ''
					} onChange={ this.handleChange } />
				</div><br/>
                                 
				<div>
					<label htmlFor="author">Author: </label>
					<input name="author" id="author" value={
						this.state.author || ''
					} onChange={ this.handleChange } />
				</div><br/>

				<button type="submit">Save</button>
			</form>
		)
	}
}

export default CommentForm