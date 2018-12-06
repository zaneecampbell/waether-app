import React from 'react';
import { VictoryChart, VictoryLine} from 'victory';

export const WeatherChart = ({ weatherInfo }) => {

    const data = []
    weatherInfo.map((day) => {
        const weather= {}
        weather.x = day.time.slice(5, 10)
        weather.y = Math.round((((day.temp) * 9 / 5) + 32) * 10) / 10
        data.push(weather);
    });

    console.log(data);

    return (
        <div>
            <VictoryChart>
            <VictoryLine
                style={{
                data: { stroke: "#c43a31" },
                parent: { border: "1px solid #ccc"}
                }}
                data={data}
            />
            </VictoryChart>
        </div>
    )
}

export default WeatherChart;