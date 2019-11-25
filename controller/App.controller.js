sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
	"use strict";

	return Controller.extend("com.wipro.gmap.GoogleMap.controller.App", {
		dateSelected:function(oEvent){
			console.log(oEvent.getParameters());
		},
		onInit: function () {
			this.getView().setModel(new JSONModel({
				calendarData:new Array(28).fill(1).map(function(d,i){
					var date = new Date();
					date.setDate(i+1);
					return {
						date : date,
						val : Math.random()*100
					};
				})
			}));
		},
		onAfterRendering:function(){
			
			var margin = { top: 50, right: 50, bottom: 50, left: 50 };
            var width = Math.min(500,$(this.byId("radialChart").getDomRef()).width()) - margin.left - margin.right;
			var height = width;
			$(this.byId("radialChart").getDomRef()).css("text-align","center");

			var data = [
                new Array(24).fill(1).map((x, y) => {
                    return { axis: y, value: Math.random() * 35 + 65 };
                }), new Array(24).fill(1).map((x, y) => {
                    return { axis: y, value: Math.random() * 35 + 65 };
                })
            ];
            var color = d3.scale.ordinal()
                .range(["#6cd1eb","#f5ad5b"]);

            var radarChartOptions = {
                w: width,
                h: height,
                margin: margin,
                maxValue: 0.5,
                levels: 5,
                roundStrokes: true,
                color: color
            };
            //Call function to draw the Radar chart
			RadarChart("#"+this.byId("radialChart").getId(), data, radarChartOptions);
			
			var canvas = $("<canvas>")[0];
			canvas.width = $(this.byId("multiChart").getDomRef()).width();
			canvas.height = 300;
			$(this.byId("multiChart").getDomRef()).append(canvas)
			
			var chart = new Chart(canvas.getContext('2d'), {

				type: 'line',
				data: {
					labels: new Array(12).fill(1).map((x, y) => {
						return (y % 11 == 0 ? "21:" : ":") + (y * 5).toLocaleString('en', { minimumIntegerDigits: 2 })
					}),
					datasets: [{
						label: 'D1',
						backgroundColor: "#3db6f5",
						pointRadius: 0,
						borderColor: "#3db6f5",
						data: new Array(12).fill(1).map(x => Math.random() * 15 + 35),
						fill: false,
					},{
						label: 'D2',
						backgroundColor: "#e866e2",
						pointRadius: 0,
						borderColor: "#e866e2",
						data: new Array(12).fill(1).map(x => Math.random() * 15 + 10),
						fill: false,
					},{
						label: 'D3',
						backgroundColor: "#b184dc",
						pointRadius: 0,
						borderColor: "#b184dc",
						data: new Array(12).fill(1).map(x => Math.random() * 5 + 10),
						fill: false,
					}, {
						label: 'D0',
						barPercentage: 1,
						categoryPercentage: 1,
						type: 'bar',
						backgroundColor: "#f5dddd",
						data: new Array(12).fill(1).map(x => Math.random() * 35 + 15),
					}]
				},
				options: {
					legend: {
						display: false
					},
					responsive: false,
					title: {
						display: false
					},
					tooltips: {
						mode: 'index',
						intersect: true,
					},
					hover: {
						mode: 'nearest',
						intersect: true
					},
					scales: {
						xAxes: [{
							gridLines: {
								display: false
							},
							display: true,
							scaleLabel: {
								display: false
							},
							ticks: {
								gridLines: {
									color: "rgba(0, 0, 0, 0)",
								}
							}
						}],
						yAxes: [{
							gridLines: {
								display: false
							},
							display: true,
							scaleLabel: {
								display: false
							},
							ticks: {
								beginAtZero: true,
								suggestedMax: 60
							}
						}]
					}
				}
			});
			

		}
	});
});