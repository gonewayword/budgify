import React from 'react';
var d3 = require('d3');

class Visualizer extends React.Component {
	render() {
		console.log(this.props.info);
		console.log(this.props.thisWeek);
		var margin = {top:60,right:60,bottom:60,left:60},
			padding = {top:60, right:60,bottom:60,left:60},
			width = 600, // - margin.right - margin.left,
			height = 600, // - margin.top - margin.bottom,
			radius = width/2;
		var color = d3.scaleOrdinal()
					.range(['#ffffff', '#ff8000', '#ffbf00', '#bfff00', '#00ffbf', '#00bfff']);
		var arc = d3.arc()
					.outerRadius(radius)
					.innerRadius(0);
		var labelArc = d3.arc()
					.outerRadius(radius - 50)
					.innerRadius(radius - 50);
		var pie = d3.pie()
					.sort(null)
					.value(function(e) { return e.spent });
		var svg = d3.select('#pie-chart').append('svg')
					.attr('width', width).attr('height',height)
					.append('g')
					.attr('transform', 'translate('+width/2+','+height/2+')');
		var expenses = JSON.parse(this.props.info.expenses);
		var catStorage;
		var catStorage = [];
		var catStorageObj = {};
		expenses.forEach(function(expense) {
			if(expense.category) {
				if(catStorageObj[expense.category]) {
					catStorageObj[expense.category].spent += Number(expense.cost);
				} else {
					catStorageObj[expense.category] = {
						name: expense.category,
						spent: Number(expense.cost)
					}
				}	
			}
		});
		for(let cat in catStorageObj) {
			catStorage.push(catStorageObj[cat]);
		}
		var g = svg.selectAll('.arc')
					.data(pie(catStorage))
					.enter().append('g')
					.attr('class', 'arc');
		g.append("path")
			.attr('d', arc)
			.style('fill', function(d) { return color(d.data.name)});
		g.append('text')
			.attr('transform', function(d) { return "translate(" + labelArc.centroid(d) + ")" })
			.attr('dy', ".35em")
			.text(function(d) { return d.data.name });
		return(
			<div id="pie-chart">
				
			</div>
		)
	}
}

export default Visualizer;