jsonData_forecast = null;
jsonData_weather = null;

function parseWeather(){
    forecast_loadJSON(function(response){
        jsonData_forecast = JSON.parse(response);
        var date = new Date(jsonData_forecast["list"][0]["dt_txt"]);
        date.setHours(date.getHours()+9)
        for(i = 0; i<7 ;i++){	
            var imgURL = "./weather_icon/" + jsonData_forecast["list"][i]["weather"][0]["icon"] + ".png";
            $("#box"+i+"_weather").text(jsonData_forecast["list"][i]["weather"][0]["main"]);
            $("#box"+i+"_weather_icon_image").attr("src", imgURL);
            $("#box"+i+"_temp").text(Math.floor((jsonData_forecast["list"][i]["main"]["temp"] - 273.15))+"°C");
            $("#box"+i+"_time").text(date.getDate()+"일 "+date.getHours()+"시");
            date.setHours(date.getHours()+3);
        }
        
    });
    
    weather_loadJSON(function(response){
        jsonData_weather = JSON.parse(response);
        var date = new Date();
        var imgURL = "./weather_icon/" + jsonData_weather["weather"][0]["icon"] + ".png";
        var image = jsonData_weather["weather"][0]["icon"];
        $("#current_time").text(date.getMonth()+"월 "+date.getDate()+"일 "+date.getHours()+"시");
        $("#current_temp").text(Math.floor((jsonData_weather["main"]["temp"] - 273.15))+"°C");
        $("#current_weather").text(jsonData_weather["weather"][0]["main"]);
        $("#current_weather_icon_image").attr("src", imgURL);
        $("body").css({"background-image": "url(./background/"+image+".jpg", 'background-repeat': 'no-repeat','background-size': 'cover',"transition":"background-image 0.1s"});
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

$(document).ready(function(){
    $('.box').hover(function(){
        var temp_name = $(this).attr("id");
        temp_name = temp_name.substring(3,4);
        $(this).css({"height":"300px","transition":"height 1s"});
        $(this).css({"background-color":"rgba(0,0,0,0.4)", "border-radius":"10%"});
        $(this).append($("<div class=fore_temp>체감온도 : "+ Math.floor(jsonData_forecast["list"][temp_name]["main"]["feels_like"]-273.15)+"°C"+ "</div>"));
        $(this).append($("<div class=fore_temp>기압 : "+ jsonData_forecast["list"][temp_name]["main"]["pressure"]+"hPa" + "</div>"));
        $(this).append($("<div class=fore_temp>풍속 : "+ jsonData_forecast["list"][temp_name]["wind"]["speed"]+"m/s" + "</div>"));
        
    
    }, function(){
        $(this).css({"height":"200px","background-color":"transparent","transition":"background-color 1s, height 1s"});
        $("div").remove(".fore_temp");
    });

    $('.weather').hover(function(){
        $(this).css({"background-color":"rgba(0,0,0,0.4)", "border-radius":"10%"});
        $("#current_weather_icon_image").hide();
        $("#current_temp").hide();
        $("#current_time").append($("<div class=weat_temp></br></br></br>체감온도 :"+Math.floor(jsonData_weather["main"]["feels_like"] - 273.15)+"°C"+ "</p>" + 
            "기압 : " + jsonData_weather["main"]["pressure"]+"hPa</p>"+ 
            "풍속 : " + jsonData_weather["wind"]["speed"]+"m/s</p>"+
            "습도 : " + jsonData_weather["main"]["humidity"] +"%</p>"+
            "</div>"));
        
    
    }, function(){
        $(this).css({"background-color":"transparent"});
        $(this).css({"height":"500px"});
        $("#current_weather_icon_image").show();
        $("#current_temp").show();
        $("div").remove(".weat_temp");
    });
});