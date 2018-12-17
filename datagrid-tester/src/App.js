import React, { Component } from 'react';
import axios from 'axios';

import './App.css';
import Grid from './datagrid/grid';

const columns = [{
  header: 'Id',
  accessor: 'id'
}, {
  header: 'Firstname',
  accessor: 'first_name'
}, {
  header: 'Lastname',
  accessor: 'last_name'
}, {
  header: 'Email',
  accessor: 'email'
}, {
  header: 'Gender',
  accessor: 'gender'
}, {
  header: 'IP Address',
  accessor: 'ip_address'
}];

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:8089/api/data')
    .then(({ data }) => {
      this.setState({ data });
    });
  }

  render() {
    return (
      <div className="App">
      {
        (this.state.data.length) && (
          <Grid data={this.state.data} columns={columns} pageSize={10} />
        )
      }
      </div>
    );
  }
}

export default App;
