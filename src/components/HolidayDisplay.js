// Webpack includes this css in our index.html when combining files
import "./HolidayDisplay.css";
import React from "react";

// Determine what season is
const getSeason = (lat, month) => {
    // if between march and august
    if (month > 2 && month < 9) {
        return lat > 0 ? "summer" : "winter";
    } else {
        return lat > 0 ? "winter" : "summer";
    }
};

class HolidayDisplay extends React.Component {
    render() {
        const season = getSeason(this.props.lat, new Date().getMonth());

        return (
            <div className={`holiday-display ${season}`}>
                <img
                    alt=""
                    src={this.props.iconFile}
                    className={`icon-left icon`}
                />
                <div className={`holiday ${season}`}>
                    <h1>{this.props.chosenHoliday.toUpperCase()}</h1>
                </div>
                <div className={`holiday message`}>
                    <h2>{this.props.chosenMessage}</h2>
                </div>
                <img
                    alt=""
                    src={this.props.iconFile}
                    className={`icon-right icon`}
                />
            </div>
        );
    }
}

export default HolidayDisplay;
