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
  $.get('/get_gps', {} , function(res , resp){
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
      window.location.href = "../index_heatmap.html";
    })
  }
  window.setTimeout(getCoordinates, Interval);
  }, "json");
  }
}