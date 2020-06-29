import React from 'react';
import css from './TableContainer.module.css';
// Utilities
import GetEvents from '../../utilities/GetEvents';
// Components
import TableCell from './../TableContainer/containers/TableCell/TableCell'; 
export default class TableContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      action: 'started'
    };
    this.processId = this.props.processId ? this.props.processId : null;
    this.events = {};
  }
  render() {
    this.events = this.props.events;
    if (this.events) {
      switch (this.state.action) {
        case 'started':
          return this.createTable();
        case 'loading':
          return 'Loading';
        default:
          return <div>Error al iniciar el render</div>;
          break;
      }
    }
    return null;
  }
  createTable() {
    let events = [];
    this.events.map((event, eventIdx) => {
      events.push(this.createEvent(event, eventIdx));
    });
    return (
      <div className={[css.table, css.animOpacityIn].join(' ')}>{events}</div>
    );
  }
  createEvent(eventData, eventIdx) {
    let event = [];
    eventData.map((contentData, contentIdx) => {
      event.push(this.createInput(contentData, contentIdx, eventIdx));
    });
    let classNames = [css.rowContainer, eventIdx === 0 ? css.title : null];
    return (
      <div key={eventIdx} className={classNames.join(' ')}>
        {event}
      </div>
    );
  }
  createInput(contentData, contentIdx, eventIdx) {
    let events = {
      updateValue: this.props.handleUpdateValue,
      updateStatus: this.props.handleUpdateStatus
    };
    return (
      <TableCell
        key={contentIdx}
        dataCell={contentData}
        rowIdx={eventIdx}
        cellIdx={contentIdx}
        events={events}
      />
    );
  }
}
