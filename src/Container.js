
import React, { Component } from 'react';
import Content from './components/Content'

export default class Container extends Component {
	render() {
		return (
			<div className="container-fluid">
				<div className="row pt-5">
					<Content />
				</div>
			</div>
		);
	}
}