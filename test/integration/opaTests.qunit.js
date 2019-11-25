/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"com/wipro/gmap/GoogleMap/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});