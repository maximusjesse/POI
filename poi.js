var city = null
var map;
//set lat and long to null
//
//
var latitude=null;
var longitude=null;
var latBox;
var longBox;
var places = [];
var markers=[];
var selected = [];
var search = [];
var businessID = [];
var numDisplayedPOIs = 100;
var holdPlace;
var allCat = ['active', 'arts', 'beautysvc', 'food', 'restaurants', 'hotelstravel', 'massmedia', 'nightlife', 'religiousorgs', 'shopping']

function toggleMarker(){
  for (marker in markers){
    if (markers[marker].val == holdPlace){
      if (markers[marker].getAnimation() != null){
        markers[marker].setAnimation(null);
      }
      else{ 
        markers[marker].setAnimation(google.maps.Animation.BOUNCE);
      }
    }
  }
}

function changeCity(){
  //added an alert to tell them hwo to use distance if they find locations with it disabled
  //
  //
  //
  //
  //
  if(latitude == null){

    alert("If you want to use distance, use 'Find Me' and reselect your city")
  }
  city=document.getElementById('selectCity').value;
}

function addToSelected(){

  if ((selected.indexOf(holdPlace) < 0)&&(selected.length<11)){
    selected.push(holdPlace);
    toggleMarker();
  }
  var selectedShow = document.getElementById("selectedShow");  
  pList="";
  for (y in selected){

    pList = pList + "</p>" + selected[y]['name'];
  }
  selectedShow.innerHTML=pList;
}

function removeSelected(){

  index = selected.indexOf(holdPlace)

  if((index > -1)){
   
    selected.splice(index,1);

    toggleMarker()
  }
  pList="";
  for (y in selected){

    pList = pList + "</p>" + selected[y]['name'];
  }
  selectedShow.innerHTML=pList;
}
function checkAll(){
  document.getElementById('activeCheckbox').checked = true;
  document.getElementById('artsCheckbox').checked = true;
  document.getElementById('hotelstravelCheckbox').checked = true;
  document.getElementById('massmediaCheckbox').checked = true;
  document.getElementById('beautysvcCheckbox').checked = true;
  document.getElementById('nightlifeCheckbox').checked = true;
  document.getElementById('foodCheckbox').checked = true;
  document.getElementById('religiousorgsCheckbox').checked = true;
  document.getElementById('restaurantsCheckbox').checked = true;
  document.getElementById('shoppingCheckbox').checked = true;
}
function updateCategories() {
  if(city==null){
    alert("Please select a city!")
  }
  allCat = [];
  if (document.getElementById('activeCheckbox').checked) {allCat.push('active'); }
  if (document.getElementById('artsCheckbox').checked) {allCat.push('arts'); }
  if (document.getElementById('hotelstravelCheckbox').checked) {allCat.push('hotelstravel'); }
  if (document.getElementById('massmediaCheckbox').checked) {allCat.push('massmedia'); }
  if (document.getElementById('beautysvcCheckbox').checked) {allCat.push('beautysvc'); }
  if (document.getElementById('nightlifeCheckbox').checked) {allCat.push('nightlife'); }
  if (document.getElementById('foodCheckbox').checked) {allCat.push('food'); }
  if (document.getElementById('religiousorgsCheckbox').checked) {allCat.push('religiousorgs'); }
  if (document.getElementById('restaurantsCheckbox').checked) {allCat.push('restaurants'); }
  if (document.getElementById('shoppingCheckbox').checked) {allCat.push('shopping'); }
 getBusinessLoop(allCat)
 if(places.length==0){
  //clearPlaces()
 }
 else{
  callUpdate()
 }
 
}
//added creating a div here
//
//
//
//
//
function newSearch() {
  search = [];
    var div = document.createElement("div");
    div.style.width = "100%";
    div.id='loadingDiv'
    div.style.height = "100%";
    div.style.background= "rgba(255, 255, 255, 1)";
    div.style.zIndex = "200";
    div.style.position = "absolute"
    div.style.left = "0"
    div.style.top = "0"
    div.innerHTML = " <img src='poi.gif' alt='Mountain View' style='position: absolute; top: 0%; left: 40%;'> <h1 style='left: 45%; top:80%; position: absolute'>Loading POIs...</h1> " ;
    document.body.appendChild(div);
  getPOIs(0);
}

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

   
    var marker = new google.maps.Marker({
      position: {lat: parseFloat(latitude), lng: parseFloat(longitude)},
      map: map,
      title: 'Your Location'
     });
    map.setCenter({lat: parseFloat(latitude), lng: parseFloat(longitude)})
    map.setZoom(13)

}

