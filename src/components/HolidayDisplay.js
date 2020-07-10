// Webpack includes this css in our index.html when combining files
import "./HolidayDisplay.css";
import React from "react";

// Configuration object
const holidayConfig = {
    summer: {
        text: "Let's hit the beach!",
        iconName: "sun",
    },
    winter: {
        text: "Burr, it is chilly",
        iconName: "snowflake",
    },
};

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

        const { text, iconName } = holidayConfig[season];

        return (
            <div className={`holiday-display ${season}`}>
                <img
                    alt=""
                    src={this.props.iconFile}
                    className={`icon-left icon`}
                />
                <h1>{text}</h1>
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
