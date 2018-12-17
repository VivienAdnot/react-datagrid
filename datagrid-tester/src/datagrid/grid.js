import React, { Component } from 'react';
import Select from 'react-select';
import Row from './row';
import RowHeader from './rowHeader';
import { config, SORT_ASC, SORT_DESC } from './config';

const createSelectOption = (value) => ({
    value,
    label: (value).toString()
});

const createAllOptions = (dataLength, pageSize) => {
    var integerDivision = Math.trunc(dataLength / pageSize);
    if (dataLength / pageSize) {
        integerDivision += 1;
    }

    return Array.from({ length: integerDivision }, (value, index) => {
        return createSelectOption(index + 1);
    });
};

const getPaginationLimitsFromIndex = (index, pageSize) => {
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
                ...column,
                sortStatus: SORT_ASC
            })),
            data: props.data,
            subset: props.data.slice(0, props.pageSize),
            paginations: createAllOptions(props.data.length, props.pageSize),
            paginationStart: 0,
            paginationEnd: props.pageSize - 1,
            canPrev: false,
            canNext: true,
            selectedOption: config.defaulSelectedOption
        };
    }

    toggleSort = sortStatus => {
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
                    return rowA[field].localeCompare(rowB[field]);
                };
            case SORT_DESC:
                return (rowA, rowB) => {
                    return rowB[field].localeCompare(rowA[field]);
                };
            default:
                throw new Error('Unsupported sort status: ', sortStatus);
        }
    };

    onSortColumn = columnId => {
        const column = this.state.columns.find(column => column.header === columnId);
        const sortStatus = column.sortStatus;

        const rowComparer = this.getRowComparer(sortStatus, column.accessor);
        const nextStatus = this.toggleSort(column.sortStatus);

        this.setState(prevState => {
            return {
                columns: prevState.columns.map(column => {
                    if (column.header === columnId) {
                        return {
                            ...column,
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
                data: prevState.data.filter(x => x.id !== rowId),
                paginations: createAllOptions(prevState.data.length - 1, this.props.pageSize),
                canNext: prevState.paginationEnd < prevState.data.length - 1
            };
        });

        //call back-end
    };

    prevSubset = () => {
        this.setState(prevState => {
            const paginationStart = prevState.paginationStart - this.props.pageSize;
            const paginationEnd = prevState.paginationEnd - this.props.pageSize;

            const canPrev = paginationStart > 0;
            const canNext = paginationEnd < this.props.data.length - 1;

            return {
                selectedOption: createSelectOption(prevState.selectedOption.value - 1),
                paginationStart,
                paginationEnd,
                canPrev,
                canNext
            };
        });
    };

    nextSubset = () => {
        this.setState(prevState => {
            const paginationStart = prevState.paginationStart + this.props.pageSize;
            const paginationEnd = prevState.paginationEnd + this.props.pageSize;

            const canPrev = paginationStart > 0;
            const canNext = paginationEnd < this.props.data.length - 1;

            return {
                selectedOption: createSelectOption(prevState.selectedOption.value + 1),
                paginationStart,
                paginationEnd,
                canPrev,
                canNext
            };
        });
    };

    handleChange = selectedOption => {
        this.setState(prevState => {
            const {
                paginationStart,
                paginationEnd
            } = getPaginationLimitsFromIndex(selectedOption.value, this.props.pageSize);

            const canPrev = paginationStart > 0;
            const canNext = paginationEnd < this.props.data.length - 1;

            return {
                selectedOption,
                paginationStart,
                paginationEnd,
                canPrev,
                canNext
            };
        });
    };

    render() {
        const subset = this.state.data.slice(this.state.paginationStart, this.state.paginationEnd + 1);
        return (
            <div className="grid">
                <table className="grid-table">
                    <RowHeader columns={this.state.columns} onSortColumn={this.onSortColumn} />

                    <tbody className="grid-tbody">
                    {subset.map((entry) => (
                        <Row
                            columns={this.props.columns}
                            key={entry.id}
                            entry={entry}
                            onDeleteRow={() => this.onDeleteRow(entry.id)}
                        />
                    ))}
                    </tbody>
                </table>



                <div className="pagination">
                    <button className="btn btn-pagination" onClick={this.prevSubset} disabled={!this.state.canPrev}>
                        Previous
                    </button>

                    <Select
                        value={this.state.selectedOption}
                        onChange={this.handleChange}
                        options={this.state.paginations}
                    />

                    <button className="btn btn-pagination" onClick={this.nextSubset} disabled={!this.state.canNext}>
                        Next
                    </button>
                </div>

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
