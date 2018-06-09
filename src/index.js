import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class MainContainer extends React.Component {
	constructor(props) {
		super(props);
		var localBalance = localStorage.getItem('budgifyBalance');
		var localIncome = localStorage.getItem('budgifyIncome');
		var localFrequency = localStorage.getItem('budgifyFrequency');
		var localExpenses = localStorage.getItem('budgifyExpenses');
		this.changeFrequency = this.changeFrequency.bind(this);
		this.addItem = this.addItem.bind(this);
		this.deleteItem = this.deleteItem.bind(this);
		this.resetBalance = this.resetBalance.bind(this);
		this.state = {
			currentBalance: (localBalance ? localBalance : 0),
			expenses: localExpenses || [],
			income: (localIncome ? localIncome : 0),
			frequency: localFrequency ? localFrequency : null,
			frequencyOptions: [
				{
					value: 'daily',
					label: 'Daily'
				},
				{
					value: 'weekly',
					label: 'Weekly'
				},
				{
					value: 'biweekly',
					label: 'Biweekly'
				},
				{
					value: 'monthly',
					label: 'Monthly'
				}
			]
		}
	}
	
	componentDidMount() {
		if(localStorage.getItem('budgifyLastCheck')) {
			var lastCheck = localStorage.getItem('budgifyLastCheck');
			if(this.state.frequency == 'weekly') {
				var i = 0;
				while(i < 7) {
					
					i++;
				}
			}
		} else {
			localStorage.setItem('budgifyLastCheck', Date.now());
		}
	}
	
	changeFrequency() {	
		var newFrequency = document.getElementById('frequency-selector').value;
		this.setState({'frequency' : newFrequency});
		localStorage.setItem('budgifyFrequency', newFrequency);
		//Now you have to do all the things that come with this. Like change the timer budget accrual
	}
	
	setIncome() {
		var newIncome = document.getElementById('income-amount').value;
		localStorage.setItem('budgifyIncome', newIncome);
	}
	
	addItem() {
		var expenseStorage = JSON.parse(localStorage.getItem('budgifyExpenses')) || [];
		var description = document.getElementById('description').value;
		var cost = document.getElementById('cost').value;
		if(!cost && !description) {
			alert('Please enter a cost and description for the expense!');
			return false;
		} else if (!cost) {
			alert('Please enter a cost for the expense!');
			return false;
		} else if (!description) {
			alert('Please enter a description for the expense!');
			return false;
		}
		expenseStorage.push({
			description: description,
			cost: cost,
			date: Date.now()
		});
		var newBalance = localStorage.getItem('budgifyBalance') - cost;
		localStorage.setItem('budgifyBalance', newBalance);
		localStorage.setItem('budgifyExpenses', JSON.stringify(expenseStorage));
		this.setState({'expenses': JSON.stringify(expenseStorage) });
		this.setState({ 'currentBalance': newBalance });
	}
	
	deleteItem(index) {
		var confirmation = window.confirm('Remove this expense item?');
		if(!confirmation) {
			return false;
		}
		var expenses = JSON.parse(localStorage.getItem('budgifyExpenses'));
		var currentBalance = localStorage.getItem('budgifyBalance');
		var newBalance = Number(currentBalance) + Number(expenses[index].cost);
		expenses.splice(index, 1);
		var newExpenses = JSON.stringify(expenses);
		localStorage.setItem('budgifyBalance', newBalance);
		this.setState({'currentBalance': newBalance});
		localStorage.setItem('budgifyExpenses', newExpenses)
		this.setState({'expenses': newExpenses});
	}
	
	resetBalance() {
		var newBalance = window.prompt('What do you want your balance reset to?');
		function changeBalance(amount) {
			localStorage.setItem('budgifyBalance', amount);
			this.setState({'currentBalance': amount});	
		};
		var resetBalance = changeBalance.bind(this);
		if(newBalance == null) {
			return false;
		} else if(isNaN(Number(newBalance))) {
			var idiotNumber = window.prompt('Please enter only a number.');
			if(isNaN(Number(idiotNumber))) {
				var shuttingDown = window.prompt('Enter a fucking number, dick.');
				if(isNaN(Number(shuttingDown))) {
					alert('Goodbye, glue sniffer.');
					this.resetBalance();
				} else {
					resetBalance(shuttingDown);
				}
			} else {
				resetBalance(idiotNumber);
			}
		} else {
			resetBalance(newBalance);
		}
	}
	
	render() {
	   return ( 
		 <div className="budgify-app"> 
		 	<div className="title">
			Budgify
			</div>
			<div className="module currentBalance">
				Current Balance:  $ {this.state.currentBalance}
			</div>
			<button className="reset" onClick={this.resetBalance}>
				Reset My Balance
			</button>
			<div className="row">
			<div className="main-module">
					<InfoArea addingHandler={this.addItem} deleteHandler={this.deleteItem} info={this.state} />
				</div>
				<div className="main-module">
					<ModifyArea setIncome={this.setIncome} frequencyHandler={this.changeFrequency} info={this.state} />
				</div>
			</div>
		 </div>
	   )
	 }
}

class InfoArea extends React.Component {
	render() {
		return (
			<div>
				<div className="module expenseItems">
					<AddingArea handler={this.props.addingHandler} deleteHandler={this.props.deleteHandler} info={this.props.info}/>
				</div>
			</div>
		)
	}
}

class AddingArea extends React.Component {
	render() {
		var info = this.props.info;
		var expenses = JSON.parse(this.props.info.expenses).reverse();
		return (
			<div className="addingArea">
				<input id="description" type="text" placeholder="Expense Description"/>
				<input id="cost" type="number" placeholder="Cost" step="0.01" />
				<button onClick={this.props.handler}>
				Add Expense
				</button>
				<div className="expenseArea">
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

class ModifyArea extends React.Component {
	render() {
		return (
			<div id="change-area">
				<div className="changeIncome changer">
					<ChangeIncome handler={this.props.setIncome} info={this.props.info} />
				</div>
				<div className="changeFrequency changer">
					<ChangeFrequency handler={this.props.frequencyHandler} info={this.props.info} />
				</div>
			</div>
		)
	}
}

class ChangeIncome extends React.Component {
	render() {
		return (
			<div>
				<input id="income-amount" defaultValue={this.props.info.income} type="number" />
				<button onClick={this.props.handler}>
					Change Income
				</button>
			</div>
		)
	}
}

class ChangeFrequency extends React.Component {
	render() {
		var info = this.props.info;
		var frequencyOptionMarkup = [];
		for(var i = 0; i < info.frequencyOptions.length; i++) {
			var option = info.frequencyOptions[i];
			frequencyOptionMarkup.push(<option key={i} value={option.value}>{option.label}</option>);
		}
		return (
			<div>
				<select defaultValue={info.frequency} id="frequency-selector">
					{frequencyOptionMarkup}
				</select>
				<button onClick={this.props.handler}>Change Frequency</button>
			</div>
		)
	}
}

ReactDOM.render(
  <MainContainer />,
  document.getElementById('root')
);

function millisecondsConvert(range) {
	
}