function getPOIs(i){
  if (i == allCat.length) {
    //remove the loading div here
    //
    //
    //
    //
    //
      var el = document.getElementById( 'loadingDiv' );
    el.parentNode.removeChild( el );
    checkAll()
    updateCategories();
    } else {
    //param.push(['term', 'food']);
    var param = [];


    param.push(['category_filter', allCat[i]])
    param.push(['limit', '20']);
    param.push(['location', city]);
    var yelpAjax = getSearchResults(param);
    yelpAjax.done(function(data) {
      if (data["businesses"].length != 0) {
        search.push([allCat[i], data]);
      }
      if (i < allCat.length ){ 
        getPOIs(i + 1); 
      }
    })
    console.log(search);
  }
}

function getBusinessLoop(selectedPlaces){
  places = []

  for (x in search){
    if(selectedPlaces.indexOf(search[x][0])>-1){
      arr = search[x][1]["businesses"];
      for (y in arr){ 
        arr[y]['category'] = search[x][0]
        if (city=="Atlanta, Georgia") {
          document.getElementById("distanceWeight").disabled=false;
          latDif = arr[y]["location"]["coordinate"]["latitude"] - latitude;
          longDif = arr[y]["location"]["coordinate"]["longitude"] - longitude;
        } else {
          latDif = 0;
          longDif = 0;
          document.getElementById("distanceWeight").disabled=true;
        }
        numReviews = arr[y]["review_count"]
        if(numReviews < 20){
          arr[y]['poiReview'] = 1
        }
        if(numReviews >= 20 && numReviews  < 80 ){
          arr[y]['poiReview'] = 2
        }
        if(numReviews >= 80 && numReviews  < 200){
          arr[y]['poiReview'] = 3
        }
        if(numReviews >= 200 && numReviews  < 1000){
          arr[y]['poiReview'] = 4
        }
         if(numReviews >= 1000){
          arr[y]['poiReview'] = 5
        }
        //changes here for hte distance. the distance was not getting set 
        //if the user didn't put in their distance. now it defaults to 0 if 
        //it isn't set
        tempDistance = Math.sqrt((latDif * latDif + longDif* longDif))*69
        //added this value
        //
        //
        //
        //
        arr[y]['calcDistance'] = tempDistance
        if(tempDistance < 2){
          arr[y]['poiDistance'] = 5
        }
        else if(tempDistance >= 2 && tempDistance < 5){
          arr[y]['poiDistance'] = 4
        }
        else if(tempDistance >= 5 && tempDistance < 10){
          arr[y]['poiDistance'] = 3
        }
        else if(tempDistance >=10 && tempDistance < 20){
          arr[y]['poiDistance'] = 2
        }
        else if(tempDistance >= 20){
          arr[y]['poiDistance'] = 1
        }
        else{
          arr[y]['poiDistance'] = 0
        }
        arr[y]['totalDistance']= tempDistance
        /*
        console.log("distance")
        console.log(arr[y]['poiDistance'])
        console.log("reviews")
        console.log(arr[y]['poiReview'])
        */
        places.push(arr[y])
      }
    }
   
  }
  console.log(places)
  //updateCategories()
}
function hideDiv(x){
  console.log("hiding")
  var el = document.getElementById(x);
el.parentNode.removeChild( el );
}
function updateRatings(){
  numDisplayedPOIs = document.getElementById('POInum').value;
  distanceWeight = document.getElementById('distanceWeight');
  ratingWeight = document.getElementById('ratingWeight');
  popularityWeight = document.getElementById('popularityWeight');
  for (x in places){
    
    places[x]["finalPoiRating"] = places[x]["poiDistance"]*distanceWeight.value + places[x]["rating"]*ratingWeight.value+places[x]["poiReview"]*popularityWeight.value
 

  }

 
} 

