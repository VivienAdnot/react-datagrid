import React, { Component, Fragment } from 'react';

class RowHeader extends Component {
    render() {
        return (
            <Fragment>
                <div className="grid-thead">
                    <div className="grid-tr">
                        {this.props.columns.map(({ header }, index) => (
                            <div className="grid-th grid-resizable-header" key={index} onDoubleClick={() => this.props.sortColumn(header)}>
                                <div className="grid-resizable-header-content">{header}</div>
                                <div className="grid-resizer"></div>
                            </div>
                        ))}
                        <div className="grid-th grid-resizable-header">Delete column</div>
                    </div>

                </div>
            </Fragment>
        );
    }
}

export default RowHeader;
