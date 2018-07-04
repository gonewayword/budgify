import React from 'react';
import ShownExpenses from './nanocomponents/ShownExpenses.jsx';

class CatController extends React.Component {
	constructor(props) {
		super(props);
		this.closePopup = this.closePopup.bind(this);
		this.clearAllCats = this.clearAllCats.bind(this);
		this.state = {
			shownExpenses: JSON.parse(localStorage.getItem('budgifyExpenses')),
			categorySelected: 'Food',
			categories: JSON.parse(localStorage.getItem('budgifyCategories')) || 
			{
					'Food': {
						'subcats': [],
						'totalSpent': 0,
						'expenses' : []
					},
					'Drinks': {
						'subcats': [],
						'totalSpent': 0,
						'expenses' : []
					},
					'Vape': {
						'subcats': [],
						'totalSpent': 0,
						'expenses' : []
					},
					'Transport': {
						'subcats': [],
						'totalSpent': 0,
						'expenses' : []
					},
					'Shopping': {
						'subcats': [],
						'totalSpent': 0,
						'expenses' : []
					},
					'Recreation': {
						'subcats': [],
						'totalSpent': 0,
						'expenses' : []
					},
					'Household': {
						'subcats': [],
						'totalSpent': 0,
						'expenses' : []
					}
				}
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
		var categories = JSON.parse(localStorage.getItem('budgifyCategories')) || this.state.categories;
		categories[catName].expenses.push(expense);
		categories[catName].totalSpent += Number(expense.cost);
		var expenses = JSON.parse(localStorage.getItem('budgifyExpenses'));
		var thisExpense = expenses[index];
		thisExpense.category = catName;
		expenses[index] = thisExpense;
		localStorage.setItem('budgifyExpenses', JSON.stringify(expenses));
		var balance = localStorage.getItem('budgifyBalance');
		this.props.addItemToState(JSON.stringify(expenses), balance);
		//SET IT IN STATE TOO
		localStorage.setItem('budgifyCategories', JSON.stringify(categories));
		this.setState({
			categories: categories
		})
	}
	
	clearAllCats() {
		var confirm = window.confirm('Are you sure you want to clear all categories?');
		if(confirm) {
			var expenses = JSON.parse(this.props.info.info.expenses);
			expenses.map(expense => expense.category = null );
			this.props.addItemToState(JSON.stringify(expenses), localStorage.getItem('budgifyBalance'));
			alert('All categories cleared. Have fun setting them again!');
		}
	}
	
	render() {
		var props = this.props.info;
		var parentHandlers = this.props.props;
		var info = props.info;
		var expenses = JSON.parse(info.expenses);
		var catMap = Object.keys(this.state.categories).map(function(key) {
			var temp = {};
			temp[key] = this.state.categories[key];
		  return temp;
	  	}, this);
		return (
			<div id="spendingArea" className={parentHandlers.categoryToggled ? "spendingArea showtime" : "spendingArea"}>
				<ul className="categories">
					{catMap.map((cat, i) => {
						for(let catName in cat) {
							return <li onClick={(param) => this.showCategory(catName)} className={catName} key={catName}>{catName}</li>;
						}						
					})}
				</ul>
				<div className="categorization">
				{catMap.map((category, i) => {
					for(let catName in category) {
						var catExpenses = this.state.categories[catName].expenses,
							current = new Date(),
							modifier = new Date(),
							modifierTwo = new Date(), 
							latestSunday = new Date(modifier.setDate(modifier.getDate() - modifier.getDay())),
							dayBefore = new Date(modifier.setDate(modifier.getDate() - (modifier.getDay() + 1))),
							prevSun = new Date(dayBefore.setDate(dayBefore.getDate() - dayBefore.getDay())),
							totalThisWeek = 0,
							totalLastWeek = 0;
						current.setHours(0,0,0,0);
						latestSunday.setHours(0,0,0,0);
						for(var i = 0; i < catExpenses.length; i++) {
							var expense = catExpenses[i]; 
							var expenseDate = new Date(expense.date);
							if(expenseDate > latestSunday) {
								totalThisWeek += Number(expense.cost);
							} else if(expenseDate < latestSunday && expenseDate > prevSun) {
								totalLastWeek += Number(expense.cost);
							}
						}
						if(!shownExpenses) {
							var shownExpenses = expenses;
						}

						return(
							<div key={Math.random() * Math.random()} className={this.state.categorySelected === catName ? 'cat-info active '+catName : 'cat-info '+catName}>
								<button className="clearAllCats" onClick={this.clearAllCats}>Clear All Categories</button> 
								<button onClick={(param) => this.openAddPopup(catName)}>Add Expenses to {catName}</button> 
								<br />
								<div 
									className={this.state.activePopup === catName ? 'category-popup active' : 'category-popup'}
									onClick={this.closePopup}
									>
									<div className="pop-content" onClick={this.pleaseStopPropagation}>
										<ShownExpenses 
											expenses={expenses}
											addToCategory={this.addToCategory}
											catName={catName}
										/>
									</div>
								</div>
								<div>
									Spent on {catName} this week: $ {totalThisWeek.toFixed(2)}
								</div>
								<div>
									Spent on {catName} last week: $ {totalLastWeek.toFixed(2)}
								</div>
								<div>
									Spent on {catName} for all time: $ {this.state.categories[catName].totalSpent.toFixed(2)}
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