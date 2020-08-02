import React, { Component } from 'react';
import NavItems from './NavItems';

export class Aside extends Component {
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

export class Contain extends Component {
	constructor(...args) {
		super(...args)
		this.state = {
			listObjectsCards: [],			
		}
		this.base_url = "//localhost:3010";
	}
	componentDidMount() {
		this.getDataFromAPI();
	}

	getDataFromAPI(arg = "") {
		const requestOptions = {};
		fetch(this.base_url + arg, requestOptions)
			.then(res => res.json())
			.then((data) => {
				if (data.prefix_url) { // if is still sub cats
					data.result.forEach(element => {
						element.url = "/" + data.prefix_url + "/" + element.name + "/"; // Adding new element to Object					
					});
					this.setState({ listObjectsCards: data.result })
				}
				else { //if not have more subcats (Show info of product)
					console.log(data.result)
				}
			})
			.catch(console.log)
	}
	
	ShowProducts(id) {
		console.log("url clicked: " + id)
		this.getDataFromAPI(id)
	}
	render() {
		const listItems = this.state.listObjectsCards.map((cat) =>
			<div className="col-12 col-sm-6 col-md-4 col-lg-4" key={cat.name} >
				<div onClick={this.ShowProducts.bind(this, cat.url)} className="card text-center bg-dark border-secondary mb-3" style={{ "cursor": "pointer" }}>
					<div className="card-body">
						<h2  className="card-title">{cat.name}</h2>
					</div>
				</div>
			</div>
		);
		return (
			<div className="col-xl-10 container-fluid pt-5 pb-5 row" style={{ "margin": "0" }}>
				{listItems}
			</div>
		)
	}
}