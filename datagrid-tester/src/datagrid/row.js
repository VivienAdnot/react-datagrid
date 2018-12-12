import React, { Component, Fragment } from 'react';
import Cell from './cell';

class Row extends Component {
    render() {
        return (
            <Fragment>
                {this.props.columns.map(({accessor}, index) => (
                    <Cell key={index} value={this.props.entry[accessor]} />
                ))}
                <span>
                    <button onClick={this.props.onDeleteRow}>delete</button>
                </span>
            </Fragment>
        );
    }
}

export default Row;
