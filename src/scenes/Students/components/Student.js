import React from 'react';
import { Button } from 'reactstrap';

const BACKEND_URL = 'http://localhost:3001';

const SEND_NOTIFICATION_URL = '/sendNotification';

export default class Student extends React.Component {

  constructor(props) {
    super(props);
    this.state = { date: new Date() };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();

    var data = {
      name: this.props.name,
      email: this.props.email,
      phone: this.props.phone,
      isAppActive: this.props.isAppActive,
      token: this.props.token
    }

    fetch(BACKEND_URL + SEND_NOTIFICATION_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  }

  render() {
    return (
      <tr>
        <th scope="row">{this.props.id}</th>
        <th >{this.props.name}</th>
        <th >{this.props.email}</th>
        <th >{this.props.phone}</th>
        <th>{this.props.token}</th>
        <th>{this.props.isAppActive}</th>
        <th>{this.props.createdAt}</th>
        <th>
          <Button color="primary" onClick={this.handleClick}>Notificate</Button>
        </th>
      </tr>

    );
  }
}