function initMap(){

  // Map option

  var options = {
    center: {lat: 41.3851 , lng:2.1734 },
    zoom: 10
  }

  //New Map
  map = new google.maps.Map(document.getElementById("map"),options)


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
          }

  }
}