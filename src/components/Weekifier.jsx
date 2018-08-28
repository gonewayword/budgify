import React from 'react';
// import firebase from 'firebase';

class Weekifier extends React.Component {
	constructor(props) {
		super(props);
		this.getBudgetFromRange = this.getBudgetFromRange.bind(this);
		this.changeWeek = this.changeWeek.bind(this);
		var current = new Date();
		var midnight = new Date(current.setHours(0,0,0,0));
		var lastSunday = new Date(current.setDate(current.getDate() - current.getDay()));
		this.state = {
			selectedWeek: lastSunday,
			selectedDay: midnight,
		}
		var weekly = this.getBudgetFromRange('weekly', this.state.selectedWeek);
		var daily = this.getBudgetFromRange('daily', this.state.selectedDay);
		this.state['weekly'] = weekly;
		this.state['daily'] = daily;
	}
	componentWillMount() {
		
	}
	changeWeek(direction) {
		var thisWeek = new Date(this.state.selectedWeek);
		var lastWeek;
		if(direction === 'left') {
			lastWeek = new Date(thisWeek.setDate(thisWeek.getDate() - 7));
		} else if(direction === 'right') {
			lastWeek = new Date(thisWeek.setDate(thisWeek.getDate() + 7));
			var today = new Date();
			if(today < lastWeek) {
				alert('Cannot time travel into the future! At least not yet.');
				return false;
			}
		}
		var weekBudget = this.getBudgetFromRange('weekly', lastWeek);
		this.setState({
			selectedWeek: lastWeek,
			weekly: weekBudget
		});
	}
	changeDay(direction) {
		var thisDay = new Date(this.state.selectedDay);
		var diffDay;
		if(direction === 'left') {
			diffDay = new Date(thisDay.setDate(thisDay.getDate() - 1));
		} else if(direction === 'right') {
			diffDay = new Date(thisDay.setDate(thisDay.getDate() + 1));
			var today = new Date();
			if(today < diffDay) {
				alert('Cannot time travel into the future! At least not yet.');
				return false;
			}
		}
		var weekBudget = this.getBudgetFromRange('daily', diffDay);
		this.setState({
			selectedDay: diffDay,
			daily: weekBudget
		});
	}
	getBudgetFromRange(period, a) {
		var weekly;
		var expenses = JSON.parse(this.props.info.expenses);
		var total = 0, dailyTotal = 0;
		if(expenses) {
			if(period === 'daily') {
				var midnight = new Date(a);
				var midnightTomorrow = new Date(a);
				midnightTomorrow.setDate(midnightTomorrow.getDate() + 1);
				midnight.setHours(0,0,0,0);
				midnightTomorrow.setHours(0,0,0,0);
				expenses.forEach(function(item) {
					if(new Date(item.date) > midnight && new Date(item.date) < midnightTomorrow) {
						dailyTotal += Number(item.cost);
					}
				});
				var dailyBudget = Number(this.props.info.income) / 7;
				var dailyBudgetRemaining = (dailyBudget - dailyTotal).toFixed(2);
			} else if(period === 'weekly') {
				var current = new Date(a);
				var currentTwo = new Date(a);
				current.setHours(0,0,0,0);
				currentTwo.setHours(0,0,0,0);
				var latestSunday = new Date(current.setDate(current.getDate() - current.getDay()));
				var nextSunday = new Date(currentTwo.setDate(currentTwo.getDate() + (7 - currentTwo.getDay())));
				expenses = expenses.filter(function(item) {
					var itemDate = new Date(item.date);
					return itemDate > latestSunday && itemDate < nextSunday;
				}, this);
				expenses.forEach(function(item) {
					total += Number(item.cost);
				});
				weekly = (Number(this.props.info.income) - total).toFixed(2);
			}
		} else {
			weekly = 0;
		}
		if(period === 'daily') return dailyBudgetRemaining;
		else if(period === 'weekly') return weekly;
	}
	render() {
		var surplus = this.props.info.currentBalance;
		var selectedWeek = this.state.selectedWeek;
		var selectedDay = this.state.selectedDay;
		var presentWeek = (selectedWeek.getMonth() + 1) + 
							'/' + 
							selectedWeek.getDate() + 
							'/' + 
							selectedWeek.getFullYear();
		var presentDay = (selectedDay.getMonth() + 1) + 
							'/' + 
							selectedDay.getDate() + 
							'/' + 
							selectedDay.getFullYear();
		var rightNow = new Date();
		var spent = 0;
		var current = new Date();
		current.setHours(0,0,0,0);
		var latestSunday = new Date(current.setDate(current.getDate() - current.getDay()));
		JSON.parse(this.props.info.expenses).forEach(function(item) {
			var itemDate = new Date(item.date);
			if(itemDate > latestSunday && itemDate < rightNow) {
				spent += Number(item.cost);
			}
		});
		var weekSurplus = ((this.props.info.income/7) * (rightNow.getDay() + 1)) - spent;
		return (
			<div>
				<div className="weekifier surplus">
					<div className="statusTitle">
						Surplus
					</div>
					<div className="surplus">
						$ {Number(surplus).toFixed(2)}
					</div>
				</div>
				<div className="weekifier daily-surplus">
					<div className="statusTitle">
						This week's surplus
					</div>
					<div className="surplus">
						$ {weekSurplus.toFixed(2)}
					</div>
				</div>
				<div className="weekifier">
					<div className="invisaclick left" onClick={(params) => this.changeWeek('left')}></div>
					<div className="statusTitle">
						Budget for: <br />
						Week of {presentWeek}
					</div>
					<div className="surplus">
						$ {Number(this.state.weekly).toFixed(2)}
					</div>
					<div className="invisaclick right" onClick={(params) => this.changeWeek('right')}></div>
				</div>
				<div className="weekifier daily">
					<div className="invisaclick left" onClick={(params) => this.changeDay('left')}></div>
					<div className="statusTitle">
						Budget for the date: <br />
						{presentDay}
					</div>
					<div className="surplus">
						$ {this.state.daily}
					</div>
					<div className="invisaclick right" onClick={(params) => this.changeDay('right')}></div>
				</div>
			</div>
		)
	}
}

export default Weekifier;