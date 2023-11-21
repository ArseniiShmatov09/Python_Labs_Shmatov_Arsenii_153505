import React, { Component } from 'react';
import './styles/userZone.css';

class TimeZoneInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      localTime: '',
      utcTime: '',
      userTimeZone: '',
    };
  }

  componentDidMount() {
    this.getUserTimeZoneInfo();
    this.intervalId = setInterval(this.updateTimes, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  getUserTimeZoneInfo = () => {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    this.setState({ userTimeZone: timeZone });
  };

  updateTimes = () => {
    const now = new Date();

    const localTimeOptions = {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZoneName: 'short',
    };
    const localTimeString = now.toLocaleString(undefined, localTimeOptions);
    this.setState({ localTime: localTimeString });

    const utcTimeOptions = {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZone: 'UTC',
    };
    const utcTimeString = now.toLocaleString(undefined, utcTimeOptions);
    this.setState({ utcTime: utcTimeString });
  };

  render() {
    const { userTimeZone, localTime, utcTime } = this.state;

    return (
      <div className="time-info">
      <p>Тайм зона пользователя: <span>{this.state.userTimeZone}</span></p>
      <p>Локальное время: <span>{this.state.localTime}</span></p>
      <p>Время в UTC: <span>{this.state.utcTime}</span></p>
    </div>
    );
  }
}

export default TimeZoneInfo;
