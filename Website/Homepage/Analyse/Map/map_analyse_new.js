// Base map
var osmLayer = new ol.layer.Tile({source: new ol.source.OSM()});


// Census map layer
var wmsLayer = new ol.layer.Image({
  source: new ol.source.ImageWMS({
    url: 'http://student.ifip.tuwien.ac.at/geoserver/wms',
    params: {'LAYERS': 'g07_2015:wien_normalized'}
  }),

  opacity: 0.6,
});


// Layer
var carsharing_layer = new ol.layer.Image({
  source: new ol.source.ImageWMS({
    url: 'http://student.ifip.tuwien.ac.at/geoserver/wms',
    params: {'LAYERS': 'g07_2015:carsharing'}
  }),
});

var haltestellen_layer = new ol.layer.Image({
  source: new ol.source.ImageWMS({
    url: 'http://student.ifip.tuwien.ac.at/geoserver/wms',
    params: {'LAYERS': 'g07_2015:oevhaltestellen'}
  }),
});

var garagen_layer = new ol.layer.Image({
  source: new ol.source.ImageWMS({
    url: 'http://student.ifip.tuwien.ac.at/geoserver/wms',
    params: {'LAYERS': 'g07_2015:park_u_ride_anlagen'}
  }),
});

var citybike_layer = new ol.layer.Image({
  source: new ol.source.ImageWMS({
    url: 'http://student.ifip.tuwien.ac.at/geoserver/wms',
    params: {'LAYERS': 'g07_2015:citybike'}
  }),
});

var realnutz_layer = new ol.layer.Image({
  source: new ol.source.ImageWMS({
    url: 'http://student.ifip.tuwien.ac.at/geoserver/wms',
    params: {'LAYERS': 'g07_2015:REALNUT2014OGDPolygon'}
  }),
});

var grenzen_layer = new ol.layer.Image({
  source: new ol.source.ImageWMS({
    url: 'http://student.ifip.tuwien.ac.at/geoserver/wms',
    params: {'LAYERS': 'g07_2015:bezirksgrenzen_wien'}
  }),
});


var comment = new ol.layer.Image({
  source: new ol.source.ImageWMS({
    url: 'http://student.ifip.tuwien.ac.at/geoserver/wms',
    params: {'LAYERS': 'g07_2015:comments_wien'}
  }),
});

var marker = new ol.Feature();
// Map object
var olMap = new ol.Map({
  target: 'map',
  //renderer: 'canvas',
  layers: [osmLayer,
          new ol.layer.Vector({
          zIndex: 9,
	      source: new ol.source.Vector({
		  features: [marker]
	}),

  style: new ol.style.Style ({
  image: new ol.style.Icon(({
      anchor: [0.5, 0.9],
      scale: 0.15,
      anchorXUnits: 'fraction',
      anchorYUnits: 'fraction',
      opacity: 0.75,
  src: 'http://student.ifip.tuwien.ac.at/geoweb/2015/g07/Ue5/map_marker_blue.png'
  }))
  })
  })
    ],
  view: new ol.View({
    center: ol.proj.transform([16.4, 48.2], 'EPSG:4326', 'EPSG:3857'),
    zoom: 10.6,
    maxZoom: 18
  })
});


//geolocation
function geolocate() {
  var geolocation = new ol.Geolocation({projection: 'EPSG:3857'});
  geolocation.setTracking(true); // here the browser may ask for confirmation
  geolocation.once('change:accuracyGeometry', function(evt) {
    geolocation.setTracking(false);
    olMap.getView().fit(geolocation.getAccuracyGeometry(), olMap.getSize(), { nearest: true, maxZoom: 16 });
    marker.setGeometry(new ol.geom.Point(olMap.getView().getCenter()));
    console.log("Accuracy of Geometry: " + geolocation.getAccuracy() + " meters");

  });
}


// Load variables into dropdown
$.get(function(response) {
  // We start at line 3 - line 1 is column names, line 2 is not a variable
  $(response.split('\n').splice(2)).each(function(index, line) {
    $('#topics').append($('<option>')
      .val(line.substr(0, 20).trim())
      .html(line.substr(20, 105).trim()));
  });
});
// Add behaviour to dropdown
$('#topics').change(function() {
  wmsLayer.getSource().updateParams({
    'viewparams': 'column:' + $('#topics>option:selected').val()
  });
});

$('#topics').change(function() {
       var selected_index = document.getElementById('topics').selectedIndex;
       console.log(selected_index);
       if(selected_index== -1 || selected_index == 0){
       	olMap.removeLayer(wmsLayer);
       } else {
       	olMap.removeLayer(wmsLayer);
       	olMap.addLayer(wmsLayer);
       }
       });



