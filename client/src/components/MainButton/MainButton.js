import React from 'react';
import css from './MainButton.module.css';
// PROPS
//  className,isDisabled,children,style
// EVENTS
//  Click,MouseEnter,Mouseout
class MainButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { active: false, hover: false };
  }
  handleClick = event => {
    if (this.props.onClick) this.props.onClick(event); // Depreciated
    if (this.props.handleClick) this.props.handleClick('value');
    this.setState({ active: true, hover: false });
  };
  handleMouseEnter = event => {
    if (this.props.handleMouseEnter) this.props.handleMouseEnter(event);
    this.setState({ hover: true });
  };
  handleMouseOut = event => {
    if (this.props.handleMouseOut) this.props.handleMouseOut(event);
    this.setState({ hover: false });
  };
  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.active !== this.state.active && this.state.active === true) {
      this.timeoutAnimation = setTimeout(() => {
        this.setState({ active: false });
      }, 300);
    }
  };
  render() {
    // CSS
    let style = this.props.style ? this.props.style : null;
    let isDisabled = this.props.isDisabled ? this.props.isDisabled : false;
    let arrayClassNames = [
      css.main,
      this.props.className ? this.props.className : null,
      this.state.hover ? css.hover : null,
      this.state.active ? css.active : null,
      isDisabled === true ? css.isDisabled : null
    ].join(' ');
    // Render
    return (
      <button
        style={style}
        className={arrayClassNames}
        onClick={this.handleClick}
        onMouseEnter={this.handleMouseEnter}
        onMouseOut={this.handleMouseOut}
        disabled={isDisabled}
      >
        {this.props.children}
      </button>
    );
  }
  componentWillUnmount() {
    if (this.timeoutAnimation) clearTimeout(this.timeoutAnimation);
  }
}
export default MainButton;
