$(function(){
  
  var C= false;
  var apiData;
    
  backgroundImg = [
  "https://s.hswstatic.com/gif/thunderstorm-orig.jpg", 
  "https://www.geo.tv/assets/uploads/updates/2017-06-26/147089_5166454_updates.jpg",
  "http://longwallpapers.com/Desktop-Wallpaper/rain-wallpapers-full-hd-For-Desktop-Wallpaper.jpg",
  "http://www.playcast.ru/uploads/2017/11/21/23946159.jpg",
  "https://img.elo7.com.br/product/original/1509060/papel-de-parede-3d-paisagens-floresta-papel-de-parede-paisagem.jpg",
  "http://www.goodwp.com/images/201205/goodwp.com_21418.jpg",
  "http://makfax.com.mk/wp-content/uploads/2016/12/cloudy.jpg",
  ]
  
  function displayTemp(F,C){
  if(C) return Math.round((F-32)*(5/9)) + '&deg; C';
  return Math.round(F) + '&deg; F';
}
  
  function render (data, C){
    var currentWeather = data.weather[0].description;
    var currentTemp = displayTemp(data.main.temp,C);
    var icon = data.weather[0].icon;
    
    $('#currentTemp').html(currentTemp);
    $('#currentWeather').html(currentWeather);
    
    var apiIcon = 'http://openweathermap.org/img/w/' + icon  + '.png';
    $('#currentTemp').prepend('<img src=' + apiIcon + '>');
  }
  
  //location data
  $.getJSON('https://freegeoip.net/json/').done(function(location){
    $('#country').html(location.country_name);
    $('#city').html(location.city);
     $('#latitude').html(location.latitude);
     $('#longitude').html(location.longitude);
    
    //weather info
    $.getJSON('https://api.openweathermap.org/data/2.5/weather?lat='+location.latitude+'&lon='+location.longitude+'&units=imperial&appid=7af6373481ef33ce2624f2ecad64ff26', function(data){
      apiData=data;
      //console.log(apiData); working
      render(apiData,C);
     
      $('#toggle').click(function(){
        C = !C
        render(data,C);
      })
      
      var id = data.weather[0].id,
          bgIndex,
          backgroundId = [299, 499, 599, 699, 799, 800];
      
      backgroundId.push(id);
      bgIndex = backgroundId.sort().indexOf(id);
      
      $('body').css('background-image', 'url(' + backgroundImg[bgIndex] + ')');
            
     })
    
  })
  
});
  
 //299 Thunderstorms https://s.hswstatic.com/gif/thunderstorm-orig.jpg 
 //499 Drizzle https://www.geo.tv/assets/uploads/updates/2017-06-26/147089_5166454_updates.jpg
 //599 Rain http://longwallpapers.com/Desktop-Wallpaper/rain-wallpapers-full-hd-For-Desktop-Wallpaper.jpg
 //699 Snow http://www.playcast.ru/uploads/2017/11/21/23946159.jpg
 //799 Fog https://img.elo7.com.br/product/original/1509060/papel-de-parede-3d-paisagens-floresta-papel-de-parede-paisagem.jpg
 //800 Clear http://www.goodwp.com/images/201205/goodwp.com_21418.jpg
 //>800 Cloudy http://makfax.com.mk/wp-content/uploads/2016/12/cloudy.jpg