// Create an ol.Overlay with a popup anchored to the map
var popup = new ol.Overlay({
  element: $('#popup')
});
olMap.addOverlay(popup);

// Handle map clicks to send a GetFeatureInfo request and open the popup
olMap.on('singleclick', function(evt) {
  var view = olMap.getView();
  var url = wmsLayer.getSource().getGetFeatureInfoUrl(evt.coordinate,
      view.getResolution(), view.getProjection(), {'INFO_FORMAT': 'text/html'});
  popup.setPosition(evt.coordinate);
  $('#popup-content iframe').attr('src', url);
  $('#popup')
    .popover({content: function() { return $('#popup-content').html(); }})
    .popover('show');
  // Close popup when user clicks on the 'x'
  $('.popover-title').click(function() {
    $('#popup').popover('hide');
  });
  $('.popover form')[0].onsubmit = function(e) {
  var feature = new ol.Feature();
  feature.setGeometryName('geom');
  feature.setGeometry(new ol.geom.Point(evt.coordinate));
  feature.set('comment', this.comment.value);
  var xml = new ol.format.WFS().writeTransaction([feature], null, null, {
    featureType: 'comment', featureNS: 'http://g07/2015',
    gmlOptions: {srsName: 'EPSG:3857'}
  });
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://student.ifip.tuwien.ac.at/geoserver/wfs', true);
  xhr.onload = function() {
    alert('Thanks for your comment.');
    wmsLayer.getSource().updateParams({'_time':Date.now()});
    $('#popup').popover('hide');

  };
  xhr.send(new XMLSerializer().serializeToString(xml));
  e.preventDefault();
};
});

// Submit query to Nominatim and zoom map to the result's extent
var form = document.getElementById('navform');
form.onsubmit = function(evt) {
  var url = 'http://nominatim.openstreetmap.org/search?format=json&q=';
  url += form.query.value;
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onload = function() {
    var result = JSON.parse(xhr.responseText);
    if (result.length > 0) {
      var bbox = result[0].boundingbox;
      olMap.getView().fit(ol.proj.transformExtent([parseFloat(bbox[2]),
          parseFloat(bbox[0]), parseFloat(bbox[3]), parseFloat(bbox[1])],
          'EPSG:4326', 'EPSG:3857'), olMap.getSize());
          marker.setGeometry(new ol.geom.Point(olMap.getView().getCenter()));
    }
  };
  xhr.send();
  evt.preventDefault();
};


// Integration der Checkbox-FunktionalitÃ¤ten
document.getElementById('carsharing_checkbox').onclick = function(e){
  if(this.checked == true)
  {
    olMap.addLayer(carsharing_layer);
    console.log("Added Carsharing");
  }
  else
  {
    olMap.removeLayer(carsharing_layer);
    console.log("Removed Carsharing");
  }
};

document.getElementById('haltestellen_checkbox').onclick = function(e){
  if(this.checked == true)
  {
    olMap.addLayer(haltestellen_layer);
    console.log("Added Haltestellen");
  }
  else
  {
    olMap.removeLayer(haltestellen_layer);
    console.log("Removed Haltestellen");
  }
};

document.getElementById('garagen_checkbox').onclick = function(e){
  if(this.checked == true)
  {
    olMap.addLayer(garagen_layer);
    console.log("Added Garagen");
  }
  else
  {
    olMap.removeLayer(garagen_layer);
    console.log("Removed Garagen");
  }
};

document.getElementById('citybike_checkbox').onclick = function(e){
  if(this.checked == true)
  {
    olMap.addLayer(citybike_layer);
    console.log("Added Citybike Anlagen");
  }
  else
  {
    olMap.removeLayer(citybike_layer);
    console.log("Removed Citybike Anlagen");
  }
};

document.getElementById('realnutz_checkbox').onclick = function(e){
  if(this.checked == true)
  {
    olMap.addLayer(realnutz_layer);
    console.log("Added Realnutzung");
  }
  else
  {
    olMap.removeLayer(realnutz_layer);
    console.log("Removed Realnutzung");
  }
};

document.getElementById('grenzen_checkbox').onclick = function(e){
  if(this.checked == true)
  {
    olMap.addLayer(grenzen_layer);
    console.log("Added Bezirksgrenzen");
  }
  else
  {
    olMap.removeLayer(grenzen_layer);
    console.log("Removed Bezirksgrenzen");
  }
};

document.getElementById('comment').onclick = function(e){
  if(this.checked == true)
  {
    olMap.addLayer(comment);
    console.log("Added Kommentare");
  }
  else
  {
    olMap.removeLayer(comment);
    console.log("Removed Kommentare");
  }
};
