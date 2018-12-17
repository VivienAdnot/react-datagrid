import React, { Component, Fragment } from 'react';

class Cell extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: props.value,
            readonly: true
        };

        this.elRef = React.createRef();
    }

    componentDidMount() {
        this.width = this.elRef.current.clientWidth;
    }

    onStartEdit = () => {
        this.width = this.elRef.current.clientWidth;
        this.setState({
            readonly: false
        });
    }

    onEndEdit = () => {
        this.setState({
            readonly: true
        });
    }

    handleChange = event => {
        this.setState({
            value: event.target.value
        });

        //call back-end
    };

    render() {
        return (
            <Fragment>
                <td className="grid-td" ref={this.elRef} onClick={this.onStartEdit}>
                {
                    (!this.state.readonly) ? (
                        <input
                        type="text"
                        style={{width: (this.width - 8)}}
                        value={this.state.value}
                        onChange={this.handleChange}
                        onMouseOut={this.onEndEdit}
                        onMouseLeave={this.onEndEdit} />
                    ) : (
                        this.state.value
                    )
                }

                </td>
            </Fragment>
        );
    }
}

export default Cell;
