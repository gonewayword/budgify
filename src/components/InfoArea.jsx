import React from 'react';
import AddingArea from './AddingArea';

class InfoArea extends React.Component {
	constructor(props) {
		super(props);
		this.addItem = this.addItem.bind(this);
		this.deleteItem = this.deleteItem.bind(this);
	}
	
	addItem(e) {
		if(e && e.key && e.key !== 'Enter') return;
		var expenseStorage = JSON.parse(localStorage.getItem('budgifyExpenses')) || [];
		var description = document.getElementById('description').value;
		var cost = document.getElementById('cost').value;
		var dateValue = document.getElementById('date').value;
		var adjustedDate;
		if(dateValue) {
			var unadjustedDate = new Date(dateValue);
			adjustedDate = new Date(unadjustedDate.getTime() + (unadjustedDate.getTimezoneOffset() * 60 * 1000));
			adjustedDate.setHours(0,0,1,0);
		} else {
			adjustedDate = new Date();
		}

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
		expenseStorage.unshift({
			description: description,
			cost: cost,
			date: adjustedDate
		});
		expenseStorage.sort(function(a,b) {
			if(new Date(a.date) < new Date(b.date)) {
				return 1;
			}
			if(new Date(a.date) > new Date(b.date)){
				return -1;
			}
			return 0;
		});	
		var newBalance = localStorage.getItem('budgifyBalance') - cost;
		localStorage.setItem('budgifyBalance', newBalance);
		localStorage.setItem('budgifyExpenses', JSON.stringify(expenseStorage));
		this.props.addItemToState(JSON.stringify(expenseStorage), newBalance);
		this.forceUpdate();
		document.getElementById('cost').value = null;
		document.getElementById('description').value = ''
		document.getElementById('description').focus();
		document.getElementById('deleted-popup').innerHTML = '"' + description + '" added to expenses.';
		document.getElementById('deleted-overlay').classList.add('showing');
		setTimeout(function() {
			document.getElementById('deleted-overlay').classList.remove('showing');
		}, 1300);
	}
	
	deleteItem(index) {
		var confirmation = window.confirm('Remove this expense item?');
		if(!confirmation) {
			return false;
		}
		var expenses = JSON.parse(localStorage.getItem('budgifyExpenses'));
		expenses.splice(index, 1);
		expenses.sort(function(a,b) {
			if(new Date(a.date) < new Date(b.date)) {
				return 1;
			}
			if(new Date(a.date) > new Date(b.date)){
				return -1;
			}
			return 0;
		});	
		var currentBalance = localStorage.getItem('budgifyBalance');
		var newBalance = Number(currentBalance) + Number(expenses[index].cost);
		var removedItemName = expenses[index].description;
		var newExpenses = JSON.stringify(expenses);
		this.props.deleteItemFromState(newBalance, newExpenses);
		localStorage.setItem('budgifyBalance', newBalance);
		localStorage.setItem('budgifyExpenses', newExpenses);
		document.getElementById('deleted-popup').innerHTML = 'You\'ve removed "'  + removedItemName + '"';
		document.getElementById('deleted-overlay').classList.add('showing');
		setTimeout(function() {
			document.getElementById('deleted-overlay').classList.remove('showing');
		}, 1300);
	}
	render() {
		return (
			<div>
				<div className="module expenseItems">
					<AddingArea 
					handler={this.addItem} 
					addItemToState={this.props.addItemToState}
					deleteHandler={this.deleteItem} 
					info={this.props.info}/>
				</div>
			</div>
		)
	}
}

export default InfoArea;