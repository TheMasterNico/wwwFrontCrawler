import React, { Component } from 'react';

export default class Aside extends Component {
	render() {
		return (
			<ul className={this.props.customClass}>
				<li className="nav-item" id="one">One</li>
				<li className="nav-item" id="2">2</li>
				<li className="nav-item" id="3">3</li>
			</ul>
		)
	}
}