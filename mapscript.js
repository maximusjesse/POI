
var map
var latitude
var longitude 
var latBox
var longBox
var places = []
var markers=[]
var selected = []
var search = [];
places.push({})

/*
places[0]["name"] = "Satto"
places[0]["lat"] = 33.772780
places[0]["long"] = -84.410298
places[0]["category"] = "Dining"
places[0]["poiFinalRating"] = 3
places.push({})
places[1]["name"] = "Georgia Aquarium"
places[1]["lat"] = 33.762625
places[1]["long"] = -84.394487
places[1]["category"] = "Museum"
places[1]["poiFinalRating"] = 2
places.push({})
places[2]["name"] = "Fox Theatre"
places[2]["lat"] = 33.773030
places[2]["long"] = -84.391565
places[2]["category"] = "Entertainment"
places[2]["poiFinalRating"] = 10
places.push({})
places[3]["name"] = "Piedmont Park"
places[3]["lat"] = 33.790884
places[3]["long"] = -84.367654
places[3]["category"] = "Park"
places[3]["poiFinalRating"] = 15
places.push({})
places[4]["name"] = "Turner Field"
places[4]["lat"] = 33.734898
places[4]["long"] = -84.388517
places[4]["category"] = "Sport"
places[4]["poiFinalRating"] = 6
places.push({})
places[5]["name"] = "High Museum of Art"
places[5]["lat"] = 33.789435
places[5]["long"] = -84.386189
places[5]["category"] = "Museum"
places[5]["poiFinalRating"] = 3
places.push({})
places[6]["name"] = "Atlanta Botanical Garden"
places[6]["lat"] = 33.790117
places[6]["long"] = -84.373944
places[6]["category"] = "Park"
places[6]["poiFinalRating"] = 2
places.push({})
places[7]["name"] = "The Shakespeare Tavern Playhouse"
places[7]["lat"] = 33.768180
places[7]["long"] = -84.384921
places[7]["category"] = "Entertainment"
places[7]["poiFinalRating"] = 100
places.push({})
places[8]["name"] = "Michael C. Carlos Museum"
places[8]["lat"] = 33.790341
places[8]["long"] = -84.324382
places[8]["category"] = "Museum"
places[8]["poiFinalRating"] = 9
*/
function initialize() {
  var mapCanvas = document.getElementById('map_canvas');
  var mapOptions = {
    center: new google.maps.LatLng(44.5403, -78.5463),
    zoom: 3,
    mapTypeId: google.maps.MapTypeId.ROAD
  }
   map = new google.maps.Map(mapCanvas, mapOptions)
}
google.maps.event.addDomListener(window, 'load', initialize);

function submit(){

  var latitude = document.getElementById('getLat').value;
  var longitude = document.getElementById('getLong').value;
  var marker = new google.maps.Marker({
    position: {lat: parseFloat(latitude), lng: parseFloat(longitude)},
    map: map,
    title: 'Your Location'
   });
  map.setCenter({lat: parseFloat(latitude), lng: parseFloat(longitude)})
  map.setZoom(13)

}

function getPOIs(){
  param = []
  param.push(['term', 'food']);
  param.push(['limit', '20']);
  param.push(['location', 'Atlanta']);
  search = getSearchResults(param);
  json = search["businesses"]
  for(x in json){
    businessID.push(json.id);     
  }
}

function updateRatings(list){
  distanceWeight = document.getElementById('distanceWeight');
  ratingWeight = document.getElementById('ratingWeight');
  popularityWeight = document.getElementById('popularityWeight');
  for (x in list){
    list[x]["finalPoiRating"] = list[x]["poiDistance"]*distanceWeight.value + list[x]["poiRating"]*ratingWeight.value+list[x]["poiPopularity"]*popularityWeight.value
  }
  plotPlaces();
} 

  //determine if the user's browser has location services enabled. If not, show a message
function getGeolocation() { 
  if(navigator.geolocation){
      //if location services are turned on, continue and call the getUserCoordinates function below
       navigator.geolocation.getCurrentPosition(getUserCoodinates);  
  }else{
      alert('You must enable your device\'s location services in order to run this application.');
  }

}  
  //function is passed a position object which contains the lat and long value
function getUserCoodinates(position){  
    //set the application's text inputs LAT and LONG = to the user's lat and long position
    latBox = document.getElementById('getLat');
    longBox = document.getElementById('getLong');
    latBox.value=(position.coords.latitude);
    longBox.value=(position.coords.longitude);
    submit();
}


