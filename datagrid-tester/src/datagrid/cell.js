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
                <td className="grid-td">
                {/* {this.state.value} */}
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                </td>
            </Fragment>
        );
    }
}

export default Cell;
