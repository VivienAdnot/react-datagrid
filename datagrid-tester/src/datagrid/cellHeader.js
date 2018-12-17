import React, { Component, Fragment } from 'react';

class Cell extends Component {

    constructor(props) {
        super(props);

        this.state = {
            width: 'auto'
        }

        this.elRef = React.createRef();
    }

    onMouseDown = (e) => {

        this.pressed = true;
        this.startX = e.pageX;

        this.startWidth = this.elRef.current.clientWidth;
    }

    onMouseMove = (e) => {

        if(this.pressed) {
            const newWidth = this.startWidth + (e.pageX - this.startX);
            console.log(newWidth);

            this.setState({
                width: newWidth
            });
        }
    }

    onMouseUp = () => {
        this.pressed = false;
    }

    render() {
        return (
            <Fragment>
                <th
                    ref={this.elRef}
                    className="grid-th"
                    onMouseDown={this.onMouseDown}
                    onMouseMove={this.onMouseMove}
                    onMouseUp={this.onMouseUp}
                    onMouseOut={this.onMouseUp}
                    style={{width: this.state.width}}
                >
                    {this.props.value}
                </th>

            </Fragment>
        );
    }
}

export default Cell;
