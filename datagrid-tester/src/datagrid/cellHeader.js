import React, { Component, Fragment } from 'react';
import { ChevronUp, ChevronDown } from 'react-feather';
import { SORT_ASC } from './config';

class CellHeader extends Component {

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

    getSortingSymbol = () => {
        if (this.props.noSort) {
            return null;
        }

        return (this.props.sortStatus === SORT_ASC) ? (
            <ChevronUp
                className="btn btn-chevron"
                onClick={this.props.onSortColumn}
            ></ChevronUp>
        ) : (
            <ChevronDown
                className="btn btn-chevron"
                onClick={this.props.onSortColumn}
            ></ChevronDown>
        );
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
                    {
                        this.getSortingSymbol()
                    }
                </th>

            </Fragment>
        );
    }
}

CellHeader.defaultProps = {
    value: '',
    noSort: false
};

export default CellHeader;
