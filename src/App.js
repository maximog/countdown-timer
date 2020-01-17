import React, { Component } from 'react';
import moment from 'moment';
import './App.css';

const timeFormat = "YYYY-MM-DDTHH:mm";

const initialState = {
    timeTillDate: undefined,
    months: undefined,
    days: undefined,
    hours: undefined,
    minutes: undefined,
    seconds: undefined
}

class Countdown extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      // const { timeTillDate, timeFormat } = this.props;
      const then = moment(this.state.timeTillDate, timeFormat);
      const now = moment();
      const countdown = moment(then - now);
      const months = countdown.subtract(1, 'months').format('MM');
      const days = countdown.format('D');
      const hours = countdown.format('HH');
      const minutes = countdown.format('mm');
      const seconds = countdown.format('ss');

      this.setState({ months, days, hours, minutes, seconds });


    }, 1000);
  }

  componentWillUnmount() {
    if(this.interval) {
      clearInterval(this.interval);
    }
  }

  onDateChange = (event) => {
    this.setState({ timeTillDate: event.target.value })
    // console.log(event.target.value)

} 


  render() {
    const { timeTillDate, months, days, hours, minutes, seconds } = this.state;

    return (
      <div> 
        <input
          id="date"
          type='datetime-local'
          onChange={this.onDateChange}
          // defaultValue= {moment().format('YYYY-MM-DDTHH:mm')}
        />
        <div>Insert Date for Countdown</div>
      
      {timeTillDate ? 
       <div>
          <h1>Countdown</h1>
          <div className='countdown-wrapper'>
            <div className='countdown-item'>
              <span>Selected End Date: </span>
              {moment(timeTillDate).format("dddd, MMMM Do YYYY, h:mm:ss a")}
            </div> 
            <div className='countdown-item'>
              {months}
              <span> Months</span>
            </div>
            <div className='countdown-item'>
              {days}
              <span> Days</span>
            </div>
            <div className='countdown-item'>
              {hours}
              <span> Hours</span>
            </div>
            <div className='countdown-item'>
              {minutes}
              <span> Minutes</span>
            </div>
            <div className='countdown-item'>
              {seconds}
              <span> Seconds</span>
            </div>
          </div>
        </div>
      : <div>(No Date selected)</div>}
      </div>
    );
  }

}



export default Countdown;