//determine if the user's browser has location services enabled. If not, show a message
function getGeolocation() { 
    if(navigator.geolocation){
        //if location services are turned on, continue and call the getUserCoordinates function below
         navigator.geolocation.getCurrentPosition(getUserCoodinates);  
    }else{
      //added an alert here
      //
      //
      //
      //
      //
      //
      //
        alert('You must enable your device\'s location services in order to run this application.');
    }

}  
//function is passed a position object which contains the lat and long value
function getUserCoodinates(position){  
    //set the application's text inputs LAT and LONG = to the user's lat and long position

    latitude=(position.coords.latitude);
    longitude=(position.coords.longitude);
    submit();
}
function clearPlaces(){
   for (marker in markers){
    markers[marker].setMap(null)
  }
}

function plotPlaces(){
  for (marker in markers){
    markers[marker].setMap(null)
  }
  markers = []
  numPSize = places.length/4
  count = 0
  index = 1
  x = 0
  numDisplayedPOIs = document.getElementById('POInum').value;
  while(x < numDisplayedPOIs){
    x++
// ['active', 'arts', 'beautysvc', 'food', 'restaurants', 'hotelstravel', 'massmedia', 'nightlife', 'religiousorgs', 'shopping']
    useIcon= 'marker1.png'
    //parks
    if(places[x]["category"]=="active"){
      if (index == 1){
        useIcon= 'POI icons/Active Life/Active Life1.png'}
      if (index == 2){
        useIcon= 'POI icons/Active Life/Active Life2.png'}
      if (index == 3){
        useIcon= 'POI icons/Active Life/Active Life3.png'}
      if (index == 4){
        useIcon= 'POI icons/Active Life/Active Life4.png'}
    }
      //sports
    if(places[x]["category"]=="arts"){
      if (index == 1){
        useIcon= 'POI icons/Arts and Entertainment/entertainment1.png'}
      if (index == 2){
        useIcon= 'POI icons/Arts and Entertainment/entertainment2.png'}
      if (index == 3){
        useIcon= 'POI icons/Arts and Entertainment/entertainment3.png'}
      if (index == 4){
        useIcon= 'POI icons/Arts and Entertainment/entertainment4.png'}
    }
      //Museum
    if(places[x]["category"]=="beautysvc"){
      if (index == 1){
        useIcon= 'POI icons/Beauty and Space/beauty and spa1.png'}
      if (index == 2){
        useIcon= 'POI icons/Beauty and Space/beauty and spa2.png'}
      if (index == 3){
        useIcon= 'POI icons/Beauty and Space/beauty and spa3.png'}        
      if (index == 4){
        useIcon= 'POI icons/Beauty and Space/beauty and spa4.png'}
    }
    //Entertainment
    if(places[x]["category"]=="food"){
      if (index == 1){
        useIcon= 'POI icons/Food/dining1.png'}
      if (index == 2){
        useIcon= 'POI icons/Food/dining2.png'}
      if (index == 3){
        useIcon= 'POI icons/Food/dining3.png'}
      if (index == 4){
        useIcon= 'POI icons/Food/dining4.png'}
    }
    //Dining
    if(places[x]["category"]=="restaurants"){
      if (index == 1){
        useIcon= 'POI icons/Food/dining1.png'}
      if (index == 2){
        useIcon= 'POI icons/Food/dining2.png'}
      if (index == 3){
        useIcon= 'POI icons/Food/dining3.png'}
      if (index == 4){
        useIcon= 'POI icons/Food/dining4.png'}
      }

    //Hotels and Travels
    if(places[x]["category"]=="hotelstravel"){
      if (index == 1){
        useIcon= 'POI icons/Hotels and Travel/hotels and travels1.png'}
      if (index == 2){
        useIcon= 'POI icons/Hotels and Travel/hotels and travels2.png'}
      if (index == 3){
        useIcon= 'POI icons/Hotels and Travel/hotels and travels3.png'}
      if (index == 4){
        useIcon= 'POI icons/Hotels and Travel/hotels and travels4.png'}
      }

            //Hotels and Travels
    if(places[x]["category"]=="massmedia"){
      if (index == 1){
        useIcon= 'POI icons/Mass Media/Mass Media1.png'}
      if (index == 2){
        useIcon= 'POI icons/Mass Media/Mass Media2.png'}
      if (index == 3){
        useIcon= 'POI icons/Mass Media/Mass Media3.png'}
      if (index == 4){
        useIcon= 'POI icons/Mass Media/Mass Media4.png'}
      }

    //Hotels and Travels
    if(places[x]["category"]=="nightlife"){
      if (index == 1){
        useIcon= 'POI icons/Nightlife/bar1.png'}
      if (index == 2){
        useIcon= 'POI icons/Nightlife/bar2.png'}
      if (index == 3){
        useIcon= 'POI icons/Nightlife/bar3.png'}
      if (index == 4){
        useIcon= 'POI icons/Nightlife/bar4.png'}
      }

    if(places[x]["category"]=="shopping"){
      if (index == 1){
        useIcon= 'POI icons/Shopping/Shopping1.png'}
      if (index == 2){
        useIcon= 'POI icons/Shopping/Shopping2.png'}
      if (index == 3){
        useIcon= 'POI icons/Shopping/Shopping3.png'}
      if (index == 4){
        useIcon= 'POI icons/Shopping/Shopping4.png'}
      }

    if(places[x]["category"]=="religiousorgs"){
      if (index == 1){
        useIcon= 'POI icons/Religious Organizations/Religious Organizations1.png'}
      if (index == 2){
        useIcon= 'POI icons/Religious Organizations/Religious Organizations2.png'}
      if (index == 3){
        useIcon= 'POI icons/Religious Organizations/Religious Organizations3.png'}
      if (index == 4){
        useIcon= 'POI icons/Religious Organizations/Religious Organizations4.png'}
      }
    
   addMarker(x)
    count++;
    if (count > numPSize){
      count = 0;
      index ++;
    }
  }
}

