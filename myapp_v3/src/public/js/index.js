function initMap(){

  var markerStore = {};

  var Interval = 20000;
  // Map option

  var options = {
    center: {lat: 41.3851 , lng:2.1734 },
    zoom: 10,
    gestureHandling: 'greedy'
  }
//New Map
map = new google.maps.Map(document.getElementById("map"),options);
  getCoordinates();

  async function getCoordinates(){
    // const res = await fetch('/get_gps');
    // const data = await res.json();
    
    // const gpss = data.data.map(gps => {
    //   console.log(gps.id);
    // });
  $.get('/get_gps', {} , function(res , resp){
    //console.log(res);
    for (var i = 0 , len= res.length ; i < len; i++){

      if (markerStore.hasOwnProperty(res[i].id)){
        markerStore[res[i].id].setPosition(new google.maps.LatLng(res[i].lat , res[i].lon));
      }
      else{
      var marker = new google.maps.Marker({
        position:new google.maps.LatLng(res[i].lat , res[i].lon),
        map:map,

        });
        markerStore[res[i].id] = marker;
    } 
    marker.addListener('click',() =>{
      show_heatmap();
    })
  }
  window.setTimeout(getCoordinates, Interval);
  }, "json"); 
  }
  
  //Add Markers to Array

  // let MarkerArray = [ {location:{lat: 41.1189, lng: 1.2445},
  //     content: `<h2>Tarragona</h2>`},

  //     {location:{lat: 41.9794, lng: 2.8214}, content: `<h2>Girona</h2>`},

  //     {location:{lat: 41.3851, lng: 2.1734},content: `<h2>Barcelona</h2>` }]

  // // loop through marker
  // for (let i = 0; i < MarkerArray.length; i++){
  //     addMarker(MarkerArray[i]);

  // }

  // Add Marker
/*
  function addMarker(property){

      const marker = new google.maps.Marker({
          position:property.location,
          map:map,

          });

          // Check for custom Icon


          if(property.content){
            const detailWindow = new google.maps.InfoWindow({
            content: property.content
          });

            marker.addListener("mouseover", () =>{
                detailWindow.open(map, marker);
            })
            marker.addListener('mouseout',() =>{
              detailWindow.close();
            })
          }

  }*/

}
function show_heatmap(){
  let map, heatmap;
initMap();
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 13,
    center: { lat: 37.775, lng: -122.434 },
    mapTypeId: "satellite",
  });
  heatmap = new google.maps.visualization.HeatmapLayer({
    data: getPoints(),
    map: map,
  });
}
// Heatmap data: 500 Points
function getPoints() {
  // $.get('/get_gps', {} , function(res , resp){
  //   for (var i = 0 , len= res.length ; i < len; i++){
         // vector
  //   }
  // },"json");
  // return Vec_gps;
  return [
    new google.maps.LatLng(37.782551, -122.445368),
    new google.maps.LatLng(37.782745, -122.444586),
    new google.maps.LatLng(37.782842, -122.443688),
    new google.maps.LatLng(37.782919, -122.442815),
    new google.maps.LatLng(37.782992, -122.442112),
    new google.maps.LatLng(37.7831, -122.441461),
    new google.maps.LatLng(37.783206, -122.440829),
    new google.maps.LatLng(37.783273, -122.440324),
    new google.maps.LatLng(37.783316, -122.440023),
    new google.maps.LatLng(37.783357, -122.439794),
    new google.maps.LatLng(37.783371, -122.439687),
    new google.maps.LatLng(37.783368, -122.439666),
    new google.maps.LatLng(37.783383, -122.439594),
    new google.maps.LatLng(37.783508, -122.439525),
    new google.maps.LatLng(37.783842, -122.439591),
    new google.maps.LatLng(37.784147, -122.439668),
    new google.maps.LatLng(37.784206, -122.439686),
    new google.maps.LatLng(37.784386, -122.43979),
    new google.maps.LatLng(37.784701, -122.439902),
    new google.maps.LatLng(37.784965, -122.439938),
    new google.maps.LatLng(37.78501, -122.439947),
    new google.maps.LatLng(37.78536, -122.439952),
    new google.maps.LatLng(37.785715, -122.44003),
    new google.maps.LatLng(37.786117, -122.440119),
    new google.maps.LatLng(37.786564, -122.440209),
    new google.maps.LatLng(37.786905, -122.44027),
    new google.maps.LatLng(37.786956, -122.440279),
    new google.maps.LatLng(37.800224, -122.43352),
    new google.maps.LatLng(37.800155, -122.434101),
    new google.maps.LatLng(37.80016, -122.43443),
    new google.maps.LatLng(37.800378, -122.434527),
    new google.maps.LatLng(37.800738, -122.434598),
    new google.maps.LatLng(37.800938, -122.43465),
    new google.maps.LatLng(37.801024, -122.434889),
    new google.maps.LatLng(37.800955, -122.435392),
    new google.maps.LatLng(37.800886, -122.435959),
    new google.maps.LatLng(37.800811, -122.436275),
    new google.maps.LatLng(37.800788, -122.436299),
    new google.maps.LatLng(37.800719, -122.436302),
    new google.maps.LatLng(37.800702, -122.436298),
    new google.maps.LatLng(37.800661, -122.436273),
    new google.maps.LatLng(37.800395, -122.436172),
    new google.maps.LatLng(37.800228, -122.436116),
    new google.maps.LatLng(37.800169, -122.43613),
    new google.maps.LatLng(37.800066, -122.436167),
    new google.maps.LatLng(37.784345, -122.422922),
    new google.maps.LatLng(37.784389, -122.422926),
    new google.maps.LatLng(37.784437, -122.422924),
    new google.maps.LatLng(37.784746, -122.422818),
    new google.maps.LatLng(37.785436, -122.422959),
    new google.maps.LatLng(37.78612, -122.423112),
    new google.maps.LatLng(37.786433, -122.423029),
    new google.maps.LatLng(37.786631, -122.421213),
    new google.maps.LatLng(37.78666, -122.421033),
    new google.maps.LatLng(37.786801, -122.420141),
    new google.maps.LatLng(37.786823, -122.420034),
    new google.maps.LatLng(37.786831, -122.419916),
    new google.maps.LatLng(37.787034, -122.418208),
    new google.maps.LatLng(37.787056, -122.418034),
    new google.maps.LatLng(37.787169, -122.417145),
    new google.maps.LatLng(37.787217, -122.416715),
    new google.maps.LatLng(37.786144, -122.416403),
    new google.maps.LatLng(37.785292, -122.416257),
    new google.maps.LatLng(37.780666, -122.390374),
    new google.maps.LatLng(37.780501, -122.391281),
    new google.maps.LatLng(37.780148, -122.392052),
    new google.maps.LatLng(37.780173, -122.391148),
    new google.maps.LatLng(37.780693, -122.390592),
    new google.maps.LatLng(37.781261, -122.391142),
    new google.maps.LatLng(37.781808, -122.39173),
    new google.maps.LatLng(37.78234, -122.392341),
    new google.maps.LatLng(37.782812, -122.393022),
    new google.maps.LatLng(37.7833, -122.393672),
    new google.maps.LatLng(37.783809, -122.394275),
    new google.maps.LatLng(37.784246, -122.394979),
    new google.maps.LatLng(37.784791, -122.395958),
    new google.maps.LatLng(37.785675, -122.396746),
    new google.maps.LatLng(37.786262, -122.39578),
    new google.maps.LatLng(37.786776, -122.395093),
    new google.maps.LatLng(37.787282, -122.394426),
    new google.maps.LatLng(37.787783, -122.393767),
    new google.maps.LatLng(37.788343, -122.393184),
    new google.maps.LatLng(37.788895, -122.392506),
    new google.maps.LatLng(37.789371, -122.391701),
    new google.maps.LatLng(37.789722, -122.390952),
    new google.maps.LatLng(37.790315, -122.390305),
    new google.maps.LatLng(37.790738, -122.389616),
    new google.maps.LatLng(37.779448, -122.438702),
    new google.maps.LatLng(37.779023, -122.438585),
    new google.maps.LatLng(37.778542, -122.438492),
    new google.maps.LatLng(37.7781, -122.438411),
    new google.maps.LatLng(37.777986, -122.438376),
    new google.maps.LatLng(37.77768, -122.438313),
    new google.maps.LatLng(37.777316, -122.438273),
    new google.maps.LatLng(37.777135, -122.438254),
    new google.maps.LatLng(37.776987, -122.438303),
    new google.maps.LatLng(37.776946, -122.438404),
    new google.maps.LatLng(37.776944, -122.438467),
    new google.maps.LatLng(37.776892, -122.438459),
    new google.maps.LatLng(37.776842, -122.438442),
    new google.maps.LatLng(37.776822, -122.438391),
    new google.maps.LatLng(37.776814, -122.438412),
    new google.maps.LatLng(37.776787, -122.438628),
    new google.maps.LatLng(37.776729, -122.43865),
    new google.maps.LatLng(37.776759, -122.438677),
    new google.maps.LatLng(37.776772, -122.438498),
    new google.maps.LatLng(37.776787, -122.438389),
    new google.maps.LatLng(37.776848, -122.438283),
    new google.maps.LatLng(37.77687, -122.438239),
    new google.maps.LatLng(37.777015, -122.438198),
    new google.maps.LatLng(37.777333, -122.438256),
    new google.maps.LatLng(37.777595, -122.438308),
    new google.maps.LatLng(37.777797, -122.438344),
    new google.maps.LatLng(37.77816, -122.438442),
    new google.maps.LatLng(37.778414, -122.438508),
    new google.maps.LatLng(37.778445, -122.438516),
    new google.maps.LatLng(37.778503, -122.438529),
    new google.maps.LatLng(37.778607, -122.438549),
    new google.maps.LatLng(37.77867, -122.438644),
    new google.maps.LatLng(37.778847, -122.438706),
    new google.maps.LatLng(37.77924, -122.438744),
    new google.maps.LatLng(37.779738, -122.438822),
    new google.maps.LatLng(37.780201, -122.438882),
    new google.maps.LatLng(37.7804, -122.438905),
    new google.maps.LatLng(37.780501, -122.438921),
    new google.maps.LatLng(37.780892, -122.438986),
    new google.maps.LatLng(37.781446, -122.439087),
    new google.maps.LatLng(37.781985, -122.439199),
    new google.maps.LatLng(37.782239, -122.439249),
    new google.maps.LatLng(37.782286, -122.439266),
    new google.maps.LatLng(37.797847, -122.429388),
    new google.maps.LatLng(37.797874, -122.42918),
    new google.maps.LatLng(37.797885, -122.429069),
    new google.maps.LatLng(37.797887, -122.42905),
    new google.maps.LatLng(37.797933, -122.428954),
    new google.maps.LatLng(37.798242, -122.42899),
    new google.maps.LatLng(37.798617, -122.429075),
    new google.maps.LatLng(37.798719, -122.429092),
    new google.maps.LatLng(37.798944, -122.429145),
    new google.maps.LatLng(37.79932, -122.429251),
    new google.maps.LatLng(37.79959, -122.429309),
    new google.maps.LatLng(37.799677, -122.429324),
    new google.maps.LatLng(37.799966, -122.42936),
    new google.maps.LatLng(37.800288, -122.42943),
    new google.maps.LatLng(37.800443, -122.429461),
    new google.maps.LatLng(37.800465, -122.429474),
    new google.maps.LatLng(37.800644, -122.42954),
    new google.maps.LatLng(37.800948, -122.42962),
    new google.maps.LatLng(37.801242, -122.429685),
    new google.maps.LatLng(37.801375, -122.429702),
    new google.maps.LatLng(37.8014, -122.429703),
    new google.maps.LatLng(37.801453, -122.429707),
    new google.maps.LatLng(37.801473, -122.429709),
    new google.maps.LatLng(37.801532, -122.429707),
    new google.maps.LatLng(37.801852, -122.429729),
    new google.maps.LatLng(37.802173, -122.429789),
    new google.maps.LatLng(37.802459, -122.429847),
    new google.maps.LatLng(37.802554, -122.429825),
    new google.maps.LatLng(37.802647, -122.429549),
    new google.maps.LatLng(37.802693, -122.429179),
    new google.maps.LatLng(37.802729, -122.428751),
    new google.maps.LatLng(37.766104, -122.409291),
    new google.maps.LatLng(37.766103, -122.409268),
    new google.maps.LatLng(37.766138, -122.409229),
    new google.maps.LatLng(37.766183, -122.409231),
    new google.maps.LatLng(37.766153, -122.409276),
    new google.maps.LatLng(37.766005, -122.409365),
    new google.maps.LatLng(37.765897, -122.40957),
    new google.maps.LatLng(37.765767, -122.409739),
    new google.maps.LatLng(37.765693, -122.410389),
    new google.maps.LatLng(37.765615, -122.411201),
    new google.maps.LatLng(37.765533, -122.412121),
    new google.maps.LatLng(37.765467, -122.412939),
    new google.maps.LatLng(37.765444, -122.414821),
    new google.maps.LatLng(37.765444, -122.414964),
    new google.maps.LatLng(37.765318, -122.415424),
    new google.maps.LatLng(37.763961, -122.415296),
    new google.maps.LatLng(37.763115, -122.415196),
    new google.maps.LatLng(37.762967, -122.415183),
    new google.maps.LatLng(37.762278, -122.415127),
    new google.maps.LatLng(37.761675, -122.415055),

   
  ];
}
}
