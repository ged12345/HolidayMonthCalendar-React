import React from "react";
import iconsearch from "../js/iconsearch.js";
import HolidayDisplay from "./HolidayDisplay";
import Spinner from "./Spinner";

class App extends React.Component {
    state = { lat: null, iconFile: null, errorMessage: "" };

    async componentDidMount() {
        window.navigator.geolocation.getCurrentPosition(
            (position) => this.setState({ lat: position.coords.latitude }),
            (err) => this.setState({ errorMessage: err.message })
        );

        // We need a config file - we may keep this in a separate file
        // then we pass the icon and day down to the holidayDisplay component
        const iconFile = await iconsearch("christmas");
        this.setState({ iconFile: iconFile });
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
