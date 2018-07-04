import React from 'react';
import CatController from './subcomponents/CatController.jsx';
import ExpenseArea from './subcomponents/ExpenseArea.jsx';

class AddingArea extends React.Component {
	constructor(props) {
		super(props);
		this.handleToggle = this.handleToggle.bind(this);
		this.state = {
			expensesToggled: true,
			categoryToggled: false
		}
		
	}
	handleToggle() {
		this.setState({
			expensesToggled: !this.state.expensesToggled,
			categoryToggled: !this.state.categoryToggled
		})
	}
	render() {
		return (
			<div className="gettingSpending">
				<ExpenseArea info={this.props.info} 
				state={this.state} 
				deleteHandler={this.props.deleteHandler} 
				handler={this.props.handler}
				/>
				<CatController props={this.state} info={this.props} />
				<div className="toggleArea">
					<div onClick={this.handleToggle} className={this.state.expensesToggled ? "toggle active" : "toggle"}>
						Expenses
					</div>
					<div onClick={this.handleToggle} className={this.state.categoryToggled ?  "toggle active" : "toggle"}>
						Categories
					</div>
				</div>
				<div id="deleted-overlay">
					<div id="deleted-popup">
					</div>
				</div>
			</div>
		)
	}
}

export default AddingArea;