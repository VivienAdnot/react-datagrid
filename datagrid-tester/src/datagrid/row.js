import React, { Component, Fragment } from 'react';
import { Delete } from 'react-feather';
import Cell from './cell';

class Row extends Component {
    render() {
        return (
            <Fragment>
                <tr className="grid-tr">
                    {this.props.columns.map(({accessor}, index) => (
                        <Cell key={index} value={this.props.entry[accessor]} />
                    ))}
                    <td className="grid-td btn">
                        <Delete onClick={this.props.onDeleteRow}></Delete>
                    </td>
                </tr>
            </Fragment>
        );
    }
}

export default Row;
