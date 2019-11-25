sap.ui.define(
	["sap/ui/core/Element"],
	function (Element) {
		"use strict";
		var DateVector = Element.extend("dev.sachin.DateVector", {
			metadata: {
				library: "sap.ui.unified",
				properties: {
					date: {
						type: "object",
						group: "Data",
						defaultValue: new Date()
					},
					value: {
						type: "float",
						group: "Data",
						defaultValue: 0.0
					}
				}
			}
		});
		return DateVector;
	}
);