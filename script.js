function parseWeather(){
    forecast_loadJSON(function(response){
        var jsonData = JSON.parse(response);
        var date = new Date(jsonData["list"][0]["dt_txt"]);
        date.setHours(date.getHours()+9)
        for(i = 0; i<7 ;i++){	
            var imgURL = "./weather_icon/" + jsonData["list"][i]["weather"][0]["icon"] + ".png";
            $("#box"+i+"_weather").text(jsonData["list"][i]["weather"][0]["main"]);
            $("#box"+i+"_weather_icon_image").attr("src", imgURL);
            $("#box"+i+"_temp").text(Math.floor((jsonData["list"][i]["main"]["temp"] - 273.15))+"°C");
            $("#box"+i+"_time").text(date.getDate()+"일 "+date.getHours()+"시");
            date.setHours(date.getHours()+3);
        }
        
    });
    
    weather_loadJSON(function(response){
        var jsonData = JSON.parse(response);
        var date = new Date();
        var imgURL = "./weather_icon/" + jsonData["weather"][0]["icon"] + ".png";
        var image = jsonData["weather"][0]["icon"];
        $("#current_time").text(date.getMonth()+"월 "+date.getDate()+"일 "+date.getHours()+"시");
        $("#current_temp").text(Math.floor((jsonData["main"]["temp"] - 273.15))+"°C");
        $("#current_weather").text(jsonData["weather"][0]["main"]);
        $("#current_weather_icon_image").attr("src", imgURL);
        $("body").css({"background-image": "url(./background/"+image+".jpg", 'background-repeat': 'no-repeat','background-size': 'cover'});
    });
}


function forecast_loadJSON(callback){
    var apiURL ="https://api.openweathermap.org/data/2.5/forecast?q="+locate+",KR&cnt=7&appid=dc8d5f394054b66bd905f0d24fc95a3d " ;		
    var request = new XMLHttpRequest();
    request.overrideMimeType("application/json");
    request.open('GET',apiURL, true);
    
    request.onreadystatechange = function(){
        if(request.readyState == 4 && request.status =="200"){
            callback(request.responseText);
        }
    };
    request.send(null);
}


function weather_loadJSON(callback){
    var apiURL ="https://api.openweathermap.org/data/2.5/weather?q="+locate+",KR&appid=dc8d5f394054b66bd905f0d24fc95a3d " ;
    var request = new XMLHttpRequest();
    request.overrideMimeType("application/json");
    request.open('GET',apiURL, true);
    
    request.onreadystatechange = function(){
        if(request.readyState == 4 && request.status =="200"){
            callback(request.responseText);
        }
    };
    request.send(null);
}
window.onload = function(){
    locate = "Daegu";
    parseWeather();
}

var location_change = function(select_obj){
    var selected_index = select_obj.selectedIndex;
    locate = select_obj.options[selected_index].value;
    parseWeather();
}