function callUpdate(){

  if(places.length > 0){
    console.log("before")

    updateRatings()
    poiSort()


  }
    //centers the map before plotitng places
    //
    //
    //
    //
    map.setCenter({lat: parseFloat(places[0]["location"]["coordinate"]["latitude"]), lng: parseFloat(places[0]["location"]["coordinate"]["longitude"])})
    map.setZoom(10)
    
    plotPlaces()
}
function update_sort_plot(){
  updateRatings()
  poiSort();
  //centering map on new places before plotting them
  //
  //
  //
  //
 
  plotPlaces();

}
function poiSort(){

  var poiRating = 0;
  var index = 0;
  for (x = 0; x < places.length; x++){
    poiRating = 0;
    index = 0;
    for (y = x; y < places.length; y++){
        
   
      if (places[y]["finalPoiRating"] > poiRating){
        
        index = y;
        poiRating = places[y]["finalPoiRating"]

      }
    }
    //console.log(list[x]["name"] + "  " + list[index]["name"])
    
    var temp = places[x];
    places[x] = places[index];
    places[index] = temp;

  }
  
}

function compareSelected() {
  var maxRev = 0;
  var div = document.createElement("div");
  div.id='compareViz';
  div.style.fontFamily="Arial"
  div.style.width = "100px";
  div.style.height = "100px";
  div.style.background = "white";
  div.style.color = "black";
  div.style.zIndex = 50;
  div.style.position="absolute"
  div.style.left="30%";
  div.style.top="5%";
  div.style.width="40%";
  div.style.height="100%";

  div.innerHTML = "<h1>POI Comparison</h1><input type='button' value='Close window' onclick='hideDiv(\"compareViz\");'>";
  //Pie Chart
  var piedata = [];
  var activeCount = 0;
  var artsCount = 0;
  var beautysvcCount = 0;
  var foodCount = 0;
  var restaurantsCount = 0;
  var hotelstravelCount = 0;
  var massmediaCount = 0;
  var nightlifeCount = 0;
  var religiousorgsCount = 0;
  var shoppingCount = 0;
  document.body.appendChild(div);

  for (i in selected) {
    if (selected[i].review_count > maxRev) { maxRev = selected[i].review_count; }
    console.log(selected[i]["category"]);
    var switchCat = selected[i]["category"];
    switch (switchCat) {
      case "active":
        activeCount++;
        break;
      case "arts":
        artsCount++;
        break;
      case "beautysvc":
        beautysvcCount++;
        break;
      case "food":
        foodCount++;
        break;
      case "restaurants":
        restaurantsCount++;
        break;
      case "hotelstravel":
        hotelstravelCount++;
        break;
      case "massmedia":
        massmediaCount++;
        break;
      case "nightlife":
        nightlifeCount++;
        break;
      case "religiousorgs":
        religiousorgsCount++;
        break;
      case "shopping":
        shoppingCount++;
        break;
    }
    
    //div.innerHTML = div.innerHTML + "";
  }
  if (activeCount != 0) { piedata.push({"label":"Active", "value":activeCount}) };
  if (artsCount != 0) { piedata.push({"label":"Arts", "value":artsCount}) };
  if (beautysvcCount != 0) { piedata.push({"label":"Beauty", "value":beautysvcCount}) };
  if (foodCount != 0) { piedata.push({"label":"Food", "value":foodCount}) };
  if (restaurantsCount != 0) { piedata.push({"label":"Restaurants", "value":restaurantsCount}) };
  if (hotelstravelCount != 0) { piedata.push({"label":"Hotels and Travel", "value":hotelstravelCount}) };
  if (massmediaCount != 0) { piedata.push({"label":"Mass Media", "value":massmediaCount}) };
  if (nightlifeCount != 0) { piedata.push({"label":"Nightlife", "value":nightlifeCount}) };
  if (religiousorgsCount != 0) { piedata.push({"label":"Religious", "value":religiousorgsCount}) };
  if (shoppingCount != 0) { piedata.push({"label":"Shopping", "value":shoppingCount}) };
  pieChart(piedata);
  var barData = [];
  for (i in selected) {
    barData.push({"Category":selected[i]["category"], "Rating":selected[i]["rating"], "Popularity":selected[i]["review_count"], "Name":selected[i]["name"], "Distance":selected[i]["totalDistance"]});
  }
  var div = document.createElement("div");
  div.id='compareTable';
  div.style.fontFamily="Arial"
  div.style.width = "100px";
  div.style.height = "100px";
  var divHtml = "<h1>Selection Table</h1><table border='1'><tr><td>Name</td><td>Rating</td><td>Reviews</td><td>Distance (miles)</td></tr>";
  for (i in barData) {
    divHtml = divHtml + "<tr><td>" + barData[i]["Name"] + "</td><td>" + barData[i]["Rating"] + "</td><td>" + barData[i]["Popularity"] + "</td><td>" + barData[i]["Distance"] + "</td></tr>"
  }
  console.log(divHtml);
  div.innerHTML = divHtml;

  document.getElementById("compareViz").appendChild(div);
  //barChart(barData);

  
}

