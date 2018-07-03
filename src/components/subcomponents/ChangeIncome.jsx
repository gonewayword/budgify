import React from 'react';

class ChangeIncome extends React.Component {
	constructor(props) {
		super(props);
		this.setIncome = this.setIncome.bind(this);
	}
	setIncome() {
		var newIncome = document.getElementById('income-amount').value;
		localStorage.setItem('budgifyIncome', newIncome);
		this.props.setIncomeState(newIncome);
	}
	render() {
		return (
			<div>
				<input id="income-amount" defaultValue={this.props.info.income} type="number" />
				<button onClick={this.setIncome}>
					Set Regular Income
				</button>
			</div>
		)
	}
}

export default ChangeIncome;