import React, { Component, PropTypes } from 'react';
import Select from 'react-select';
import Row from './row';
import RowHeader from './rowHeader';
import config from './config';

const SORT_ASC = 1;
const SORT_DESC = 2;

const createSelectOption = (value) => ({
    value,
    label: (value).toString()
});

const getAllPaginations = (dataLength, pageSize) => {
    var integerDivision = Math.trunc(dataLength / pageSize);
    if (dataLength / pageSize) {
        integerDivision += 1;
    }

    return Array.from({ length: integerDivision }, (value, index) => {
        return createSelectOption(index + 1);
    });
};

const getPaginationFromIndex = (index, pageSize) => {
    const paginationStart = (index - 1) * pageSize;
    const paginationEnd = paginationStart + pageSize - 1;
    return {
        paginationStart,
        paginationEnd
    };
};

class Grid extends Component {
    constructor(props) {
        super(props);

        this.state = {
            columns: props.columns.map(column => ({
                id: column,
                sortStatus: SORT_ASC
            })),
            data: props.data,
            paginations: getAllPaginations(props.data.length, props.pageSize),
            paginationStart: 0,
            paginationEnd: props.pageSize - 1,
            isPrevButtonActive: false,
            isNextButtonActive: true,
            selectedOption: config.defaulSelectedOption
        };
    }



    getNextToggleSortStatus = sortStatus => {
        switch (sortStatus) {
            case SORT_ASC:
                return SORT_DESC;
            case SORT_DESC:
                return SORT_ASC;
            default:
                throw new Error('Unsupported sort status: ', sortStatus);
        }
    };

    getRowComparer = (sortStatus, field) => {
        switch (sortStatus) {
            case SORT_ASC:
                return (rowA, rowB) => {
                    if (rowA[field] < rowB[field]) return -1;
                    if (rowA[field] > rowB[field]) return 1;
                    else return 0;
                };
            case SORT_DESC:
                return (rowA, rowB) => {
                    if (rowA[field] < rowB[field]) return 1;
                    if (rowA[field] > rowB[field]) return -1;
                    else return 0;
                };
            default:
                throw new Error('Unsupported sort status: ', sortStatus);
        }
    };

    sortColumn = columnId => {
        const column = this.state.columns.find(column => column.id === columnId);
        const sortStatus = column.sortStatus;
        const rowComparer = this.getRowComparer(sortStatus, columnId);
        const nextStatus = this.getNextToggleSortStatus(column.sortStatus);

        this.setState(prevState => {
            return {
                columns: prevState.columns.map(column => {
                    if (column.id === columnId) {
                        return {
                            id: columnId,
                            sortStatus: nextStatus
                        };
                    }

                    return column;
                }),
                data: prevState.data.sort(rowComparer)
            };
        });
    };

    onDeleteRow = rowId => {
        this.setState(prevState => {
            return {
                data: prevState.data.filter(x => x.id !== rowId)
            };
        });

        //call back-end
    };

    prevSubset = () => {
        this.setState(prevState => {
            const paginationStart = prevState.paginationStart - this.props.pageSize;
            const paginationEnd = prevState.paginationEnd - this.props.pageSize;

            const isPrevButtonActive = paginationStart > 0;
            const isNextButtonActive = paginationEnd < this.props.data.length - 1;

            return {
                selectedOption: createSelectOption(prevState.selectedOption.value - 1),
                paginationStart,
                paginationEnd,
                isPrevButtonActive,
                isNextButtonActive
            };
        });
    };

    nextSubset = () => {
        this.setState(prevState => {
            const paginationStart = prevState.paginationStart + this.props.pageSize;
            const paginationEnd = prevState.paginationEnd + this.props.pageSize;

            const isPrevButtonActive = paginationStart > 0;
            const isNextButtonActive = paginationEnd < this.props.data.length - 1;

            return {
                selectedOption: createSelectOption(prevState.selectedOption.value + 1),
                paginationStart,
                paginationEnd,
                isPrevButtonActive,
                isNextButtonActive
            };
        });
    };



    handleChange = selectedOption => {
        this.setState(prevState => {
            const {
                paginationStart,
                paginationEnd
            } = getPaginationFromIndex(selectedOption.value, this.props.pageSize);

            const isPrevButtonActive = paginationStart > 0;
            const isNextButtonActive = paginationEnd < this.props.data.length - 1;

            return {
                selectedOption,
                paginationStart,
                paginationEnd,
                isPrevButtonActive,
                isNextButtonActive
            };
        });
    };

    render() {
        const subset = this.state.data.slice(this.state.paginationStart, this.state.paginationEnd + 1);
        return (
            <div className="grid">
                <RowHeader columns={this.props.columns} sortColumn={this.sortColumn} />
                {subset.map((entry) => (
                    <Row
                        columns={this.props.columns}
                        key={entry.id}
                        entry={entry}
                        onDeleteRow={() => this.onDeleteRow(entry.id)}
                    />
                ))}
                <button onClick={this.prevSubset} disabled={!this.state.isPrevButtonActive}>
                    previous
                </button>

                <Select
                    value={this.state.selectedOption}
                    onChange={this.handleChange}
                    options={this.state.paginations}
                />

                <button onClick={this.nextSubset} disabled={!this.state.isNextButtonActive}>
                    next
                </button>
            </div>
        );
    }
}

Grid.defaultProps = {
    columns: [],
    data: [],
    pageSize: config.defaultPageSize
};

export default Grid;
