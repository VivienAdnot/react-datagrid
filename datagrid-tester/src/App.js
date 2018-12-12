import React, { Component } from 'react';
import './App.css';

import Grid from './datagrid/grid';
import data from './database/data';

const columns = ['id', 'firstname', 'lastname', 'jobTitle', 'company'];

class App extends Component {
  render() {
    return (
      <div className="App">
          <Grid data={data} columns={columns} pageSize={3} />
      </div>
    );
  }
}

export default App;
