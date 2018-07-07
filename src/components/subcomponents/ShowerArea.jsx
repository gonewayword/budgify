import React from 'react';

class ShowerArea extends React.Component {
	constructor(props) {
		super(props)
		this.changeRange = this.changeRange.bind(this);
	}
	
	changeRange() {
		var startDate = document.getElementById('start-date').value;
		var endDate = document.getElementById('end-date').value;
		var expenses = JSON.parse(this.props.info.expenses);
		if(!startDate || ! endDate) {
			if(!startDate && !endDate) {
				alert('Please enter a start date and end date!')
			} else if(!startDate) {
				alert('Please enter a start date!');
			} else if(!endDate) {
				alert('Please enter an end date!')
			}
			return false;		
		}
		startDate = new Date(startDate);
		endDate = new Date(endDate);
		expenses = expenses.filter(a => {
			var expDate = new Date(a.date);
			if(startDate < expDate && startDate < endDate) {
				return a;
			} else {
				return false;
			}
		});
		// DEBUG HERE WHY throwing an anti-pattern
		this.props.setRangeExpenses(JSON.stringify(expenses));
	}
	
	render () {
		var info = this.props.info;
		var totalDebt, spentWeek, accumulatedIncome;
		if(info.expenses) {
			totalDebt = JSON.parse(info.expenses).map(a => a.cost).reduce((a,b) => Number(a) + Number(b)).toFixed(2);
			spentWeek = info.income - info.weekly;
			accumulatedIncome = (Number(totalDebt) + Number(info.currentBalance)).toFixed(2);	
		} else {
			totalDebt = 0;
			spentWeek = 0;
			accumulatedIncome = 0;
		}
		// var spentWeek = info ? info.income - info.weekly : 0;
		// var spentWeek = info.income - info.weekly;
			return (
			<div>
				<div className="currentSpent shower">
					<div>
					Total Spent:
					</div>
					<div>
						$ {totalDebt}
					</div>
					<hr />
				</div>
				<div className="weeklySpent shower">
					<div>
					Spent This Week:
					</div>
					<div>
						$ {Number(spentWeek).toFixed(2)}
					</div>
					<hr />
				</div>
				<div className="accumulatedIncome shower">
					<div>
						Accumulated Income:
					</div>
					<div>
						$ {accumulatedIncome}
					</div>
					<hr />
				</div>
				<div className="accumulatedIncome shower">
					<div>
						Your Weekly Income:
					</div>
					<div>
						$ {info.income}
					</div>
				<hr />
				</div>
				<div className="accumulatedIncome shower">
					<div>
						Your Daily Budget:
					</div>
					<div>
						$ {(info.income/7).toFixed(2)}
					</div>
				<hr />
				</div>
				<div className="dateRange shower">
					<div className="subtitle">
						Change Date Range
					</div>
					<br />
					<br />
					<div>
						<label htmlFor="start-date">
							Start Date
						</label>
						<br />
						<br />
						<input id="start-date" name="startDate" type="date" />
					</div>
					<div>
						<label htmlFor="end-date">
							End Date
						</label>
						<br />
						<br />
						<input id="end-date" name="endDate" type="date" />
					</div>
					<div className="range-change-button-area">
							<button className="range-change-button" onClick={this.changeRange}>
								Change Range
							</button>
					</div>
				</div>
			</div>
		)
	}
}

export default ShowerArea;