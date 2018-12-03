import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core'

const styles = theme => ({
    paper: {
        padding: '50px',
        typography: '1.5vw'
    }
});

export const WeatherElement = (props) => {
    const { classes } = props;
    
    return (
        <Paper classes={{root: classes.paper}}>
            <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            >
                <Grid item>
                    <Paper>
                        <div> Icon Goes Here </div>
                    </Paper>
                </Grid>
                <Grid item>
                    <Paper style={{fontSize: '1.5vw'}}>
                        <Grid 
                        container
                        direction="column"
                        justify="space-evenly"
                        alignItems="flex-end"
                        >
                            <Typography style={{fontSize: '1vw'}}>
                                Day: {props.time}
                            </Typography>
                            <Typography style={{fontSize: '1vw'}}>
                                temp: {props.temp}
                            </Typography>
                            <Typography style={{fontSize: '1vw'}}>
                                min: {props.min}
                            </Typography>
                            <Typography style={{fontSize: '1vw'}}>
                                max: {props.max}
                            </Typography>
                            <Typography style={{fontSize: '1vw'}}>
                                sky: {props.sky}
                            </Typography>
                            {props.description}
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default withStyles(styles)(WeatherElement);