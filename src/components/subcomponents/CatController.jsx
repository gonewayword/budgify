import React from 'react';

class CatController extends React.Component {
	constructor(props) {
		super(props);
		this.closePopup = this.closePopup.bind(this);
		this.state = {
			categorySelected: 'Food',
			categories: JSON.parse(localStorage.getItem('budgifyCategories')) || 
			[
				{
					'Food': {
						'subcats': [],
						'totalSpent': 0,
						'expenses' : []
					}
				},
				{
					'Drinks': {
						'subcats': [],
						'totalSpent': 0,
						'expenses' : []
					}
				},
				{
					'Vape': {
						'subcats': [],
						'totalSpent': 0,
						'expenses' : []
					}
				},
				{
					'Transport': {
						'subcats': [],
						'totalSpent': 0,
						'expenses' : []
					}
				},
				{
					'Shopping': {
						'subcats': [],
						'totalSpent': 0,
						'expenses' : []
					}
				},
				{
					'Recreation': {
						'subcats': [],
						'totalSpent': 0,
						'expenses' : []
					}
				},
				{
					'Household': {
						'subcats': [],
						'totalSpent': 0,
						'expenses' : []
					}
				},
			]
		}
	}
	
	showCategory(catName){
		this.setState({
			categorySelected: catName
		})
	}
	
	openAddPopup(catName) {
		this.setState({
			activePopup: catName
		}, function() {
			console.log(this.state);
		})
	}
	
	closePopup() {
		this.setState({
			activePopup: null
		})
	}
	
	pleaseStopPropagation(e) {
		e.preventDefault();
		e.stopPropagation();
	}
	
	addToCategory(expense, index, catName) {
		console.log(expense);
		console.log(index);
		console.log(catName);
		var categories = JSON.parse(localStorage.getItem('budgifyCategories')) || this.state.categories;
		categories.forEach((cat, i) => {
			for(let kitname in cat) {
				if(kitname === catName) {
					cat[kitname].expenses.push(expense);
					cat[kitname].totalSpent += Number(expense.cost);
				}
			}	
		})
		var expenses = JSON.parse(localStorage.getItem('budgifyExpenses'));
		var thisExpense = expenses[index];
		thisExpense.category = catName;
		expenses[index] = thisExpense;
		localStorage.setItem('budgifyExpenses', JSON.stringify(expenses));
		//SET IT IN STATE TOO
		localStorage.setItem('budgifyCategories', JSON.stringify(categories));
		this.setState({
			categories: categories
		})
	}
	
	render() {
		var props = this.props.info;
		var parentHandlers = this.props.props;
		var info = props.info;
		var expenses = JSON.parse(info.expenses);
		return (
			<div id="spendingArea" className={parentHandlers.categoryToggled ? "spendingArea showtime" : "spendingArea"}>
				<ul className="categories">
					{this.state.categories.map((cat,i) => {
						for(let catName in cat) {
							return <li onClick={(param) => this.showCategory(catName)} className={catName} key={i}>{catName}</li>;
						}
					})}
				</ul>
				<div className="categorization">
					{this.state.categories.map((category, i) => {
						for(let catName in category) {
							return(
								<div key={i} className={this.state.categorySelected === catName ? 'cat-info active '+catName : 'cat-info '+catName}>
									<button onClick={(param) => this.openAddPopup(catName)}>Add Expenses to {catName}</button> 
									<div 
										className={this.state.activePopup === catName ? 'category-popup active' : 'category-popup'}
										onClick={this.closePopup}
										>
										<div className="pop-content" onClick={this.pleaseStopPropagation}>
											<div className="addcat-title">Add Expenses to {catName}</div>
											<div className="row expense-holder colcatNames">
												<div className="column quarter describe">
													Description
												</div>
												<div className="column quarter spend">
													Cost
												</div>
												<div className="column quarter cat">
													Category
												</div>
												<div className="column quarter date">
													Date
												</div>
											</div>
												{expenses.map((expense, i) => {
													let formattedDate = '';
													if(expense.date) {
														let datetime = new Date(expense.date);
														let day = datetime.getDate();
														let month = datetime.getMonth() + 1;
														let year = datetime.getFullYear();
														formattedDate = month + ' / ' + day + ' / ' + year;
													} else {
														formattedDate = '';
													}
													return (
														<div className="row expense-holder " key={i}>
															<div className="column quarter describe">
																{expense.description}
															</div>
															<div className="column quarter spend">
																$ {expense.cost}
															</div>
															<div className="column quarter cat">
																{ expense.category || 'None'}
															</div>
															<div className="column quarter date">
																{formattedDate}
															</div>
															<button className="delete" onClick={(param) => this.addToCategory(expense, i, catName)}>
																+
															</button>
														</div>
													)
												})}
											</div>
										</div>
									<div>
										Spent on {catName} this week: 
									</div>
									<div>
										Spent on {catName} last week: <br />
									</div>
									<div>
										Spent on {catName} for all time:
									</div>
								</div>
							)	
						}
					})}
				</div>
			</div>
		)
	}
}

export default CatController;