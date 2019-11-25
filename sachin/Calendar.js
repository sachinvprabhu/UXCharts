sap.ui.define(
	["sap/ui/core/Control",
	"sap/base/Log",
	"./moment"],
	function (Control,Log,Moment) {
		var Calendar = Control.extend("dev.sachin.Calendar", {
			metadata: {
				properties: {
				},
				"aggregations":{
					"vectors": {
						"type": "dev.sachin.DateVector",
						"multiple": true,
						"singularName":"vector"
					}
				},
				events : {
					dateSelected : {}
				}
			},
			onAfterRendering : function(){
				var that = this;
				$("#"+this.getId()+" .nextButton").click(function(){
					this.firstDayOfMonth.add(1,"month");
					this.rerender();
				}.bind(this));
				$("#"+this.getId()+" .previousButton").click(function(){
					this.firstDayOfMonth.subtract(1,"month");
					this.rerender();
				}.bind(this))
				$("#"+this.getId()+" .calendarDate").click(function(event){
					var selectedDate = that.firstDayOfMonth.toDate();
					selectedDate.setDate(parseInt(jQuery.text(this)),10);
					
					
					var vectors = that.getAggregation("vectors");
					if(vectors && vectors.length){
						vectors = vectors.filter(function(vector){
							return vector.getDate().getDate() === selectedDate.getDate() && vector.getDate().getMonth() === selectedDate.getMonth() && vector.getDate().getYear() === selectedDate.getYear();
						});
					}
					
					that.fireDateSelected({
						selectedDate : selectedDate,
						selectedVectors : vectors
					});
				});
			},
			init: function() {
                //initialisation code, in this case, ensure css is imported
                var libraryPath = jQuery.sap.getModulePath("dev.sachin"); //get the server location of the ui library
                jQuery.sap.includeStyleSheet(libraryPath + "/css/Calendar.css"); //specify the css path relative from the ui folder
            },
			renderer: function (oRm, oControl) {
				if(!oControl.firstDayOfMonth){
					oControl.firstDayOfMonth = moment().startOf('month');
				}
				var weekDays = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
				oRm.write("<div class='sachinCalendar' ");
				oRm.writeControlData(oControl); //ui5 trackings data, outputs sId, absolutely mandatory
				oRm.writeClasses(oControl); //allows the class="" attribute to work correctly
				oRm.write(">");
				oRm.write("<table>");
				oRm.write("<tr>");
					oRm.write("<td><button class='previousButton'>❮</button></td>");
					oRm.write("<td colspan='5' class='monthYear' align='center' >"+oControl.firstDayOfMonth.format("MMMM") +" "+oControl.firstDayOfMonth.format("YYYY")+"</td>");
					oRm.write("<td align='right'><button class='nextButton'>❯</button></td>");
				oRm.write("</tr>");
				
				
				oControl.firstDayOfMonth.daysInMonth();
				oRm.write("<tr>");
				var j = 0;
				for(var i = 0; i < oControl.firstDayOfMonth.day(); i++){
					oRm.write("<td>&nbsp;</td>");
					j++;
				}
				
				var vectors = oControl.getAggregation("vectors");
				var dates = [];
				var values = [];
				if(vectors && vectors.length){
					vectors = vectors.filter(function(vector){
						return vector.getDate().getMonth() === oControl.firstDayOfMonth.month() && 
						vector.getDate().getFullYear() === oControl.firstDayOfMonth.year();
					});
					dates = vectors.map(function(vector){
						return vector.getDate().getDate();
					});
					values = vectors.map(function(vector){
						return vector.getValue();
					});
					var minValue = values.reduce(function(memo,val){if(memo < val){return memo} else {return val}},values[0]);
					var maxValue = values.reduce(function(memo,val){if(memo > val){return memo} else {return val}},values[0]);
				}
				
				
				for(var i = 1; i <= oControl.firstDayOfMonth.daysInMonth(); i++){
					if(j%7 === 0){
						oRm.write("</tr><tr>");
					}
					oRm.write("<td class='calendarDate' align='center'>");
					if(dates.indexOf(i) >= 0 ){
						var width = (values[dates.indexOf(i)] - minValue)/(maxValue-minValue)*4 + 1;
						oRm.write("<i class='highlighter' title='"+values[dates.indexOf(i)]+"' style='width:"+width+"rem;height:"+width+"rem;left:"+((3-width)/2)+"rem;animation-duration:"+(500+dates.indexOf(i)*100)+"ms'></i>");
					}
					oRm.write((i)+"</td>");
					j++;
				}
				oRm.write("</tr>");
				oRm.write("<tr class='weekDays'>");
				weekDays.forEach(function(i){
					oRm.write("<td align='center'>"+i+"</td>");
				});
				oRm.write("</tr>");
				
				oRm.write("</table>");
				oRm.write("</div>");
			}
		});
		return Calendar;
	}
);