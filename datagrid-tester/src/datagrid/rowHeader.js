import React, { Component, Fragment } from 'react';
import CellHeader from './cellHeader';

class RowHeader extends Component {

    render() {
        return (
            <Fragment>
                <thead className="grid-thead">
                    <tr className="grid-tr">
                        {this.props.columns.map(({ header, sortStatus }, index) => (
                            <CellHeader
                                key={index}
                                value={header}
                                sortStatus={sortStatus}
                                onSortColumn={() => this.props.onSortColumn(header)}
                            ></CellHeader>
                        ))}
                        <CellHeader noSort={true}></CellHeader>
                    </tr>
                </thead>
            </Fragment>
        );
    }
}

export default RowHeader;
