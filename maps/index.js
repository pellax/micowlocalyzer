function initMap(){

  // Map option

  var options = {
    center: {lat: 41.3851 , lng:2.1734 },
    zoom: 10
  }

  //New Map
  map = new google.maps.Map(document.getElementById("map"),options)
  heatmap = new google.maps.visualization.HeatmapLayer({
    data: getPoints(),
    map: map,
  });

  //Add Markers to Array

  let MarkerArray = [ {location:{lat: 41.1189, lng: 1.2445}, 
      content: `<h2>Tarragona</h2>`},

      {location:{lat: 41.9794, lng: 2.8214}, content: `<h2>Girona</h2>`},

      {location:{lat: 41.3851, lng: 2.1734},content: `<h2>Barcelona</h2>` }]

  // loop through marker
  for (let i = 0; i < MarkerArray.length; i++){
      addMarker(MarkerArray[i]);

  }

  // Add Marker

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

  }
  function getPoints() {
    return [
      new google.maps.LatLng(41.3851,2.1743),
      new google.maps.LatLng(41.3853,2.1743),
      new google.maps.LatLng(41.3855,2.1743),
      new google.maps.LatLng(41.3857,2.1743),
      new google.maps.LatLng(41.3859,2.1743),
      new google.maps.LatLng(41.3861-2.1744),
      new google.maps.LatLng(41.3864,2.1744),
      new google.maps.LatLng(41.3866,2.1744),
      new google.maps.LatLng(41.3876,2.1745),
      new google.maps.LatLng(41.38586,2.1748),
      new google.maps.LatLng(41.3884,2.1743),
      new google.maps.LatLng(41.3883,2.1743),
      new google.maps.LatLng(41.3881,2.1743),
      new google.maps.LatLng(41.3875,2.1743),];
    }
}
