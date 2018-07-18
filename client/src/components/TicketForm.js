import React, {PureComponent} from 'react'

class TicketForm extends PureComponent {
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
					<label htmlFor="ticketPictureUrl">Ticket Picture(Url): </label>
					<input name="ticketPictureUrl" id="ticketPictureUrl" value={
						this.state.ticketPictureUrl || ''
					} onChange={ this.handleChange } />
				</div><br/>
                                 
               <div>
					<label htmlFor="description">Description: </label>
					<input name="description" id="description" value={
						this.state.description || ''
					} onChange={ this.handleChange } />
				</div><br/>

				<div>
					<label htmlFor="price">Price: </label>
					<input name="price" id="price" value={
						this.state.price || ''
					} onChange={ this.handleChange } />
				</div><br/>

			    <button type="submit">Save</button>
			</form>
		)
	}
}

export default TicketForm