import axios from "axios";

export default axios.create({
    //baseURL: "https://api.iconfinder.com/v4/",
    baseURL: "http://localhost:8010/proxy",
    headers: {
        Authorization:
            "Bearer SWWND5TCq6HmgKmJOzW2iTK00WRMuHmcfiB9t8lDttHjFYN517O8mymhPJIH3YSr",
    },
});
