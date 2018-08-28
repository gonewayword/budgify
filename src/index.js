import React from 'react';
import ReactDOM from 'react-dom';
import InfoArea from './components/InfoArea';
import ModifyArea from './components/ModifyArea';
import Weekifier from './components/Weekifier';
import './index.css';

class MainContainer extends React.Component {
	constructor(props) {
		super(props);
		this.addItemToState = this.addItemToState.bind(this);
		this.deleteItemFromState = this.deleteItemFromState.bind(this);
		this.setStartingIncomeState = this.setStartingIncomeState.bind(this);
		this.setRangeExpenses = this.setRangeExpenses.bind(this);
		this.resetBalance = this.resetBalance.bind(this);
		this.recalculateBalance = this.recalculateBalance.bind(this);
		this.newGame = this.newGame.bind(this);
		this.setIncomeState = this.setIncomeState.bind(this);
		this.setWeeklyState = this.setWeeklyState.bind(this);
		this.setDailyState = this.setDailyState.bind(this);
		var localIncome = localStorage.getItem('budgifyIncome');
		var localBalance = localStorage.getItem('budgifyBalance');
		var localExpenses = localStorage.getItem('budgifyExpenses');
		// this.state = {};
		// this.state.expenses = (localExpenses ? localExpenses : []);
		// this.state.income = (localIncome ? localIncome : 0);
		var localStartingIncome = localStorage.getItem('budgifyStartingIncome');
		var localFrequency = localStorage.getItem('budgifyFrequency');
		var localStartDate = localStorage.getItem('budgifyStartDate');
		var weeklyBudget = localStorage.getItem('budgifyWeeklyBudget') || 0;
		// var dailyBudget = localStorage.getItem('budgifyDailyBudget') || 0;
		this.state = {
			startDate: localStartDate || new Date(),
			expenses: localExpenses  || [],
			income: localIncome || 0,
			startingIncome: (localStartingIncome ? localStartingIncome : 0),
			weekly: (weeklyBudget ? weeklyBudget : (localIncome ? localIncome : 0)),
			// daily: ()
			currentBalance: (localBalance ? localBalance : 0),
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
	
	componentWillMount() {
		
	}
	
	componentDidMount() {
		if(localStorage.getItem('budgifyLastCheck')) {
			var lastCheck = new Date(localStorage.getItem('budgifyLastCheck'));
			if(this.state.frequency === 'weekly') {
				var current = new Date();
				// to check if working; will infinite loop, so reload then you'll see if worked
				// current.setDate((current.getDate()) + 1);
				current.setHours(0,0,0,0);
				var latestSunday = new Date(current.setDate(current.getDate() - current.getDay()));
				latestSunday.setHours(0,0,0,0);
				if(lastCheck < latestSunday) {
					var newBalance = Number(this.state.currentBalance) + Number(this.state.income);
					localStorage.setItem('budgifyLastCheck', new Date());						
					localStorage.setItem('budgifyBalance', newBalance);
					this.setState({
						currentBalance: newBalance
					})
				}	
			}
		} else {
			var setDate = new Date();
			setDate.setHours(0,0,0,0);
			localStorage.setItem('budgifyLastCheck', setDate);
		}
		
		// temporary get of last week -- use for week tracker?
		// var modifier = new Date();
		// var thisSunday = new Date();
		// thisSunday.setHours(0,0,0,0);
		// var lastSunday = new Date(modifier.setDate(modifier.getDate() - 7));
		// lastSunday.setHours(0,0,0,0);
		// var lastWeek = JSON.parse(this.state.expenses).filter(function(expense) {
		// 	return new Date(lastSunday) < new Date(expense.date) && new Date(expense.date) < new Date(thisSunday);
		// }).map(a => Number(a.cost)).reduce((a,b) => a + b, 0);
	}
	
	componentDidUpdate() {
		
	}
	
	addItemToState(newExpenses, newBalance) {
		this.setState({expenses: newExpenses }, function() {
			this.setState({currentBalance: newBalance });
		});
	}
	deleteItemFromState(newBalance, newExpenses) {
		this.setState({currentBalance: newBalance}, function() {
			this.setState({expenses: newExpenses});
		});
	}
	setRangeExpenses(expenses) {
		this.setState({activeExpenses: expenses});
	}
	setStartingIncomeState(newStartingIncome) {
		this.setState({startingIncome: newStartingIncome});
	}
	setIncomeState(newIncome) {
		this.setState({income: newIncome });
	}
	setWeeklyState(newWeekly){
		this.setState({
			weekly: newWeekly
		})
	}
	setDailyState(newDaily) {
		this.setState({
			daily: newDaily
		})
	}
	// getWeekly() {
	// 	var info = this.state;
	// 	var weekly;
	// 	if(info.expenses) {
	// 		var expenses = JSON.parse(info.expenses);
	// 		var total = 0;
	// 		var current = new Date();
	// 		current.setHours(0,0,0,0);
	// 		this.latestSunday = current.setDate(current.getDate() - current.getDay());
	// 		expenses = expenses.filter(function(item) {
	// 			var itemDate = new Date(item.date);
	// 			var latestSunday = new Date(this.latestSunday);
	// 			return itemDate > latestSunday;
	// 		}, this);
	// 		expenses.forEach(function(item) {
	// 			total += Number(item.cost);
	// 		});
	// 		weekly = (Number(info.income) - total).toFixed(2);
	// 	} else {
	// 		weekly = 0;
	// 	}
	// 	return weekly;
	// }
	
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
			if(idiotNumber == null) {
				return false;
			} else if(isNaN(Number(idiotNumber))) {
				var shuttingDown = window.prompt('Enter a fucking number, dick.');
				if(shuttingDown == null) {
					return false;
				} else if(isNaN(Number(shuttingDown))) {
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
	
	recalculateBalance() {
		var areYouSure = window.confirm('Are you sure? This will recalibrate by subtracting all expenses from your current starting income, as if you are "resetting" all of your progress thus far. Make sure you adjust your starting income as well to account for income since your expenses started!');
		if(areYouSure) {
			var totalSpent = JSON.parse(this.state.expenses)
								.map(a => a.cost)
								.reduce((a,b) => Number(a) + Number(b));
			var newBalance = this.state.startingIncome - totalSpent;
			localStorage.setItem('budgifyBalance', newBalance);
		}
	}
	
	newGame() {
		var confirmed = window.prompt('Please enter a date from the week you\'d like to start your new game from.');
		if(confirmed) {
			var info = this.state;
			var expenses = JSON.parse(info.expenses);
			var totalSpent = 0;
			var daily = this.state.income / 7;
			var current = new Date(confirmed);
			var today = new Date();
			today.setHours(0,0,0,0);
			current.setDate(current.getDate() - current.getDay());
			current.setHours(0,0,0,0);
			this.setState({startDate: current});
			localStorage.setItem('budgifyStartDate', current);
			var daysSince = (today.getTime() - current.getTime()) / (1000 * 60 * 60 * 24);
			var totalEarned = daysSince * daily;
			expenses = expenses.filter(function(item) {
				var itemDate = new Date(item.date);
				return itemDate > current;
			}, this);
			expenses.forEach(function(item) {
				totalSpent += Number(item.cost);
			});
			// var today = new Date();
			// var totalSundays = 0;
			// for(var i = current; i <= today; ){
			// 	if (i.getDay() === 0){
			//         totalSundays++;
			//     }
			// 	i.setTime(i.getTime() + 1000*60*60*24);
			// }
			// var incomeSince = totalSundays * this.state.income;
			console.log(totalEarned);
			console.log(totalSpent);
			var surplus = totalEarned - totalSpent;
			this.setState({currentBalance: surplus});
			localStorage.setItem('budgifyBalance', surplus);
		}
	}
	
	render() {
	   return ( 
		 <div className="budgify-app"> 
		 	<div className="title">
			Budgify
			</div>
			<button className="reset" onClick={this.resetBalance}>
				Change My Progress
			</button>
			<button className="reset" onClick={this.recalculateBalance}>
				Recalibrate
			</button>
			<button className="reset" onClick={this.newGame}>
				New Game
			</button>
			<div className="row">
			<div className="main-module">
					<InfoArea 
					addItemToState={this.addItemToState}
					deleteItemFromState={this.deleteItemFromState}
					info={this.state}
					/>
				</div>
				<div className="main-module">
					<ModifyArea 
					setIncomeState={this.setIncomeState}
					setStartingIncomeState={this.setStartingIncomeState}
					setRangeExpenses={this.setRangeExpenses}
					info={this.state} />
				</div>
			</div>
			<Weekifier 
				info={this.state} 
				setWeeklyState={this.setWeeklyState}
				setDailyState={this.setDailyState}
				/>
		 </div>
	   )
	 }
}

ReactDOM.render(
  <MainContainer />,
  document.getElementById('root')
);