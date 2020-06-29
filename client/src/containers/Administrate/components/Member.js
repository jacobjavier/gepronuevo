import React from 'react';
import css from './Member.module.css';
import MainButton from './../../../components/MainButton/MainButton';

export default class Member extends React.Component {
  handleDelete = () => {
    if (this.props.handleClick) this.props.handleClick(this.props.value);
  };
  render() {
    return (
      <div className={css.member}>
        <div className={css.memberText}>
          {this.props.children ? this.props.children : 'Error'}
        </div>
        <div className={css.memberButton}>
          <MainButton handleClick={this.handleDelete}>Eliminar</MainButton>
        </div>
      </div>
    );
  }
}
