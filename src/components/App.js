import React from "react";
import iconsearch from "../js/iconsearch.js";
import holidayconfig from "./holidayConfig";
import HolidayDisplay from "./HolidayDisplay";
import Spinner from "./Spinner";

class App extends React.Component {
    state = {
        lat: null,
        iconFile: null,
        chosenHoliday: "Holiday Month Calendar",
        chosenMessage: "",
        errorMessage: "",
    };

    async componentDidMount() {
        window.navigator.geolocation.getCurrentPosition(
            (position) => this.setState({ lat: position.coords.latitude }),
            (err) => this.setState({ errorMessage: err.message })
        );

        var chosenHoliday = this.state.chosenHoliday;
        var chosenMessage = this.state.chosenMessage;

        for (var key in holidayconfig) {
            if (
                holidayconfig[key].date.getMonth() === new Date().getMonth() &&
                holidayconfig[key].date.getDay() <= new Date().getDay()
            ) {
                chosenHoliday = key;
                chosenMessage = holidayconfig[key].message;
            }
        }

        // We need a config file - we may keep this in a separate file
        // then we pass the icon and day down to the holidayDisplay component
        const iconFile = await iconsearch(chosenHoliday);
        this.setState({
            iconFile: iconFile,
            chosenHoliday: chosenHoliday,
            chosenMessage: chosenMessage,
        });
    }

    renderContent() {
        if (this.state.errorMessage && !this.state.lat) {
            return <div>Error: {this.state.errorMessage}</div>;
        }

        if (!this.state.errorMessage && this.state.lat) {
            return (
                <HolidayDisplay
                    lat={this.state.lat}
                    iconFile={this.state.iconFile}
                    chosenHoliday={this.state.chosenHoliday}
                    chosenMessage={this.state.chosenMessage}
                />
            );
        }

        return <Spinner message="Please accept location request." />;
    }

    render() {
        return <div className="bordér red">{this.renderContent()}</div>;
    }
}

export default App;
