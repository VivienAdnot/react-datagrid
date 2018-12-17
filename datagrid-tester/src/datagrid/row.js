import React, { Component, Fragment } from 'react';
import Cell from './cell';

class Row extends Component {
    render() {
        return (
            <Fragment>
                <tr className="grid-tr">
                    {this.props.columns.map(({accessor}, index) => (
                        <Cell key={index} value={this.props.entry[accessor]} />
                    ))}
                    <td className="grid-td">
                        <button onClick={this.props.onDeleteRow}>delete</button>
                    </td>
                </tr>
            </Fragment>
        );
    }
}

export default Row;
