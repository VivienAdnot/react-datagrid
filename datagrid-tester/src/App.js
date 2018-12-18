import React, { Component } from 'react';
import axios from 'axios';

import './App.css';
import Grid from './datagrid/grid';

// batch of 1000 rows
const smallBatchRoute = 'http://localhost:8091/api/data/smallbatch';

// batch of 100000 rows
//const bigBatchRoute = 'http://localhost:8091/api/data/bigbatch';

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
    axios.get(smallBatchRoute)
    .then(({ data }) => {
      this.setState({ data });
    });
  }

  render() {
    return (
      <div className="App">
      {
        (this.state.data.length) && (
          <Grid data={this.state.data} columns={columns} pageSize={50} />
        )
      }
      </div>
    );
  }
}

export default App;
