import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Axios from "axios";
import CardContent from "@material-ui/core/CardContent";
import { Alert } from "@material-ui/lab";
import CloseIcon from "@material-ui/icons/Close";
import { Card } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import { Grid } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";

import TableRow from "@material-ui/core/TableRow";
// @import url(https://fonts.googleapis.com/css?family=Roboto);

// install first import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        alignContent: "center",
        // width: "auto",
    },
    table: {
        maxWidth: "380px",
        minWidth: "380px",
    },
    text: {
        padding: 5,
        margin: 0,
        fontSize: 20,
    },
    grid: {
        flexGrow: 1,
        alignItems: "center",
    },
}));

export default function WeatherDisplay(props) {
    // let history = useHistory();
    const classes = useStyles();
    // console.log(`weatherdisplay searchterm: ${props.searchTerm}`);
    const [loading, setLoading] = useState(true);
    const [weatherData, setWeatherData] = useState();
    const [error, setError] = useState(false);
    const searchType = props.searchType;

    const formatTimestamp = timestamp => {
        var date = new Date(timestamp * 1000);
        // Minutes part from the timestamp
        var minutes = "0" + date.getMinutes();

        // Will display time in 10:30 format
        var formattedTime = `${date.getHours()}:${minutes.substr(-2)}`;

        return formattedTime;
    };
    const extractWeatherData = data => {
        var {
            weather: [
                {
                    main,
                    description,
                    icon,
                    //http://openweathermap.org/img/wn/${icon}@2x.png
                },
            ],
            main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
            sys: { country, sunrise, sunset },
            name,
        } = data;
        setWeatherData({
            main,
            description,
            icon,
            temp,
            feels_like,
            temp_min,
            temp_max,
            pressure,
            humidity,
            country,
            sunrise,
            sunset,
            name,
        });
        // console.log(sunrise, sunset);
    };
    // const [showResults, setShowResults] = useState();

    useEffect(() => {
        //data fetching whenever search term changes

        setLoading(true);
        searchType === "city"
            ? getWeatherDetails(
                  refineSearchTerm({ cityname: props.searchTerm })
              )
            : getWeatherDetails(
                  refineSearchTerm({
                      latitude: props.latitude,
                      longitude: props.longitude,
                  })
              );
        // console.log(`useeffect searchterm: ${props.searchTerm}`);
    }, [props.search]);

    const baseUrl = `https://api.openweathermap.org/data/2.5/weather`;
    async function getWeatherDetails(searchParameter) {
        try {
            const response = await Axios.post(
                `${baseUrl}?${searchParameter}&units=metric&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`
                //`${baseUrl}?lat=35&lon=139&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`
            );

            console.log(response);
            const data = response.data;
            console.log("Data returned from API: ", data);
            // if (!data || data.length === 0 || data.hasOwnProperty("error")) {
            //     //json object not valid
            // } else {

            // }
            extractWeatherData(data);
            setError(false);
            setLoading(false);
        } catch (error) {
            // If an error occurred we log it to the console
            console.error("Request to API Failed: ", error);
            setLoading(false);
            setError(true);
        }
    }

    const refineSearchTerm = ({
        cityname = "Islamabad",
        latitude = "33.71",
        longitude = "73.13",
    } = {}) => {
        // console.log(cityname, latitude, longitude);
        return searchType === "city"
            ? `q=${cityname}`
            : `lat=${latitude}&lon=${longitude}`;
    };

    return loading ? (
        <Grid
            container
            direction="row"
            alignitems="center"
            justify="center"
            className={classes.grid}
        >
            <Grid item xs={6} className={classes.grid}>
                <Skeleton variant="rect" width={610} height={418} />
            </Grid>
        </Grid>
    ) : (
        <div className={classes.root}>
            {error ? (
                <Grid item xs={12} className={classes.grid}>
                    <Grid
                        container
                        direction="row"
                        alignitems="center"
                        justify="center"
                        className={classes.grid}
                    >
                        <Grid item xs={8} className={classes.grid}>
                            <Alert
                                severity="error"
                                action={
                                    <IconButton
                                        aria-label="close"
                                        color="inherit"
                                        size="small"
                                        onClick={() => {
                                            setError(false);
                                        }}
                                    >
                                        <CloseIcon fontSize="inherit" />
                                    </IconButton>
                                }
                            >
                                <p>
                                    <strong>Oops</strong> It seems that location
                                    does not exist! Please try again.
                                </p>
                            </Alert>
                        </Grid>
                    </Grid>
                </Grid>
            ) : (
                <div></div>
            )}
            <Card className={classes.root}>
                <CardContent>
                    <p>
                        Weather today in <b>{weatherData.name}</b>
                    </p>
                    <p className={classes.text}>{weatherData.main}</p>
                    <p className={classes.text}>
                        <img
                            src={`http://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
                        ></img>
                    </p>
                    <Grid container spacing={0}>
                        <Grid item xs={12}>
                            <Grid container direction="row" spacing={4}>
                                <Grid item>
                                    <Table className={classes.table}>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell
                                                    className={classes.text}
                                                >
                                                    Temperature:
                                                </TableCell>
                                                <TableCell
                                                    className={classes.text}
                                                    align="right"
                                                >
                                                    {weatherData.temp}&deg;C
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell
                                                    className={classes.text}
                                                >
                                                    Feels like:
                                                </TableCell>
                                                <TableCell
                                                    className={classes.text}
                                                    align="right"
                                                >
                                                    {weatherData.feels_like}
                                                    &deg;C
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell
                                                    className={classes.text}
                                                >
                                                    High/Low:
                                                </TableCell>
                                                <TableCell
                                                    className={classes.text}
                                                    align="right"
                                                >
                                                    {weatherData.temp_max}
                                                    &deg;C/
                                                    {weatherData.temp_min}&deg;C
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell
                                                    className={classes.text}
                                                >
                                                    Pressure:
                                                </TableCell>
                                                <TableCell
                                                    className={classes.text}
                                                    align="right"
                                                >
                                                    {weatherData.pressure} mb
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </Grid>
                                <Grid item>
                                    <Table className={classes.table}>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell
                                                    className={classes.text}
                                                >
                                                    Humidity:
                                                </TableCell>
                                                <TableCell
                                                    className={classes.text}
                                                    align="right"
                                                >
                                                    {weatherData.humidity}%
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell
                                                    className={classes.text}
                                                >
                                                    Country:
                                                </TableCell>
                                                <TableCell
                                                    className={classes.text}
                                                    align="right"
                                                >
                                                    {weatherData.country}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell
                                                    className={classes.text}
                                                >
                                                    Sunrise:
                                                </TableCell>
                                                <TableCell
                                                    className={classes.text}
                                                    align="right"
                                                >
                                                    {formatTimestamp(
                                                        weatherData.sunrise
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell
                                                    className={classes.text}
                                                >
                                                    Sunset:
                                                </TableCell>
                                                <TableCell
                                                    className={classes.text}
                                                    align="right"
                                                >
                                                    {formatTimestamp(
                                                        weatherData.sunset
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </div>
    );
}
