import React, { Component } from 'react';

export default class NavItems extends Component {
	render() {
		const { elements } = this.props
		const listItems = elements.map((cat) =>
			<li className = "nav-item py-2" key={cat._id}>{cat.name}</li>
		);
		return (
			<ul className="nav flex-column">
				{listItems}				
			</ul>
		)
	}
}