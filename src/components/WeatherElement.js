import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    card: {
        width: '75%'
      },
    media: {
        objectFit: 'scale-down'
    },
});

export const WeatherElement = (props) => {
    const { classes } = props;
    
    return (
            <Card className={classes.card}>
                    <CardMedia
                    component='img'
                    className={classes.media}
                    height='180'
                    image="images/sunny-clipart-transparent-785084-5742938.png"
                    title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Typography style={{textAlign: 'center'}} gutterBottom variant="h5" component="h2">
                            {props.time.slice(0, 10)}
                        </Typography>
                        <Typography component="p">
                            {props.description}
                            Day: {props.time}
                            temp: {props.temp}
                            min: {props.min}
                            max: {props.max}
                            sky: {props.sky}
                        </Typography>
                    </CardContent>
            </Card>

    )
}

export default withStyles(styles)(WeatherElement);

// Day: {props.time}
// temp: {props.temp}
// min: {props.min}
// max: {props.max}
// sky: {props.sky}
// {props.description}