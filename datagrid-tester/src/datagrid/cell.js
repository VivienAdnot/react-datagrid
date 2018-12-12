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
                <span>
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                </span>
            </Fragment>
        );
    }
}

export default Cell;
