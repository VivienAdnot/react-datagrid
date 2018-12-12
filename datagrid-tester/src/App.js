import React, { Component } from 'react';
import './App.css';

import Grid from './datagrid/grid';
import data from './database/data';

const columns = [{
  header: 'Id',
  accessor: 'id'
}, {
  header: 'Firstname',
  accessor: 'firstname'
}, {
  header: 'Lastname',
  accessor: 'lastname'
}, {
  header: 'Job Title',
  accessor: 'jobTitle'
}, {
  header: 'Company',
  accessor: 'company'
}];

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
