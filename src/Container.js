
import React, { Component } from 'react';
import Navbar from './Navbar';
import Aside from './Aside';
import Contain from './Content'

export default class Container extends Component {
	render() {
		return (
			<div className="container-fluid">
				<Navbar siteName="Comparing Prices" />
				<div className="row pt-5">
					<Aside />
					<Contain />
				</div>
			</div>
		);
	}
}