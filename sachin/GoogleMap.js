sap.ui.define(
	["sap/ui/core/Control",
	"sap/base/Log"],
	function (Control,Log) {
		/*
			var fileref = $("<script>");
			fileref.attr("type", "text/javascript");
			fileref.attr("src", "https://" +
				"maps.googleapis.com/maps/api/js?key=AIzaSyA1uxqsy0qTkn6CyU4eAtjS-MDW7axkfWY&libraries=visualization,places");
			$("head").append(fileref);
		*/
		var GoogleMap = Control.extend("dev.sachin.GoogleMap", {
			metadata: {
				properties: {
					height: {
						type: "sap.ui.core.CSSSize", //this is optional, but it helps prevent errors in your code by enforcing a type
						defaultValue: "100%" //this is also optional, but recommended, as it prevents your properties being null
					},
					width: {
						type: "sap.ui.core.CSSSize", //this is optional, but it helps prevent errors in your code by enforcing a type
						defaultValue: "100%" //this is also optional, but recommended, as it prevents your properties being null
					},
					zoom: {
						type: "int",
						"defaultValue": 7
					},
					styles: {
						type: "object"
					},
					visualStyle: {
						type: "object"
					}
				},
				"aggregations": {
					"center": {
						"type": "dev.sachin.LatLng",
						"multiple": false
					},
					"boxes": {
						"type": ".BoundingBox",
						"multiple": true,
						"singularName": "box"
					}
				}
			},
			renderer: function (oRm, oControl) {
				if(oControl.__gmap){ // map is already rendered
					oRm.cleanupControlWithoutRendering(oControl);
				}
				oRm.write("<div style='position:relative;width:" + oControl.getWidth() + ";height:" + oControl.getHeight() + ";'");
				oRm.writeControlData(oControl); //ui5 trackings data, outputs sId, absolutely mandatory
				oRm.writeClasses(oControl); //allows the class="" attribute to work correctly
				oRm.write(">");
				
				
			},
			onAfterRendering: function () {
				if(this.__gmap){ // map is already rendered
					return;
				}
				var mapContainer = $("#" + this.getId())[0];
				this.setBusy(true);
				jQuery.sap.delayedCall(100, this, function () {
					this.setBusy(false);
					if (window.google && window.google.maps) {
						if (this.getCenter() && this.getCenter().getLatLng()) {
							this.__gmap = new window.google.maps.Map(mapContainer, {
								center: this.getCenter().getLatLng(),
								styles: this.getVisualStyle(),
								zoom: this.getZoom()
							});
							this.mapRendered();
						} else {
							Log.error("Aggregation Center of type MapPoint is required for rendering Google Map");
						}
					} else {
						$(mapContainer).html(
							"<center style=\"margin: auto;padding-top: 10\">Unable to load map<br>Please check internet access to https://" +
							"maps.googleapis.com<center>"
						);
					}
				});
			}
		});
		GoogleMap.prototype.mapRendered = function () {
			var that = this;
			this.__gmap.addListener("center_changed",function(e){
				var mapPoint = that.getCenter();
				
				mapPoint.setPoint(this.getCenter());
			});
		};
		GoogleMap.prototype.setZoom = function (zoom) {
			this.setProperty("zoom", zoom, true);
			if (this.__gmap) {
				this.__gmap.setZoom(zoom);
			}
		};
		GoogleMap.prototype.setCenter = function (center) {
			this.setAggregation("center", center, true);
			if (this.__gmap) {
				this.__gmap.panTo(center.getLatLng());
			}
		};
		GoogleMap.prototype.setVisualStyle = function (json) {
			if (this.__gmap) {
				Log.warning("Map already rendered, Style cannot be applied now");
			} else {
				this.setProperty("visualStyle", json.styles, true);
			}
			return this;
		};
		return GoogleMap;
	}
);