import React, { Component, Fragment } from 'react';
import Cell from './cell';

class Row extends Component {
    render() {
        return (
            <Fragment>
                {Object.values(this.props.data).map((value, index) => (
                    <Cell key={index} value={value} />
                ))}
                <span>
                    <button onClick={this.props.onDeleteRow}>delete</button>
                </span>
            </Fragment>
        );
    }
}

export default Row;
