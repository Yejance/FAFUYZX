         require([
            "esri/Map",
            "esri/views/MapView",
            "esri/layers/FeatureLayer",
            "esri/layers/TileLayer",
            "esri/widgets/Legend",
            "esri/widgets/ScaleBar",
        ], function (Map, MapView, FeatureLayer, TileLayer, Legend, ScaleBar) {
            var template = {
                // autocasts as new PopupTemplate()
                title: "{NAME} ",
                content: [
                    {
                        // It is also possible to set the fieldInfos outside of the content
                        // directly in the popupTemplate. If no fieldInfos is specifically set
                        // in the content, it defaults to whatever may be set within the popupTemplate.
                        type: "fields",

                    }
                ]
            };
            var flayer = new FeatureLayer({
                url: "http://www.arcgisonline.cn/server/rest/services/Hosted/2%E7%A6%8F%E5%BB%BA%E7%9C%81%E8%AE%BE%E5%8C%BA%E5%B8%82%E5%9F%8E%E9%95%87%E5%B1%85%E6%B0%91%E4%BA%BA%E5%9D%87%E7%94%9F%E6%B4%BB%E6%B6%88%E8%B4%B9%E6%94%AF%E5%87%BA%EF%BC%882018%E5%B9%B4%EF%BC%89/FeatureServer",
                popupTemplate: template
            });
            var layer = new TileLayer({
            	url: "http://tiles.arcgis.com/tiles/3VZsTPsaF6yfc9s5/arcgis/rest/services/china_gdp/MapServer",
            	popupTemplate: template
            });


            var map1 = new Map({
                basemap: "dark-gray-vector",
                layers: [flayer,layer]
            });

            var view1 = new MapView({
                container: "viewDiv",
                map: map1,
                zoom: 3,
                center: [103, 37] // longitude, latitude
            });


            var legend1 = new Legend({
                view: view1,
                layerInfos: [
                    {
                        layer: layer,
                        title: "重庆公交线路图例"
                    }
                ]
            });

            //view1.ui.add(legend1, "bottom-right");

            var scaleBar1 = new ScaleBar({
                view: view1,
                style: "ruler",
                unit: "non-metric"
            });

            view1.ui.add(scaleBar1, {
                position: "bottom-left"
            });

            var coordsWidget = document.createElement("div");
            coordsWidget.id = "coordsWidget";
            coordsWidget.className = "esri-widget esri-component";
            coordsWidget.style.padding = "7px 15px 5px";

            view1.ui.add(coordsWidget, "bottom-right");
            function showCoordinates(pt) {
                var coords =
                    "Lat/Lon " +
                    pt.latitude.toFixed(3) +
                    " " +
                    pt.longitude.toFixed(3) +
                    " | Scale 1:" +
                    Math.round(view1.scale * 1) / 1 +
                    " | Zoom " +
                    view1.zoom;
                coordsWidget.innerHTML = coords;
            }
            view1.watch("stationary", function (isStationary) {
                showCoordinates(view1.center);
            });

            view1.on("pointer-move", function (evt) {
                showCoordinates(view1.toMap({ x: evt.x, y: evt.y }));
            });
        });