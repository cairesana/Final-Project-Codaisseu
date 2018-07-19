import React, {PureComponent} from 'react'

class EventForm extends PureComponent {
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
					<label htmlFor="name">Event name: </label>
					<input name="name" id="name" value={
						this.state.name || ''
					} onChange={ this.handleChange } />
				</div><br/>
                                 
                <div>
                    <label htmlFor="pictureUrl">Picture (url): </label>
                    <input name="pictureUrl" id="pictureUrl" value={
                        this.state.pictureUrl || ''
                    } onChange={ this.handleChange } />
                </div><br/>

                <div>
					<label htmlFor="description">Description: </label>
					<input name="description" id="description" value={
						this.state.description || ''
					} onChange={ this.handleChange } />
				</div><br/>

				<div>
					<label htmlFor="startDate"> Start date: </label>
					<input name="startDate" id="startDate" value={
						this.state.startDate || ''
					} onChange={ this.handleChange } />
				</div><br/>

                <div>
					<label htmlFor="endDate"> End date: </label>
					<input name="endDate" id="endDate" value={
						this.state.endDate || ''
					} onChange={ this.handleChange } />
				</div><br/>

				

				<button type="submit">Save</button>
			</form>
		)
	}
}

export default EventForm

    

