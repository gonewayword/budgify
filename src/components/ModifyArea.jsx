import React from 'react';
import ShowerArea from './subcomponents/ShowerArea';
import SetStartingIncome from './subcomponents/SetStartingIncome';
import ChangeIncome from './subcomponents/ChangeIncome';
import ChangeFrequency from './subcomponents/ChangeFrequency';

class ModifyArea extends React.Component {
	render() {
		var info = this.props.info;
		return (
			<div id="change-area">
				<ShowerArea info={info} setRangeExpenses={this.props.setRangeExpenses} />
				<div className="showingPlace">
					<div className="setStartingIncome changer">
						<SetStartingIncome 
						setStartingIncomeState={this.props.setStartingIncomeState} 
						handler={this.props.startingIncomeHandler} 
						info={this.props.info} 
						/>
					</div>
					<div className="changeIncome changer">
						<ChangeIncome setIncomeState={this.props.setIncomeState} handler={this.props.setIncome} info={this.props.info} />
					</div>
					<div className="changeFrequency changer">
						<ChangeFrequency handler={this.props.frequencyHandler} info={this.props.info} />
					</div>
				</div>
			</div>
		)
	}
}

export default ModifyArea;