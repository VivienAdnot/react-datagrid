import React, { Component, Fragment } from 'react';
import Cell from './cell';

class Row extends Component {
    render() {
        return (
            <Fragment>
                <div className="grid-tr">
                    {this.props.columns.map(({accessor}, index) => (
                        <Cell key={index} value={this.props.entry[accessor]} />
                    ))}
                    <div className="grid-td">
                        <button onClick={this.props.onDeleteRow}>delete</button>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Row;
