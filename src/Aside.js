import React, { Component } from 'react';
import NavItems from './NavItems';
//import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';


export default class Aside extends Component {
	render() {
		return (
			<aside className="col-xl-2 bg-dark sidebar d-none d-xl-block">
					<div className="sidebar-sticky text-center pt-2">
						<NavItems customClass="nav flex-column" />
					</div>
			</aside>
		)
	}
}