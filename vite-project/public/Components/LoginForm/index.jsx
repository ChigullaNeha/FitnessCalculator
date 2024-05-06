import { Component } from "react";
// const axios = require('axios');
import axios from 'axios'
import './index.css'

class LoginForm extends Component {
  state = {username: '', password: ''}
  
  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const options = {
        method: 'GET',
        url: 'https://exercise-db-fitness-workout-gym.p.rapidapi.com/exercises/muscle/chest',
        headers: {
          'X-RapidAPI-Key': '147ef5442fmsh56eb70272de61abp1a7679jsn0323475aaf8f',
          'X-RapidAPI-Host': 'exercise-db-fitness-workout-gym.p.rapidapi.com'
        }
      };
      
      try {
          const response = await axios.request(options);
          console.log(response.data);
      } catch (error) {
          console.error(error);
      }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({username: event.target.value})
  }

  render() {
    return (
      <div>
        <div className="form-container">
          <form>
            <label htmlFor="USERNAME">USERNAME</label>
            <br />
            <input type="text" onChange={this.onChangeUsername} className="input-el" />
            <br />
            <label htmlFor="PASSWORD">PASSWORD</label>
            <br />
            <input type="text" onChange={this.onChangePassword} className="input-el" />
            <br />
            <button type="button" className="login-btn">Login</button>
          </form>
        </div>
      </div>
    )
  }
}
export default LoginForm
