
function initMap(){

  // Map option
  var x = 41.3851;
  var y = 2.1734;
  var center = new google.maps.LatLng(x,y);
  
  initialize();

  function initialize(){
    var options = {
      center: center,
      zoom: 15
    }
    map = new google.maps.Map(document.getElementById("map"),options);

    //Add Markers to Array

  let MarkerArray = [ {location:{lat: 41.1189, lng: 1.2445}, 
    content: `<h2>Tarragona</h2>`},

    {location:{lat: 41.9794, lng: 2.8214}, content: `<h2>Girona</h2>`},

    {location:{lat: 41.3851, lng: 2.1734},content: `<h2>Barcelona</h2>` }]

// loop through marker
for (let i = 0; i < MarkerArray.length; i++){
    addMarker(MarkerArray[i]);

}
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
          marker.addListener('click',() =>{
            window.location.href = "./maps_heatmap/index.html";
          })
        }
    }
    moveMarker(map , marker);
  }
  
  function moveMarker(map , marker){
    setInterval(function(){
      x+=0.0001;
      y-=0.0001;
      center = new google.maps.LatLng(x,y);
      marker.setPosition(center);
      map.panTo(center);
    }, 500);
  };
  google.maps.event.addDomListener(window , 'load', initialize);

}
