const React = require("react");
const axios = require("axios");
class home extends React.Component {
  state = {
    jokes: []
  };
  componentDidMount = () => {
    let token = localStorage.getItem("User");

    let config = {
      headers: {
        Authorization: JSON.parse(token).token
      }
    };
    axios.get("/api/jokes", config).then(res => {
      this.setState({
        jokes: res.data
      });
    });
  };
  jokes() {
    let { jokes } = this.state;
    if (jokes) {
      return jokes.map(data => {
        console.log(data.joke);
        return (
          <div>
            <p>{data.joke}</p>
          </div>
        );
      });
    }
  }
  render() {
    return <div>{this.jokes()}</div>;
  }
}

export default home;
