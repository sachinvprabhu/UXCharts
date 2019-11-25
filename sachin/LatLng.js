sap.ui.define(
	["sap/ui/core/Element"],
	function (Element) {
		"use strict";
		var MapPoint = Element.extend("dev.sachin.LatLng", {
			metadata: {
				library: "sap.ui.unified",
				properties: {
					latitude: {
						type: "float",
						group: "Data",
						defaultValue: 0.0
					},
					longitude: {
						type: "float",
						group: "Data",
						defaultValue: 0.0
					}
				}
			}
		});
		MapPoint.prototype.init = function(){
			this.latLng = new window.google.maps.LatLng(this.getLatitude(),this.getLongitude());
		};
		MapPoint.prototype.getLatLng = function(){
			return this.latLng;
		};
		return MapPoint;
	}
);