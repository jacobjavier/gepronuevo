import React from 'react';
import css from './BasicOption.module.css';

export default class BasicOption extends React.Component {
  handleClick = () => {
    if (this.props.handleClick) {
      let value = this.props.value ? this.props.value : null;
      let text = this.props.text ? this.props.text : null;
      this.props.handleClick(value, text);
    }
  };
  handleMouseDown = event => {
    if (this.props.handleMouseDown) this.props.handleMouseDown(event);
  };
  render() {
    let classNames = [
      css.basicOption,
      this.props.isSelected ? css.selected : null
    ];
    let cssStyle = {
      textAlign: this.props.align ? this.props.align : 'center'
    };
    if (this.props.isVisible !== true) {
      cssStyle['display'] = 'none';
    }
    return (
      <div
        onClick={this.handleClick}
        onMouseDown={this.handleMouseDown}
        className={classNames.join(' ')}
        style={cssStyle}
      >
        {this.props.text}
        {this.props.children}
      </div>
    );
  }
}
