import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import { Grid } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import Radio from "@material-ui/core/Radio";
import WeatherDisplay from "./WeatherDisplay.js";
import { Alert } from "@material-ui/lab";
import CloseIcon from "@material-ui/icons/Close";
// install first import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexWrap: "wrap",
        flexGrow: 1,
        alignItems: "flex-start",
        justifyItems: "flex-start",
        width: "fill",
        height: "40vmin",
    },
    paper: {
        display: "flex",
        flexWrap: "wrap",
        alignItems: "left",
        width: "fill",
    },
    iconButton: {
        padding: 10,
    },
    textField: {
        margin: theme.spacing(1),
        width: "fill",
    },
    //========================== how to get border color on focus to change??
    input: {
        outlineColor: "#000000",
        color: "secondary",
        borderColor: "#80bdff",
        // '&$focused':{
        //     borderColor: '#80bdff'
        // }
    },
    grid: {
        padding: 5,
        //paddingLeft: theme.spacing(12),
    },
}));

export default function SearchBar() {
    // let history = useHistory();

    let userInput, latitudeInput, longitudeInput;
    const classes = useStyles();
    // const [userInput, setUserInput] = useState(); //
    const [radioValue, setRadioValue] = React.useState("city");
    const [searchTerm, setSearchTerm] = useState();
    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();
    const [search, setSearch] = useState(false);
    const [error, setError] = useState(false);
    const [errorType, setErrorType] = useState();
    // const [showResults, setShowResults] = useState();

    const handleChange = e => {
        // e.preventDefault();
        userInput = e.target.value;
        setSearchTerm(userInput);
        setSearch(false);
    };

    const handleChangeLatitude = e => {
        latitudeInput = e.target.value;
        setLatitude(latitudeInput);
        setSearch(false);
    };

    const handleChangeLongitude = e => {
        longitudeInput = e.target.value;
        setLongitude(longitudeInput);
        setSearch(false);
    };
    const handleChangeRadio = event => {
        setRadioValue(event.target.value);
        setSearch(false);
    };

    const handleKeyPress = e => {
        if (e.key === "Enter") {
            console.log(`Enter pressed`);
            if (searchTerm) {
                setSearch(true);
                setError(false);
            } else {
                setError(true);
                setErrorType("city");
            }
        }
    };

    const handleMouseDown = event => {
        // event.preventDefault();
        console.log("search icon clicked");
        if (searchTerm) {
            setSearch(true);
            setError(false);
        } else {
            setError(true);
            setErrorType("city");
        }
    };

    const handleMouseDownCoordinates = event => {
        if (latitude && longitude) {
            setSearch(true);
            setError(false);
        } else {
            setError(true);
            setErrorType("coordinates");
        }
    };
    return (
        <Grid container direction={"row"} className={classes.root}>
            <Grid item xs={12} className={classes.grid}>
                {radioValue === "city" ? (
                    <FormControl
                        className={classes.textField}
                        variant="outlined"
                    >
                        <Paper className={classes.paper} elevation={2}>
                            <OutlinedInput
                                classes={{ focused: classes.input }}
                                id="search-input"
                                type="text"
                                placeholder="Enter City Name"
                                value={userInput}
                                onChange={e => handleChange(e)}
                                onKeyPress={e => handleKeyPress(e)}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="search icon"
                                            // onClick={search}
                                            aria-autocomplete={"both"}
                                            onMouseDown={handleMouseDown}
                                            edge="end"
                                        >
                                            <SearchIcon />
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </Paper>
                    </FormControl>
                ) : (
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        spacing={1}
                    >
                        {/* <Grid item xs={3}></Grid> */}
                        <Grid item>
                            <FormControl
                                className={classes.textField}
                                variant="outlined"
                            >
                                <Paper className={classes.paper} elevation={2}>
                                    <OutlinedInput
                                        classes={{ focused: classes.input }}
                                        id="latitude"
                                        type="number"
                                        placeholder="Latitude"
                                        value={latitude}
                                        onChange={e => handleChangeLatitude(e)}
                                        required={true}
                                    />
                                </Paper>
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <FormControl
                                className={classes.textField}
                                variant="outlined"
                            >
                                <Paper className={classes.paper} elevation={2}>
                                    <OutlinedInput
                                        classes={{ focused: classes.input }}
                                        id="longitude"
                                        type="number"
                                        placeholder="Longitude"
                                        value={longitude}
                                        onChange={e => handleChangeLongitude(e)}
                                        required={true}
                                    />
                                </Paper>
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <FormControl
                                className={classes.textField}
                                variant="outlined"
                            >
                                <Paper
                                    className={classes.paper}
                                    elevation={2}
                                    padding={8}
                                >
                                    <IconButton
                                        padding={8}
                                        aria-label="search icon"
                                        aria-autocomplete={"both"}
                                        onMouseDown={handleMouseDownCoordinates}
                                        edge="end"
                                    >
                                        <SearchIcon />
                                    </IconButton>
                                </Paper>
                            </FormControl>
                        </Grid>
                    </Grid>
                )}
            </Grid>
            <Grid item xs={12} className={classes.grid}>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Search Type</FormLabel>
                    <RadioGroup
                        row
                        aria-label="Input"
                        name="input1"
                        value={radioValue}
                        onChange={handleChangeRadio}
                    >
                        <FormControlLabel
                            value="city"
                            control={<Radio />}
                            label="City"
                        />
                        <FormControlLabel
                            value="coordinates"
                            control={<Radio />}
                            label="Coordinates"
                        />
                    </RadioGroup>
                </FormControl>
            </Grid>
            {error ? (
                <Grid item xs={12} className={classes.grid}>
                    <Grid
                        container
                        direction="row"
                        alignitems="center"
                        justify="center"
                        className={classes.grid}
                    >
                        <Grid item xs={6} className={classes.grid}>
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
                                {errorType === "coordinates" ? (
                                    <p>
                                        <strong>Error</strong> Please enter both
                                        latitude and longitude!
                                    </p>
                                ) : (
                                    <p>
                                        <strong>Error</strong> Please enter a
                                        city name
                                    </p>
                                )}
                            </Alert>
                        </Grid>
                    </Grid>
                </Grid>
            ) : (
                <div></div>
            )}

            <Grid item xs={12}>
                <Grid
                    container
                    direction="row"
                    className={classes.grid}
                    alignContent="center"
                    alignitems="center"
                    justify="center"
                >
                    <Grid item xs={8} className={classes.grid}>
                        <WeatherDisplay
                            searchTerm={searchTerm}
                            latitude={latitude}
                            longitude={longitude}
                            searchType={radioValue}
                            search={search}
                        ></WeatherDisplay>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={2}></Grid>
        </Grid>
    );
}
