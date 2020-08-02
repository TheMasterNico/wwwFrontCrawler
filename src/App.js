import React from 'react'

export default class Contador extends React.Component {
	constructor(...args) {
		super(...args)
		this.state = {
			contador: 0
		}
	}



	incrementar() {
		this.setState({
			contador: this.state.contador + 1
		})
	}

	render() {
		return (
			<div>
				<span>Cuenta actual: {this.state.contador}</span>
				<button onClick={this.incrementar.bind(this)}>+</button>
			</div>
		)
	}
}