import React from "react";
import Info from "./components/Info";
import Form from "./components/Form";
import Weather from "./components/Weather";

const API_KEY_WEATHER = "0c740ebfa9536151546d7b536feb2ac6";

class App extends React.Component {

  state = {
    temp: undefined,
    city: undefined,
    country: undefined,
    sunrise: undefined,
    sunset: undefined,
    error: undefined
  }

  gettingWeather = async(e) => {
    e.preventDefault();
    var city = e.target.elements.city.value;
    const api_url = await
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY_WEATHER}`);
      const data = await api_url.json();

      if(city) {
      this.setState({
        temp: data.main.temp,
        city: data.name,
        country: data.sys.country,
        sunrise: data.sys.sunrise,
        sunset: data.sys.sunset,
        error: undefined
      });
    } else {
      this.setState({
        error: "ошибка: введите город"
      })
    }
  }

  render() {
    return (
      <div>
        <Info />
        <Form weatherMethod = {this.gettingWeather}/>
        <Weather
          temp={this.state.temp}
          city={this.state.city}
          country={this.state.country}
          sunrise={this.state.sunrise}
          sunset={this.state.sunset}
          error={this.state.error}
        />
      </div>
    )
  }
}

export default App;
