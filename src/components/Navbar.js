import React from 'react';
import NavItems from './NavItems';
import BtnBack from './btnBack';

export default class Navbar extends React.Component {
		
	render() {
		const { siteName, clickGoBack, elements } = this.props
		return(
			<nav className="row navbar navbar-expand-xl navbar-dark bg-dark">
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>

				<BtnBack clickGoBack={clickGoBack} customClass="d-xl-none" />

				<a className="text-xl-center text-right navbar-brand" href="./">
					<img src="./favicon.ico" width="30" height="30" className="align-top" alt="" loading="lazy" />
					{siteName}
  				</a>	

				<BtnBack clickGoBack={clickGoBack} customClass="ml-5 d-none d-xl-block" />

				<div className="col-xl-10 collapse d-xl-none text-center" id="navbarSupportedContent">
					<NavItems elements={elements} customClass="navbar-nav" />
				</div>
				<form className="col form-inline text-right d-none d-xl-block">
					<input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
					<button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
				</form>
			</nav>			
		)
	}
}