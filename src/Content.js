import React, { useState, useEffect } from 'react'
import Stack from './utils/Stack';

const browserHistory = new Stack();
export default function Contain() {
	const [listObjectsCards, setContent] = useState([]);
	const [query, setQuery] = useState('/');
	const [btnBack, changeBtn] = useState(null);
	const base_url = "//localhost:3010";


	const ShowButtonBack = () => {
		if (browserHistory.size > 1) {
			changeBtn(<div className="col-12 col-sm-6 col-md-4 col-lg-4 ">
				<div onClick={() => goBack()} className="card text-center bg-dark border-secondary mb-3" style={{ "cursor": "pointer" }}>
					<div className="card-body">
						<h2 className="card-title">Go back</h2>
					</div>
				</div>
			</div>);
		}
		else {
			changeBtn(null);
		}
	}

	useEffect(() => {
		const getDataFromAPI = (arg = "") => {
			const requestOptions = {};
			fetch(base_url + arg, requestOptions)
				.then(res => res.json())
				.then((data) => {
					if (data.prefix_url) { // if is still sub cats
						data.result.forEach(element => {
							element.url = "/" + data.prefix_url + "/" + element.name + "/"; // Adding new element to Object					
						});
						setContent(data.result);
						browserHistory.push(data.result); // the stack start with main categories

						ShowButtonBack();					
					}
					else { //if not have more subcats (Show info of product)
						setContent([])
					}
				})
				.catch(console.log)
		};		
		getDataFromAPI(query);
		// eslint-disable-next-line
	}, [query]);

	const goBack = () => {
		let backData = browserHistory.pop();
		if (backData) {
			setContent(backData.next.data);
			ShowButtonBack();		
		}
	}

	const listItems = listObjectsCards.map((cat) =>
		<div className="col-12 col-sm-6 col-md-4 col-lg-4 mb-3" key={cat.name} >
			<div onClick={() => setQuery(cat.url)} className="card text-center bg-dark border-secondary" style={{ "cursor": "pointer" }}>
				<div className="card-body">
					<h2 className="card-title">{cat.name}</h2>
				</div>
			</div>
		</div>
	);

	return (
		<div className="col-xl-10 pt-5 pb-5 row" style={{ "margin": "0" }}>
			{btnBack}
			{listItems}
		</div>
	)
}
/*
export class Contain extends Component {
	constructor(...args) {
		super(...args)
		this.state = {
			listObjectsCards: [],
		}
		this.browserHistory = new Stack();
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
					this.browserHistory.push(data.result); // the stack start with main categories
					this.setState({ listObjectsCards: data.result });
				}
				else { //if not have more subcats (Show info of product)
					console.log(data.result)
					this.setState({ listObjectsCards: [] });
				}
			})
			.catch(console.log)
	}

	ShowProducts(id) {
		this.getDataFromAPI(id)
	}

	goBack() {
		let backData = this.browserHistory.pop();
		if (backData) {
			this.setState({ listObjectsCards: backData.next.data });
		}
	}

	render() {
		const listItems = this.state.listObjectsCards.map((cat) =>
			<div className="col-12 col-sm-6 col-md-4 col-lg-4 mb-3" key={cat.name} >
				<div onClick={this.ShowProducts.bind(this, cat.url)} className="card text-center bg-dark border-secondary" style={{ "cursor": "pointer" }}>
					<div className="card-body">
						<h2 className="card-title">{cat.name}</h2>
					</div>
				</div>
			</div>
		);
		if (this.browserHistory.size > 1) { // if the stack have more items
			this.fistItem = <div className="col-12 col-sm-6 col-md-4 col-lg-4 ">
				<div onClick={this.goBack.bind(this)} className="card text-center bg-dark border-secondary mb-3" style={{ "cursor": "pointer" }}>
					<div className="card-body">
						<h2 className="card-title">Go back</h2>
					</div>
				</div>
			</div>
		}
		else { // if the stack only have the main categories 
			this.fistItem = "";
		}

		return (
			<div className="col-xl-10 pt-5 pb-5 row" style={{ "margin": "0" }}>
				{this.fistItem}
				{listItems}
			</div>
		)
	}
}*/