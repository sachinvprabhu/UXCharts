sap.ui.define(
	['sap/ui/core/Control',"./BoundingBoxValueType"],
	function (Control) {
		return Control.extend(".BoundingBox", {
			metadata: {
				events: {
					press: {},
					hover:{}
				},
				properties: {
					x1: {
						type: "float"
					},
					y1: {
						type: "float"
					},
					x2: {
						type: "float"
					},
					y2: {
						type: "float"
					},
					color: {
						type: "sap.ui.core.CSSColor",
						defaultValue: "Red"
					},
					tooltip: {
						type: "string"
					},
					thickness :{
						type: "sap.ui.core.CSSSize",
						defaultValue: "1px"
					},
					valueType:{
						type:"com.wipro.Planogram.custom.BoundingBoxValueType",
						defaultValue : "px"
					}
				}
			},
			renderer: function (oRm, oControl) {
				oRm.write("<rect x='" + oControl.getX1() + oControl.getValueType() + "' y='" + oControl.getY1() + oControl.getValueType() + "' width='" + (oControl.getX2() - oControl.getX1()) + oControl.getValueType() +
					"' height='" + (oControl.getY2()-oControl.getY1()) + oControl.getValueType() +
					"' style=\"fill:transparent;stroke-width:"+oControl.getThickness()+";stroke:" + oControl.getColor() + "\"");
				oRm.writeControlData(oControl);
				oRm.writeClasses(oControl);
				oRm.write(">");
				if(oControl.getTooltip()){
					oRm.write("<title>"+oControl.getTooltip()+"</title>");
				}
				oRm.write("</rect>");
			},
			onAfterRendering: function () {

			},
			onclick: function (e) {
				e.stopPropagation();
				e.preventDefault();
				this.firePress();
			},
			onmouseover:function(event){
				event.stopPropagation();
				event.preventDefault();
				this.fireHover();
			}
		});
	}
);