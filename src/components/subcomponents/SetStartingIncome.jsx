import React from 'react';
// import firebase from 'firebase';

class SetStartingIncome extends React.Component {
	constructor(props) {
		super(props);
		this.setStartingIncome = this.setStartingIncome.bind(this);
	}
	setStartingIncome() {
		var newStartingIncome = document.getElementById('starting-income-amount').value;
		this.props.setStartingIncomeState(newStartingIncome);
		localStorage.setItem('budgifyStartingIncome', newStartingIncome);
	}
	render() {
		var startingIncome;
		if(this.props.info.startingIncome) {
			startingIncome = this.props.info.startingIncome;
		} else {
			startingIncome = 0;
		}
		return (
			<div>
				<input id="starting-income-amount" defaultValue={startingIncome} type="number" />
				<button onClick={this.setStartingIncome}>
					Set Starting Budget
				</button>
			</div>
		)
	}
}

export default SetStartingIncome;