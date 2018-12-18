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

    onStartEdit = () => {
        this.width = this.elRef.current.clientWidth - 26;
        this.setState({
            readonly: false
        });
    }

    onEndEdit = () => {
        this.setState({
            readonly: true
        });
    }

    onEdit = event => {
        this.setState({
            value: event.target.value
        });
    };

    render() {
        return (
            <Fragment>
                <td className="grid-td" ref={this.elRef} onClick={this.onStartEdit}>
                {
                    (!this.state.readonly) ? (
                        <input
                        type="text"
                        style={{width: (this.width)}}
                        value={this.state.value}
                        onChange={this.onEdit}
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
