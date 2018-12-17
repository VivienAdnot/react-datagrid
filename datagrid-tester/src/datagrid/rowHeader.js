import React, { Component, Fragment } from 'react';
import CellHeader from './cellHeader';

class RowHeader extends Component {

    render() {
        return (
            <Fragment>
                <thead className="grid-thead">
                    <tr className="grid-tr">
                        {this.props.columns.map(({ header }, index) => (
                            <CellHeader key={index} value={header} onDoubleClick={() => this.props.sortColumn(header)}></CellHeader>
                        ))}
                        <CellHeader value={""}></CellHeader>
                    </tr>
                </thead>
            </Fragment>
        );
    }
}

export default RowHeader;
