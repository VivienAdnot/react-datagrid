import React, { Component, PropTypes } from 'react';
import Select from 'react-select';
import Row from './row';
import RowHeader from './rowHeader';
import config from './config';

const SORT_ASC = 1;
const SORT_DESC = 2;

class Grid extends Component {
    constructor(props) {
        super(props);

        this.state = {
            columns: props.columns.map(column => ({
                id: column,
                sortStatus: SORT_ASC
            })),
            //data: props.data,
            dataSubset: props.data.slice(0, props.pageSize),
            paginations: this.getAllPaginations(),
            currentPaginationMinIndex: 0,
            currentPaginationMaxIndex: props.pageSize - 1,
            isPrevButtonActive: false,
            isNextButtonActive: true,
            selectedOption: { value: 1, label: '1' }
        };
    }

    getAllPaginations = () => {
        var integerDivision = Math.trunc(this.props.data.length / this.props.pageSize);
        if (this.props.data.length / this.props.pageSize) {
            integerDivision += 1;
        }

        return Array.from({ length: integerDivision }, (value, index) => {
            return { value: index + 1, label: (index + 1).toString() };
        });
    };

    getNextToggleSortStatus = sortStatus => {
        switch (sortStatus) {
            case SORT_ASC:
                return SORT_DESC;
            case SORT_DESC:
                return SORT_ASC;
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
        console.log(rowId);
        this.setState(prevState => {
            return {
                data: prevState.data.filter(x => x.id !== rowId)
            };
        });

        //call back-end
    };

    prevSubset = () => {
        this.setState(prevState => {
            const currentPaginationMinIndex =
                prevState.currentPaginationMinIndex - this.props.pageSize;
            const currentPaginationMaxIndex =
                prevState.currentPaginationMaxIndex - this.props.pageSize;

            const isPrevButtonActive = currentPaginationMinIndex > 0;
            const isNextButtonActive = currentPaginationMaxIndex < this.props.data.length - 1;

            return {
                selectedOption: {
                    value: prevState.selectedOption.value - 1,
                    label: (prevState.selectedOption.value - 1).toString()
                },
                currentPaginationMinIndex,
                currentPaginationMaxIndex,
                isPrevButtonActive,
                isNextButtonActive,
                dataSubset: this.props.data.slice(
                    currentPaginationMinIndex,
                    currentPaginationMaxIndex + 1
                )
            };
        });
    };

    nextSubset = () => {
        this.setState(prevState => {
            const currentPaginationMinIndex =
                prevState.currentPaginationMinIndex + this.props.pageSize;
            const currentPaginationMaxIndex =
                prevState.currentPaginationMaxIndex + this.props.pageSize;

            const isPrevButtonActive = currentPaginationMinIndex > 0;
            const isNextButtonActive = currentPaginationMaxIndex < this.props.data.length - 1;

            return {
                selectedOption: {
                    value: prevState.selectedOption.value + 1,
                    label: (prevState.selectedOption.value + 1).toString()
                },
                currentPaginationMinIndex,
                currentPaginationMaxIndex,
                isPrevButtonActive,
                isNextButtonActive,
                dataSubset: this.props.data.slice(
                    currentPaginationMinIndex,
                    currentPaginationMaxIndex + 1
                )
            };
        });
    };

    getPaginationFromIndex = index => {
        const currentPaginationMinIndex = (index - 1) * this.props.pageSize;
        const currentPaginationMaxIndex = currentPaginationMinIndex + this.props.pageSize - 1;
        return {
            currentPaginationMinIndex,
            currentPaginationMaxIndex
        };
    };

    handleChange = selectedOption => {
        this.setState(prevState => {
            const {
                currentPaginationMinIndex,
                currentPaginationMaxIndex
            } = this.getPaginationFromIndex(selectedOption.value);

            const isPrevButtonActive = currentPaginationMinIndex > 0;
            const isNextButtonActive = currentPaginationMaxIndex < this.props.data.length - 1;

            return {
                selectedOption,
                currentPaginationMinIndex,
                currentPaginationMaxIndex,
                isPrevButtonActive,
                isNextButtonActive,
                dataSubset: this.props.data.slice(
                    currentPaginationMinIndex,
                    currentPaginationMaxIndex + 1
                )
            };
        });
    };

    render() {
        const { selectedOption } = this.state;
        return (
            <div className="grid">
                <RowHeader columns={this.props.columns} sortColumn={this.sortColumn} />
                {this.state.dataSubset.map((entries, index) => (
                    <Row
                        key={entries.id}
                        data={entries}
                        onDeleteRow={() => this.onDeleteRow(entries.id)}
                    />
                ))}
                <button onClick={this.prevSubset} disabled={!this.state.isPrevButtonActive}>
                    previous
                </button>

                <Select
                    value={selectedOption}
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
