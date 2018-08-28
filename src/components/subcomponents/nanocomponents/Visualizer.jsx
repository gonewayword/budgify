import React from 'react';
var d3 = require('d3');

class Visualizer extends React.Component {
	render() {
		// var margin = {top:60,right:60,bottom:60,left:60},
			// padding = {top:60, right:60,bottom:60,left:60},
		var width = 600, // - margin.right - margin.left,
			height = 600, // - margin.top - margin.bottom,
			radius = width/2 - 50;
		var color = d3.scaleOrdinal()
					.range([
						'#41837E',
						'#7788AA',
						'#4E648E',
						'#2D4471',
						'#152B55',
						'#3F3075',
						'#251758',
						'#236863'
						]);
		var arc = d3.arc()
					.outerRadius(radius)
					.innerRadius(radius - 50);
		var labelArc = d3.arc()
					.outerRadius(radius - 50)
					.innerRadius(radius - 120);
		var pie = d3.pie()
					.sort(null)
					.value(function(e) { return e.spent });
		var svg = d3.select('#pie-chart').html('')
					.append('svg')
					.attr('width', width).attr('height',height)
					.append('g')
					.attr('transform', 'translate('+width/2+','+height/2+')');
		var expenses = JSON.parse(this.props.info.expenses);
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
			.style('fill', function(d) { return color(d.data.name)})
			.transition()
			.ease(d3.easeLinear)
			.duration(2000)
			.attrTween('d', pieTween);
		g.append('text')
			.attr('transform', function(d) { return "translate(" + labelArc.centroid(d) + ")" })
			.attr('dy', ".35em")
			.text(function(d) { return d.data.name });
		function pieTween(b) {
			b.innerRadius = 0;
			var i = d3.interpolate({startAngle: 0, endAngle: 0}, b);
			return function(t) { return arc(i(t)); };
		}
		return(
			<div id="pie-chart">
				
			</div>
		)
	}
}

export default Visualizer;