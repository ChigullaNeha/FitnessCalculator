import React, { Component, FormEvent, ChangeEvent } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import { Navigate, redirect } from 'react-router-dom';
import Cookies from 'js-cookie'
import './index.css';

class LoginForm extends Component {
  state = {username: '', password: '', showSubmitError: false, errorMsg: '', redirect: false}

  componentDidMount() {
    this.getData();
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    this.setState({redirect: true})
    const {redirect} = this.state
    if (redirect) {
      <Navigate to="/" />
    }
  }

  onSubmitFailure = (errorMsg: string) => {
    this.setState({showSubmitError: true, errorMsg, redirect: false})
  }

  onSubmitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const url = 'https://apis.ccbp.in/login';
    const { username, password } = this.state;
    const userDetails = { username, password };
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok === true) {
        this.onSubmitSuccess(data.jwt_token)
      }
      else {
        this.onSubmitFailure(data.error_msg)
      }
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  getData = async () => {
    const options: AxiosRequestConfig = {
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
  };

  onChangeUsername = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ username: event.target.value });
  };

  onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ password: event.target.value });
  };

  render() {
    const { username, password, showSubmitError, errorMsg, redirect} = this.state;
    if (!redirect) {
      return <Navigate to="/login" />
    }
    return (
      <div className='container'>
        <div className="form-container">
          <form onSubmit={this.onSubmitForm}>
            <label htmlFor="USERNAME">USERNAME</label>
            <br />
            <input type="text" value={username} onChange={this.onChangeUsername} className="input-el" />
            <br />
            <label htmlFor="PASSWORD">PASSWORD</label>
            <br />
            <input type="password" value={password} onChange={this.onChangePassword} className="input-el" />
            <br />
            <button type="submit" className="login-btn">
              Login
            </button>
            {showSubmitError && <p className='error-msg'>*{errorMsg}</p>}
          </form>
        </div>
      </div>
    );
  }
}

export default LoginForm;
