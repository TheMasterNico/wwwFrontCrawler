import React from 'react'
import Stack from '../utils/Stack';
import Navbar from './Navbar';

export default class Content extends React.Component {
	constructor(...args) {
		super(...args)
		this.state = {
			listObjectsCards: [],
			infoProduct: null
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
						element.url = "/" + data.prefix_url + "/" + element.name + "/"; // change the url to call api
					});
					this.browserHistory.push(data.result); // the stack start with main categories
					this.setState({ listObjectsCards: data.result });
				}
				else { //if not have more subcats (Show info of product)
					console.log(data.result)
					this.setState({ listObjectsCards: [] });
					const listPrices = data.result.prices.map((item) =>
						<div className="pl-2 pt-3 pb-3" key={item.date}>
							<strong className="pl-2">Fecha: </strong>{item.date}<br />
							<strong className="pl-2">Descuento: </strong>{item.discount}<br />
							<strong className="pl-2">Precio normal: </strong>{item.old_price}<br />
							<strong className="pl-2">Precio oferta: </strong>{item.new_price}<br />
						</div>
					);
					this.setState({
						infoProduct: (
							<div className="container-fluid">
								<div className="row">
									<div className="col-md-8">
										<h2>{data.result.name}</h2>
										{listPrices}
									</div>
									<div className="col-md-4">
										<img alt="Bootstrap" src="https://www.layoutit.com/img/sports-q-c-140-140-3.jpg" />
									</div>
								</div>
							</div>
						)
					});
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
			this.setState({ infoProduct: null })
		}
	}
	simplifiedFunction(value) {
		console.log(value)
	}
	render() {
		const listItems = this.state.listObjectsCards.map((cat) =>
			<div className="col-12 col-sm-6 col-md-4 col-lg-4 mb-3 " key={cat._id} >
				<div onClick={this.ShowProducts.bind(this, cat.url)} className="card text-center bg-dark border-secondary h-100" style={{ "cursor": "pointer" }}>
					<div className="card-body">
						<h2 className="card-title">{cat.name}</h2>
					</div>
				</div>
			</div>
		);
		if (this.browserHistory.size > 1) { // if the stack have more items
			this.fistItem = <div className="col-12 col-sm-6 col-md-4 col-lg-3 ">
				<div onClick={this.goBack.bind(this)} className="cardtext-center bg-dark border-secondary mb-3 h-100" style={{ "cursor": "pointer" }}>
					<div className="card-body">
						<h2 className="card-title">Go back</h2>
					</div>
				</div>
			</div>
		}
		else { // if the stack only have the main categories 
			this.fistItem = null;
		}

		return (
			<div className="w-100">
				{/* <Aside elements={this.state.listObjectsCards} /> */}
				<Navbar elements={this.state.listObjectsCards} siteName="Comparing Prices" clickGoBack={this.goBack.bind(this)} />
				<div className="col-auto py-5 row" style={{ "margin": "0"}}>
					{listItems}
					{this.state.infoProduct}
				</div>
			</div>

		)
	}
}