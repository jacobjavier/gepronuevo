import React from 'react';
import css from './TableCell.module.css';
// components
import TableTitle from '../../components/TableTitle/TableTitle';
import TableSubtitle from '../../components/TableSubtitle/TableSubtitle';
import NonEditable from '../../components/NonEditable/NonEditable';
import InputContent from './../InputContent/InputContent';
import EndProcess from './../EndProcess/EndProcess';
class TableInput extends React.Component {
  constructor(props) {
    super(props);
    this.width = this.props.width ? this.props.width : '300px';
  }
  createInputContent() {
    let handleBlur = null;
    if (this.props.events) {
      handleBlur = this.props.events.updateValue;
    }
    return (
      <InputContent
        color={this.dataCell.color}
        id={this.dataCell.id}
        type={this.dataCell.type}
        value={this.dataCell.value}
        handleBlur={handleBlur}
        rowIdx={this.props.rowIdx}
        cellIdx={this.props.cellIdx}
      />
    );
  }
  createNonEditable() {
    return (
      <NonEditable value={this.dataCell.value} color={this.dataCell.color} />
    );
  }
  createEndProcess() {
    let handleUpdate = null;
    if (this.props.events) {
      handleUpdate = this.props.events.updateStatus;
    }
    return (
      <EndProcess
        color={this.dataCell.color}
        eventStatus={this.dataCell.eventStatus}
        eventId={this.dataCell.eventId}
        handleUpdate={handleUpdate}
        rowIdx={this.props.rowIdx}
        cellIdx={this.props.cellIdx}
      />
    );
  }
  render() {
    this.dataCell = this.props.dataCell ? { ...this.props.dataCell } : null;
    if (this.dataCell) {
      let element;
      let classNames = [css.cellContainer];
      let isNonEditable =
        this.dataCell.eventStatus === 3 &&
        !['title', 'subtitle', 'key', 'end_process','file' ].includes(
          this.dataCell.type
        );
      if (isNonEditable === true) this.dataCell.type = 'nonEditable';
      switch (this.dataCell.type) {
        case 'title':
          element = <TableTitle value={this.dataCell.value} />;
          classNames.push(css.title);
          if (this.props.cellIdx === 0) this.width = '50px';
          break;
        case 'subtitle':
        case 'key':
          element = <TableSubtitle value={this.dataCell.value} />;
          classNames.push(css.subtitle);
          this.width = '50px';
          break;
        case 'nonEditable':
          element = this.createNonEditable();
          break;
        default:
        case 'text':
        case 'number':
        case 'color':
          element = this.createInputContent();
          break;
        case 'end_process':
          element = this.createEndProcess();
          break;
      }
      return (
        <div
          className={classNames.join(' ')}
          style={{
            width: this.width
          }}
        >
          <div className={css.cellContent}>{element}</div>
        </div>
      );
    }
    return <div>Error en el renderizado</div>;
  }
}
export default TableInput;
