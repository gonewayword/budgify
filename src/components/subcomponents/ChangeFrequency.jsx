import React from 'react';

class ChangeFrequency extends React.Component {
	changeFrequency() {	
		var newFrequency = document.getElementById('frequency-selector').value;
		this.setState({'frequency' : newFrequency});
		localStorage.setItem('budgifyFrequency', newFrequency);
		//Now you have to do all the things that come with this. Like change the timer budget accrual
	}
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
				<button onClick={this.changeFrequency}>Change Frequency</button>
			</div>
		)
	}
}

export default ChangeFrequency;