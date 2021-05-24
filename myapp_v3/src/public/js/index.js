function initMap(){

  var markerStore = {};

  var Interval = 20000;
  // Map option

  var options = {
    center: {lat: 41.3851 , lng:2.1734 },
    zoom: 50,
    gestureHandling: 'greedy'
  }
//New Map
map = new google.maps.Map(document.getElementById("map"),options);
  getCoordinates();

  async function getCoordinates(){
  $.get('/get_gps', {} , function(res , resp){
    for (var i = 0 , len= res.length ; i < len; i++){
      for(var j = 0, lin= res[i].length; j < lin; j++){
        if (markerStore.hasOwnProperty(res[i][j].id)){
          markerStore[res[i][j].id].setPosition(new google.maps.LatLng(res[i][j].lat , res[i][j].lon));
        }
        else{
        var marker = new google.maps.Marker({
          position:new google.maps.LatLng(res[i][j].lat , res[i][j].lon),
          map:map,

          });
          markerStore[res[i][j].id] = marker;
      }
      marker.addListener('click',() =>{
        window.location.href = "../index_heatmap.html";
      })
    }
  }
  window.setTimeout(getCoordinates, Interval);
  }, "json");
  }
}