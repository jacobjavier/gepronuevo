import React from 'react';
import css from './TableContainer.module.css';
// Components
import TableCell from './containers/TableCell/TableCell';
import TableRow from './containers/TableRow/TableRow';
class TableContainer extends React.Component {
  render() {
    // Titles
    let cellArray = [];
    if (this.props.titles) {
      this.props.titles.map((cell, cellIdx) => {
        cellArray.push(
          <TableCell
            dataCell={cell}
            color={cell.color}
            id={cell.key}
            key={cellIdx}
            numCell={cellIdx}
            numRow={0}
            type={cell.type}
            value={cell.value ? cell.value : ''}
          >
            {this.props.children}
          </TableCell>
        );
      });
    }
    return (
      <div className={css.tableContainer}>
        <TableRow
          type="title"
          className={[css.rowContainer, css.titleContainer].join(' ')}
        >
          {this.props.titles ? cellArray : null}
        </TableRow>
        {this.props.children}
      </div>
    );
  }
}

export default TableContainer;
