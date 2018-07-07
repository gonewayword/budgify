import React from 'react';

class ExpenseArea extends React.Component {
	
	render() {
		var info = this.props.info;
		var state = this.props.state;
		var expenses;
		if(info.expenses) {
			expenses = JSON.parse(info.expenses);
			expenses.sort(function(a,b) {
				if(new Date(a.date) < new Date(b.date)) {
					return 1;
				}
				if(new Date(a.date) > new Date(b.date)){
					return -1;
				}
				return 0;
			});	
		} else {
			expenses = [];
		}
		return (
			<div id="addingPlace" className={state.expensesToggled ? "addingArea showtime" : "addingArea"}>
				<input id="description" type="text" placeholder="Expense Description"/>
				<input id="cost" type="number" placeholder="Cost" step="0.01" onKeyPress={this.props.handler}/>
				<input id="date" type="date" placeholder="Date" onKeyPress={this.props.handler}/>
				<button className="adding-button" onClick={this.props.handler}>
				Add
				</button>
				<div className="expenseArea">
					<div className="timestrip">
						<div className="spacetime">
							Daily
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
							<div className="row expense-holder" key={i}>
								<div className="column third describe">
									{expense.description}
								</div>
								<div className="column third spend">
									$ {expense.cost}
								</div>
								<div className="column third date">
									{formattedDate}
								</div>
								<button className="delete" onClick={this.props.deleteHandler.bind(this, i)}>
									x
								</button>
							</div>
						)
					})}
				</div>
			</div>
		)
	}
}

export default ExpenseArea;