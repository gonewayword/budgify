import React from 'react';

class CatController extends React.Component {
	constructor(props) {
		super(props);
		// this.state = {
		// 	categories: [
		// 		{
		// 			'Food': []
		// 		},
		// 		'Drinks',
		// 
		// 	]
		// }
	}
	
	render() {
		var props = this.props.info;
		return (
			<div id="spendingArea" className={props.categoryToggled ? "spendingArea showtime" : "spendingArea"}>
				<ul className="categories">
					<li>Food</li>
					<li>Drinks</li>
					<li>Vape</li>
					<li>Transport</li>
					<li>Shopping</li>
					<li>Recreation</li>
					<li>Household</li>
				</ul>
				<div className="categorization">
					
				</div>
			</div>
		)
	}
}

export default CatController;