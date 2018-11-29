import React, { Component } from 'react';

class Home extends Component{
  constructor() {
    super();
    this.state = {
      name: 'Janet Doe',
      users: []
    };
    this.addUser = this.addUser.bind(this);
  }

  addUser() {
    this.setState({
      users: this.state.users.concat('new user')
    });
  }

  render() {
    const { name, users } = this.state;
    return (
      <React.Fragment>
        <h1>This is my page - { name }</h1>
        <p>This is the homepage</p>
        <button onClick={this.addUser}>Add User</button>
        <h4>Current Users</h4>
        <ul>
          { users.map((user, index) => (
            <li key={index}>{user}</li>
          )) }
        </ul>
      </React.Fragment>
    );
  }
}

export default Home;
