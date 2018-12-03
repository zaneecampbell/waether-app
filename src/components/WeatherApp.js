import React from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import WeatherElement from './WeatherElement';

export class WeatherApp extends React.Component {
  state = {
    city: '',
    country: '',
    latitiude: '',
    longitude: '',
    weather: []
  }

  componentWillMount() {
    this.getWeather();
  }

  getWeather = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        latitiude: position.coords.latitude,
        longitude: position.coords.longitude
      });
      fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${this.state.latitiude}&lon=${this.state.longitude}&units=imperial&APPID=f4cc91ca7ae413816afbd1648484b1bd`)
        .then((response) => {
          return response.json();
        })
          .then((myJson) => {
            const relevantWeather = []

            // Gets every 8th entry so we only have 5 days of weather not every 3 hours worth of 5 days
            myJson.list.map((weatherInfo, idx) => {
              if (idx % 8 === 0) {
                relevantWeather.push(weatherInfo)
              } else {
                // do nothing
              }
            })

            // Takes out all the unwanted information
            const simpleWeather = []
            relevantWeather.forEach((day) => {
              let weatherObject = {}
              weatherObject.time = day.dt_txt
              weatherObject.temp = day.main.temp
              weatherObject.min = day.main.temp_min
              weatherObject.max = day.main.temp_max
              weatherObject.sky = day.weather[0].main
              weatherObject.description = day.weather[0].description
              simpleWeather.push(weatherObject)
            });

            this.setState({
              city: myJson.city.name,
              country: myJson.city.country,
              weather: simpleWeather
            });
          })
    });
  }

  handleCheat = () => {
    console.log(this.state.weather)
  }

  render() {
    return (
      <div>
        {
          this.state.weather.length === 0 ? (
            <div>
              Loading... 
            </div>
          ) : (
              <Grid spacing={0} container
              direction="column"
              justify="center"
              alignItems="center"
              >
                {
                  this.state.weather.map((day, idx) => (
                    <Grid item key={idx} style={{margin: '1vw'}}>
                        <WeatherElement time={day.time} temp={day.temp} min={day.min} max={day.max} sky={day.sky} description={day.description} />
                    </Grid>
                  ))
                }
              </Grid>
          )
        }
      </div>
    )
  }
}

export default WeatherApp;


// api key f4cc91ca7ae413816afbd1648484b1bd


// dt_txt
// main.temp, main.temp_min, main.temp_max
// weather[0].main, weather[0].description