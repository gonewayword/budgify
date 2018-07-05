import React from 'react';

class ShownExpenses extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			shownExpenses: this.props.expenses
		}
	}
	
	render() {
		var catName = this.props.catName;
		function regSearch() {
			var catName = this.props.catName;
			var value = document.getElementById(catName+'-search').value;
			console.log(value);
			var shownExpenses = this.props.expenses.filter(function(item) {
				return item.description.toLowerCase().indexOf(value.toLowerCase()) > -1;
			});
			this.setState({
				shownExpenses: shownExpenses
			});
		}
		return(
			<div>
				<div className="addcat-title">
					Add Expenses to {catName}
					<input id={catName+'-search'} type="text" placeholder="Search" onChange={regSearch.bind(this)} />
				</div>
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
				<div>
					{this.state.shownExpenses.map((expense, i) => {
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
							<div className="row expense-holder " key={expense.description + i}>
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
								<button className="delete" onClick={(param) => this.props.addToCategory(expense, i, catName)}>
									+
								</button>
							</div>
						)
					})}
				</div>
			</div>
		)
	}
}

export default ShownExpenses;