import React, { Component, Fragment } from 'react';

class Cell extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: props.value
        };
    }

    handleChange = event => {
        this.setState({ value: event.target.value });

        //call back-end
    };

    render() {
        return (
            <Fragment>
                <div className="grid-td">
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                </div>
            </Fragment>
        );
    }
}

export default Cell;
