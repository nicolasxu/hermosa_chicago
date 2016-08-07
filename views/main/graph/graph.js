
var $ = require('jquery');
var d3 = require('d3');
var graphTpl = require('./graph.html');
var data = require('../../../api/cache.js');
/* graph data will be formated in 
	- data.commGraphData
	- data.residGraphData
	when app is loaded. 
*/

function graph () {

	/*** private member variables ***/

	// colors for 9 different shades for each month in a year
	var colors = ["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"];
	// text for horizental labels
	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

	// canvas size variables
	var margin = { top: 50, right: 0, bottom: 100, left: 30 };
	var width = width = 960 - margin.left - margin.right;
	var height = height = 430 - margin.top - margin.bottom;

	// side width for each box whose color represent the each data in data array
	var boxWidth = Math.floor(width / months.length); // px

	/*** private methods ***/

	// Method for rendering template where svg can be attached, not for drawing svg
	function render() {
		return graphTpl;
	}

	// Method for creating svg->g element
	function createCanvas(selector, data) {
		var canvasHeight = boxWidth * (data.length / months.length);
		// create canvas based on id selector, return a reference to g element
		var svg = d3.select(selector)
	    .append("div")
	    .classed('svg-container', true)
	    .append("svg")
	    .attr("preserveAspectRatio", "xMinYMin meet")
	    .attr("viewBox", "0 0 "+ (width+ 2*boxWidth) +" " + (canvasHeight + 2*boxWidth)) // min-x, min-y, width and height
	    .classed("svg-content-responsive", true)
	    .append("g")
	    .attr("transform", "translate(" + boxWidth* 1.5 + "," + boxWidth + ")");

	   return svg; // a 'g' element
	}
	// Method for draw horizontal labels
	function drawHorizontalLabel(svg, data) {
		var timeLabels = svg.selectAll('.timeLabel')
		  .data(months)
		  .enter().append('text')
		    .text(function(d) {
		      return d;
		    }) // below calculate position
		    .attr('x', function (d, i) { return i * boxWidth})
		    .attr('y', function (d, i) {return 0;})
		    .style("text-anchor", "middle")
		    .attr("transform", "translate(" + boxWidth / 2 + ", -6)")
		    .attr("class", function(d, i) { return ((i >= 7 && i <= 16) ? "timeLabel mono axis axis-worktime" : "timeLabel mono axis"); });
	}
	// Method for drawing vertical labels
	function drawVerticalLable(svg, data) {
		var categoryLineCount = data.length / months.length; // should be an integer
		var categoryData = [];
		for(var i = 0 ;i < categoryLineCount; i++) {
		  categoryData.push(0); 
		  // it doesn't matter what the data really is, just alternate between 'kwh' and 'therm'
		}
		var categoryLabel = svg.selectAll('.dayLabel')
		  .data(categoryData)
		  .enter()
		  .append('text')
		    .text(function(d, i){
		      return i % 2 === 0? 'kwh': 'therm';
		    })
		    .attr('x', 0)
		    .attr('y', function (d, i){
		      return i * boxWidth;
		    })
		    .style('text-anchor', 'end')
		    .attr('transform', 'translate(-6,'+ boxWidth / 1.5 + ')')
		    .attr("class", function (d, i) { return ((i >= 0 && i <= 4) ? "dayLabel mono axis axis-workweek" : "dayLabel mono axis"); });
	}
	// Method for draw heatmap boxes
	function drawHeatMap(svg, data) {
		var length = months.length; // 12 month
		var colorScale;

		var cards = svg.selectAll('.hour')
		  .data(data);

		cards.enter().append('rect')
		  .attr('x', function(d, i) { 
		      return (i % length) * boxWidth;
		   })
		  .attr('y', function(d, i){
		    return Math.floor(i / length) * boxWidth; // 0 ~ 11 -> 0, 12 ~ 23, ....
		  })
		  .attr("rx", 4)
		  .attr("ry", 4)
		  .attr("class", "hour bordered")
		  .attr("width", boxWidth)
		  .attr("height", boxWidth)
	    .style("fill", function(d, i) {
	    
	      if (i % length === 0) {
	        // create new scale for every year
	        var yearData = data.slice(i, i + length);
	        colorScale = d3.scaleQuantile()
	        .domain([d3.min(yearData), d3.max (yearData)])
	        .range(colors);
	      }
	      return colorScale(d); 
	    });

		cards.select("title").text(function(d) { return d.value; });

		cards.exit().remove();
	}
	// Method for draw 2 whole svgs for residentials and commercials
	function drawSvg() {
		// selector can be #residential, or #commercial which should be in graph.html
		var dataSources = [{selector: '#commercial', data: data.commGraphData}, 
			{selector: '#residential', data: data.residGraphData}];

		dataSources.forEach(function(item) {
			var canvas = createCanvas(item.selector, item.data);
			drawHorizontalLabel(canvas);
			drawVerticalLable(canvas, item.data);
			drawHeatMap(canvas, item.data);
		});
	}

	/*** public methods ***/

	return {
		/* parent view should 
			1) first call render to attach the template, which contains the id tag for svg to attach.
			2) then call drawSvg to draw and attach svg to DOM, since d3js can only select element in DOM.
		*/
		render: render,
		drawSvg: drawSvg
	}
}

module.exports = graph();