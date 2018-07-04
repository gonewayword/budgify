import React from 'react';
// import firebase from 'firebase';

class Weekifier extends React.Component {
	componentWillMount() {
		
	}
	render() {
		var info = this.props.info;
		var surplus = info.currentBalance;
		// var weekly = info.weekly;
		var weekly;
		if(info.expenses) {
			var expenses = JSON.parse(info.expenses);
			var total = 0;
			var current = new Date();
			current.setHours(0,0,0,0);
			this.latestSunday = current.setDate(current.getDate() - current.getDay());
			expenses = expenses.filter(function(item) {
				var itemDate = new Date(item.date);
				var latestSunday = new Date(this.latestSunday);
				return itemDate > latestSunday;
			}, this);
			expenses.forEach(function(item) {
				total += Number(item.cost);
			});
			weekly = (Number(info.income) - total).toFixed(2);
		} else {
			weekly = 0;
		}
		if(info.weekly && info.weekly !== weekly) {
			this.props.setWeeklyState(weekly);	
		}
		return (
			<div>
				<div className="weekifier-surplus">
					<div className="statusTitle">
						Surplus
					</div>
					<div className="surplus">
						$ {Number(surplus).toFixed(2)}
					</div>
				</div>
				<div className="weekifier">
					<div className="statusTitle">
						Weekly Budget
					</div>
					<div className="weekly-surplus">
						$ {Number(weekly).toFixed(2)}
					</div>
				</div>
			</div>
		)
	}
}

export default Weekifier;