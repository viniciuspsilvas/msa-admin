import React from 'react';
import { Button } from 'reactstrap';

const BACKEND_URL = 'http://localhost:3001';

const SEND_NOTIFICATION_URL = '/sendNotification';

export default class MobileUser extends React.Component {

  constructor(props) {
    super(props);
    this.state = { date: new Date() };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();

    var data = {
      username: this.props.username,
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
        <th >{this.props.username}</th>
        <th>{this.props.token}</th>
        <th>{this.props.dateCreated}</th>
        <th>
          <Button color="primary" onClick={this.handleClick}>Notificate</Button>
        </th>
      </tr>

    );
  }
}