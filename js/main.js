//The user will enter a date. Use that date to get the NASA picture of the day from that date! https://api.nasa.gov/

document.querySelector('button').addEventListener('click', forcastFunction);

function forcastFunction (){
// created variables for the input string, and then split the inputed value into two elements within an array, then created a variable for the postal code (arr[0]) and country ID (arr[1])
    let inputDate = document.querySelector('input').value;
    let arr = inputDate.split(', ');
    let zipCode = arr[0].toString();
    let countryCode = arr[1].toString();

// API variable

    let apiKey = '1869e309f9c26763d765eb1d09eb5665';


    // API fetch to pull the latitude and longitude when inputting the zip code and country ID
    fetch(`http://api.openweathermap.org/geo/1.0/zip?zip=${zipCode},${countryCode}&appid=${apiKey}`)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        // since the city was pulled from the first fetch, we displayed it in the domain
        document.querySelector('.city').innerHTML = data.name
        let latitude = data.lat;
        let longitude = data.lon;
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`)
            .then(resTwo => resTwo.json())
            .then(dataTwo => {
                console.log(dataTwo);
                let newDir = dataTwo.main;
                let newTempC = (Number(newDir.temp) - 273).toFixed(0);
                console.log(newTempC)
                document.querySelector('.currentTemp').innerHTML = `${newTempC}°C`

                let TempH = (Number(newDir.temp_max) - 273).toFixed(0);
                document.querySelector('.tempH').innerHTML = `H: ${TempH}°C`

                let TempL = (Number(newDir.temp_min) - 273).toFixed(0);
                document.querySelector('.tempL').innerHTML = `L: ${TempL}°C`

                let feelsLike = (Number(newDir.feels_like) - 273).toFixed(0);
                console.log(feelsLike)
                document.querySelector('.feelsLikeTemp').innerHTML = `${feelsLike}°C`

                let humid = newDir.humidity;
                console.log(humid)
                document.querySelector('.humidityPercent').innerHTML = `${humid}%`

                let press = newDir.pressure;
                console.log(press)
                document.querySelector('.pressureHPa').innerHTML = `${press} hPa`

                let timeDir = new Date(dataTwo.sys.sunset);
                console.log((timeDir).toLocaleString());

                let arrTwo = timeDir.toString().split(', ');
                let newArr = arrTwo[0].toString().split(' ')
                console.log(newArr)
                let sunsetTime = newArr[4].toString();
                console.log(sunsetTime);
                document.querySelector('.sunsetTime').innerHTML = sunsetTime

                let newStatus = dataTwo.weather
                console.log(newStatus[0].description.toString())
                let statusDes = newStatus[0].description;
                document.querySelector('.weatherStatus').innerHTML = newStatus[0].description.toString();
                

             })
            .catch(errTwo => {
              console.log(`error ${errTwo}`)
            })
    })
    .catch(err => {
        console.log(`error ${err}`)
    })
}