function barChart(x) {

  color = d3.scale.category20c();    
  var labels = [];
  var maxY = 0;
  for (i in x) {
    labels.push(x[i]["Name"]);
    if (x[i]["Rating"] + (x[i]["Popularity"]/5) + (x[i]["Distance"]/69) > maxY) {
      maxY = x[i]["Rating"] + (x[i]["Popularity"]/5) + (x[i]["Distance"]/69);
    }
    console.log(x[i]);
    console.log(maxY);
  }

  var popData = [];  
  var ratingData = [];
  var distData = [];

  for (i in x) {
    popData.push(x[i]["Popularity"]);
    ratingData.push(x[i]["Rating"]);
    distData.push(x[i]["Distance"]);
  }
  console.log(popData);
  console.log(ratingData);


var svgPop = d3.select("#compareViz").append("svg:svg")
  .attr("fill", function(d, i) { return color(i); } ) 
  .attr("class", "chart")
  .attr("width", 300)
  .attr("height", 20 * data.length);

   var y = d3.scale.ordinal()
     .domain(popData)
     .rangeBands([0, 300]);

  var x = d3.scale.linear()
    .domain([0, d3.max(popData)])
    .range([0, 200]);

  svgPop.selectAll("rect")
      .data(popData)
    .enter().append("svg:rect")
      .attr("y", function(d, i) { return i * 30; })
      .attr("width", x)
      .attr("height", 20);
  var yTextPadding = 20;
  svg.selectAll(".bartext")
  .data(data)
  .enter()
  .append("text")
  .attr("class", "bartext")
  .attr("text-anchor", "middle")
  .attr("fill", "white")
  .attr("x", function(d,i) {
      return x(i)+x.rangeBand()/2;
  })
  .attr("y", function(d,i) {
      return height-y(d)+yTextPadding;
  })
  .text(function(d){
       return d;
  });
}

