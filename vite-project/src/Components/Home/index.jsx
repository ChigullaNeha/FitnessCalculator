import { Component } from "react";
import './index.css'
import axios from "axios";
import {Oval} from 'react-loader-spinner'
import { redirect } from "react-router-dom";

class Home extends Component {
  state = {dataList: [], bmiErr: [], macroNutientsTable: [], isLoading: false, redirect: false}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const options = {
        method: 'GET',
        url: 'https://exercise-db-fitness-workout-gym.p.rapidapi.com/exercises/mechanic/isolation',
        headers: {
          'X-RapidAPI-Key': '147ef5442fmsh56eb70272de61abp1a7679jsn0323475aaf8f',
          'X-RapidAPI-Host': 'exercise-db-fitness-workout-gym.p.rapidapi.com'
        }
      };
      
      try {
          const response = await axios.request(options);
          console.log(response.data);
          this.setState({dataList: response.data, isLoading: true})
      } catch (error) {
          console.error(error);
      }
  }
  render () {
    const {dataList, isLoading} = this.state
    console.log(dataList)
    return (
        <div className="data-container">
        <div className="heading-container">
      <div className="h-container">
        <h1 className="heading">Nutrition Calculator</h1>
        {!isLoading && <Oval />}
        <div>
        {dataList.map(each => (
        <div className="home-container">
          <h1 className="paragraph">{each.category}</h1>
          <p className="paragraph">Equipment: {each.equipment}</p>
          <p className="paragraph">Level: {each.level}</p>
          <ul>
          {each.instructions.map(eachIns => (
            <li>{eachIns}</li>
          ))}
          </ul>
        </div>
        ))}
        </div>
      </div>
      </div>
      </div>
    )
  }
}
export default Home