function plotPlaces(){
  for (marker in markers){
    markers[marker].setMap(null)
  }
  markers = []
  numPSize = places.length/4
  count = 0
  index = 1
  
  for (x in places){

    useIcon= 'marker1.png'
    //parks
    if(places[x]["category"]=="Park"){
      if (index == 1){
        useIcon= 'POIicons/park/park1.png'}
      if (index == 2){
        useIcon= 'POIicons/park/park2.png'}
      if (index == 3){
        useIcon= 'POIicons/park/park3.png'}
      if (index == 4){

        useIcon= 'POIicons/park/park4.png'}
    }
      //sports
    if(places[x]["category"]=="Sport"){
      if (index == 1){
        useIcon= 'POIicons/sports/sports1.png'}
      if (index == 2){
        useIcon= 'POIicons/sports/sports2.png'}
      if (index == 3){
        useIcon= 'POIicons/sports/sports3.png'}
      if (index == 4){
        useIcon= 'POIicons/sports/sports4.png'}
    }
      //Museum
    if(places[x]["category"]=="Museum"){
      if (index == 1){
        useIcon= 'POIicons/museum/museum1.png'}
      if (index == 2){
        useIcon= 'POIicons/museum/museum2.png'}
      if (index == 3){
        useIcon= 'POIicons/museum/museum3.png'}
        
      if (index == 4){

        useIcon= 'POIicons/museum/museum4.png'}
    }
    //Entertainment
    if(places[x]["category"]=="Entertainment"){
      if (index == 1){
        useIcon= 'POIicons/entertainment/entertainment1.png'}
      if (index == 2){
        useIcon= 'POIicons/entertainment/entertainment2.png'}
      if (index == 3){
        useIcon= 'POIicons/entertainment/entertainment3.png'}
      if (index == 4){
        useIcon= 'POIicons/entertainment/entertainment4.png'}
    }
    //Dining
    if(places[x]["category"]=="Dining"){
      if (index == 1){
        useIcon= 'POIicons/food/dining1.png'}
      if (index == 2){
        useIcon= 'POIicons/food/dining2.png'}
      if (index == 3){
        useIcon= 'POIicons/food/dining3.png'}
      if (index == 4){
        useIcon= 'POIicons/food/dining4.png'}
    }


    
   addMarker(x)

 
   
    

    count++;
    if (count > numPSize){
      count = 0;
      index ++;
    }
  }
}
function sortBase(){


  
  sort(places);
  plotPlaces();
}
function sort(list){

  var poiRating = 0;
  var index = 0;
  for (x = 0; x < list.length; x++){
    poiRating = 0;
    index = 0;
    for (y = x; y < list.length; y++){
        
        
        console.log(poiRating + "  " + list[y]["poiFinalRating"] )
      if (list[y]["poiFinalRating"] > poiRating){
        
        index = y;
        poiRating = list[y]["poiFinalRating"]
        console.log("found")
      }
    }
    //console.log(list[x]["name"] + "  " + list[index]["name"])
    
    var temp = list[x];
    list[x] = list[index];
    list[index] = temp;

  }
  
}
function addMarker(x){

  var selectedShow = document.getElementById("selectedShow");
  var marker = new google.maps.Marker({
      position: {lat: places[x]["lat"], lng: places[x]["long"]},
      map: map,
      title:places[x]["name"],
      size: 200,
      icon: useIcon,
      animation: google.maps.Animation.DROP,
    

  });
  markers.push(marker);
 var infowindow = new google.maps.InfoWindow({
  content: "<p>"+ "Name: " + places[x]["name"] + "<br />" + "latitude: " + places[x]["lat"]  +"<br />"
   + "longitude: " + places[x]["long"]+ "</p>",
  width: 300
  });

  google.maps.event.addListener(marker, 'click', function() {
    if (marker.getAnimation() != null) {
      pList = "";

      marker.setAnimation(null);
      selected.splice(selected.indexOf(places[x]),1);
      if (selected.length>0){
        
        for (y in selected){
           pList = pList + "</p>" + selected[y]['name'];
        
        
        }

      }
   
      selectedShow.innerHTML=pList;
  } else {
      marker.setAnimation(google.maps.Animation.BOUNCE);
      selected.push(places[x]);

      pList="";

      for (y in selected){
         pList = pList + "</p>" + selected[y]['name'];
       selectedShow.innerHTML=pList;
  }
  }

  });
  google.maps.event.addListener(marker, 'mouseover', function() {
   infowindow.open(map,marker);
   });
  google.maps.event.addListener(marker, 'mouseout', function() {
    infowindow.close();}
    );
}



  