function pieChart(x) {

  var w = 300,                        
    h = 300,                           
    r = 150,                           
    color = d3.scale.category20c();     

    data = x;
    
    var vis = d3.select("#compareViz")
        .append("svg:svg")              
        .data([data])                   
            .attr("width", w)           
            .attr("height", h)
        .append("svg:g")                
            .attr("transform", "translate(" + r + "," + r + ")")  

    var arc = d3.svg.arc()              
        .outerRadius(r);

    var pie = d3.layout.pie()           
        .value(function(d) { return d.value; });    

    var arcs = vis.selectAll("g.slice")     
        .data(pie)                           
        .enter()                            
            .append("svg:g")                
                .attr("class", "slice");    

        arcs.append("svg:path")
                .attr("fill", function(d, i) { return color(i); } ) 
                .attr("d", arc);                                    

        arcs.append("svg:text")                                     
                .attr("transform", function(d) {                    
                d.innerRadius = 0;
                d.outerRadius = r;
                return "translate(" + arc.centroid(d) + ")";        
            })
            .attr("text-anchor", "middle")                         
            .text(function(d, i) { return data[i].label + ":" + data[i].value; });        
        
}

function addMarker(x){
     
      var selectedShow = document.getElementById("selectedShow");
      var marker = new google.maps.Marker({
          position: {lat: places[x]["location"]["coordinate"]["latitude"], lng: places[x]["location"]["coordinate"]["longitude"]},
          map: map,
          title:places[x]["id"],
          size: 200,
          icon: useIcon,
          animation: google.maps.Animation.DROP,
          val: places[x]

      });
      markers.push(marker);
       var infowindow = new google.maps.InfoWindow({
        content: "<p>"+ "Name: " + places[x]["name"] + "<br />" + "Rating: " + places[x]["rating"]  +"<br />"
        + "Reviews: " + places[x]["review_count"]+ "<br />" + "Category: " + places[x]["categories"]  +"</p>",
       width : 300,
       height : 300,

        });

       google.maps.event.addListener(marker, 'click', function() {

  

        var div = document.createElement("div");
        div.id='showDetails'
        div.style.width = "100px";
        div.style.height = "100px";
        div.style.background = "white";
        div.style.color = "black";
        div.style.zIndex = 50;
        div.style.position="absolute"
        div.style.left="20%";
        div.style.top="0%";
        div.style.width="60%";
        div.style.height="100%";
        holdPlace = places[x]
        //updated this a lot
        //
        //
        //
        div.innerHTML = "<table border='1'><tr><td><h1>"+places[x]["name"]+"</h1> </td><td><input type='button' value='Add to Planner' onclick='addToSelected();'></td><td><input type='button' value='Remove from Planner' onclick='removeSelected();'></td><td><input type='button' value='Close window' onclick='hideDiv(\"showDetails\");'></td></tr>"
        +"<tr><td><p>Image of business</h1> </td><td><img src="+places[x]["image_url"]+"></td><td><p>Description </p> </td><td><p>"+places[x]["snippet_text"]+"</p></td></tr>"
        +"<tr><td><p>Category </p> </td><td><p>"+places[x]["category"]+"</p></td><td><p>Subcategories </h1> </td><td><p>"+places[x]["categories"]+"</p></td></tr>"
       
        +"<tr><td><p>Phone </p> </td><td><p>"+places[x]["display_phone"]+"</p></td><td><p>rating </p> </td><td><img src="+places[x]["rating_img_url"]+"></td></tr>"
         +"<tr><td><p>Website </p> </td><td><p>"+places[x]["url"]+"</p></td><td><p>Address </h1> </td><td><p>"+places[x]["location"]["display_address"]+"</p></td></tr>"
          +"<tr><td><p>Distance (miles)</p> </td><td><p>"+places[x]["calcDistance"]+"</p></td><td><p>Number of reviews </h1> </td><td><p>"+places[x]["review_count"]+"</p></td></tr>"
        +"<tr></tr>";
        document.body.appendChild(div);
       });
    /*  google.maps.event.addListener(marker, 'click', function() {
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

    });*/
      google.maps.event.addListener(marker, 'mouseover', function() {

       infowindow.open(map,marker);

       
    });
      google.maps.event.addListener(marker, 'mouseout', function() {
       infowindow.close();
    });
}