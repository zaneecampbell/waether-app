import React from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import WeatherElement from './WeatherElement';
import WeatherChart from './WeatherChart';
import LoadingPage from './LoadingPage';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
  weatherElement: {
    marginTop: '50px',
    margin: 'auto',
    [theme.breakpoints.down('sm')]: {
      margin: '10px'
  }
  }
})

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
      fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${this.state.latitiude}&lon=${this.state.longitude}&APPID=f4cc91ca7ae413816afbd1648484b1bd&units=metric`)
        .then((response) => {
          return response.json();
        }).catch((e) => {console.log('no response', e)})
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
              weatherObject.id = day.weather[0].id
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

    const { classes } = this.props;

    return (
      <div>
        {
          this.state.weather.length === 0 ? (
            <Grid    
            container
            direction="row"
            justify="center"
            style={{marginTop: '50px'}}
            >
              <Paper style={{padding: '10px'}}>
                <LoadingPage />
              </Paper>
            </Grid>
          ) : (
              <Grid 
              container
              direction="row"
              justify="center"
              alignItems="center"
              >
                {
                  this.state.weather.map((day, idx) => (
                    <Grid item md={2} key={idx} classes={{item: classes.weatherElement}}>
                        <WeatherElement time={day.time} temp={day.temp} min={day.min} max={day.max} sky={day.sky} description={day.description} id={day.id}/>
                    </Grid>
                  ))
                }
                <Grid lg={5} item>
                  <WeatherChart weatherInfo={this.state.weather}/>
                </Grid>
              </Grid>
          )
        }
      </div>
    )
  }
}

export default withStyles(styles)(WeatherApp);



// api key f4cc91ca7ae413816afbd1648484b1bd


// dt_txt
// main.temp, main.temp_min, main.temp_max
// weather[0].main, weather[0].description