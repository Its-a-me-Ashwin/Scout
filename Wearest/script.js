let appId = '139059391c22b2f96179f31b8f4a9b35';
let units = 'metric';
let searchMethod;
let searchTerm;

console.log(appId);
console.log(units);
function getRandomInt(max) 
{
    return Math.floor(Math.random() * Math.floor(max));
}
function getSearhc (searchTerm)
{
    if (searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm)
    {
        searchMethod = 'zip';
    }
    else
    {
        searchMethod = 'q';
    }
}

function getDay(day_num)
{
    var day;
    switch (day_num)
    {
        case 0:
            day = "Sunday"
            break;
         case 1:
            day = "Monday"
            break;
         case 2:
            day = "Tuesday"
            break;
         case 3:
            day = "Wednessday"
            break;
         case 4:
            day = "Thrusday"
            break;
         case 5:
            day = "Friday"
            break;
         case 6:
            day = "Saturday"
            break;
    }
    return day;
}

function init(result)
{
    let date = new Date();
    var day = getDay(date.getDay());
    var l = 0;
    for (;l<6;++l)
    {
        document.getElementById('d'+l).innerHTML = getDay((date.getDay() + 1 + l ) % 7).slice(0,3).toUpperCase();
        console.log((date.getDay() + l ) % 6);
    }
    var month;
    switch (date.getMonth())
    {
        case 0:
            month = "Jan"
            break;
         case 1:
            month = "Feb"
            break;
         case 2:
            month = "Mar"
            break;
         case 3:
            month = "Apr"
            break;
         case 4:
            month = "May"
            break;
         case 5:
            month = "Jun"
            break;
         case 6:
            month = "Jul"
            break;
        case 7:
            month = "Aug"
            break;
         case 8:
            month = "Sep"
            break;
         case 9:
            month = "Oct"
            break;
         case 10:
            month = "Nov"
            break;
         case 11:
            month = "Dec"
            break;
    }
    console.log(result);
    var season;
    if (result.coord.lat > 0.0 && date.getMonth() >= 8 && date.getMonth() <= 1)
    {
        season = 'summer';
    }
    else if (result.coord.lat > 0.0 && !(date.getMonth() >= 8 && date.getMonth() <= 1))
    {
        season = 'winter';
    }
    else if (result.coord.lat < 0.0 && date.getMonth() >= 8 && date.getMonth() <= 1)
    {
        season = 'winter';
    }
    else
    {
        season = 'summer';
    }
    var imgs = document.getElementsByTagName("img");
    if (season == 'summer')
    {
        for (var j = 0; j < imgs.length; j++) 
        {
            if (imgs[j].getAttribute('src') == 'snowflake.png')
            {
                imgs[j].setAttribute("src","summer.png");
            }
            if (imgs[j].getAttribute('src') == 'background.jpg' || imgs[j].getAttribute('src') == 'Winter_bg.jpg')
            {
                imgs[j].setAttribute("src","Summer_bg.jpg");
            }
        }
    }
    else
    {
        for (var j = 0; j < imgs.length; j++) 
        {
            if (imgs[j].getAttribute('src') == 'snowflake.png' || imgs[j].getAttribute('src') == 'summer.png')
            {
                imgs[j].setAttribute("src","snowflake.png");
            }
            if (imgs[j].getAttribute('src') == 'background.jpg' || imgs[j].getAttribute('src') == 'Summer_bg.jpg')
            {
                imgs[j].setAttribute("src","Winter_bg.jpg");
            }
        }
    }
    console.log(season);
    current_temp_id = document.getElementById('current_temp');
    current_temp_id.innerHTML = `${Math.round(result.main['feels_like'])}<sup><sup>o</sup></sup>`;
    current_date_id = document.getElementById('date');
    current_date_id.innerHTML = day+', '+date.getDate()+' '+month+' '+date.getFullYear();
    current_place_id = document.getElementById('place');
    current_place_id.innerHTML = searchTerm;
    let i = 0;
    let random;
    for (;i<6;++i)
    {
        if (getRandomInt(2) == 0)
        {
            document.getElementById('t'+i).innerHTML = Math.round(result.main['feels_like']) + getRandomInt(3) + "<sup><sup>o</sup></sup>";    
        }
        else
        {
            document.getElementById('t'+i).innerHTML = Math.round(result.main['feels_like']) - getRandomInt(3) + "<sup><sup>o</sup></sup>";
        }
    }
}

function searchWeather (city)
{
    fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${city}&APPID=${appId}&units=${units}`).then(result => {
        return result.json();
    }).then(result =>{
        init(result);
    })
}

searchTerm = "Bangalore, India";
getSearhc('Bangalore, India')
searchWeather('Bangalore, India');

console.log("Initialized");
document.getElementById('searchBtn').addEventListener('click',() => {
    searchTerm = document.getElementById('searchInput').value;
    console.log(searchTerm);
    getSearhc(searchTerm);
    if (searchTerm)
    {
        searchWeather(searchTerm);
        console.log('Done');
    }
})
