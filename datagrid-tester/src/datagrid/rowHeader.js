import React, { Component, Fragment } from 'react';

class RowHeader extends Component {
    render() {
        return (
            <Fragment>
                {this.props.columns.map(({ header }, index) => (
                    <span key={index} onDoubleClick={() => this.props.sortColumn(header)}>
                        <strong>{header}</strong>
                    </span>
                ))}
                <span>
                    <strong>Delete column</strong>
                </span>
            </Fragment>
        );
    }
}

export default RowHeader;
