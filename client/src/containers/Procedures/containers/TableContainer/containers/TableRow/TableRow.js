import React from 'react';
import css from './TableRow.module.css';

export default class TableRow extends React.Component {
  render() {
    let className = [
      css.rowContainer,
      this.props.type === 'title' ? css.titleContainer : null
    ];
    return (
      <div className={className.join(' ')}>
        {this.props.children ? this.props.children : 'Sin contenido'}
        
      </div>
    );
  }
}
