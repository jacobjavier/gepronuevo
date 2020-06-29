import React from 'react';
import css from './MainTooltip.module.css';

// PROPS
// action, align:'vertical-horizontal', inOutTime,
// width, height, className, Children
class MainTooltip extends React.Component {
  constructor(props) {
    super(props);
    let [horizontalAlign, verticalAlign] = [];
    if (this.props.align) {
      [verticalAlign, horizontalAlign] = this.props.align.split('-');
    } else {
      [verticalAlign, horizontalAlign] = ['bottom', 'center'];
    }
    this.verticalAlign = verticalAlign;
    this.horizontalAlign = horizontalAlign;
    this.inOutTime = this.props.inOutTime ? this.props.inOutTime : 500;
  }
  handleMouseDown = event => {
    if (this.props.handleMouseDown) this.props.handleMouseDown(event);
  };
  render() {
    let animations = [];
    animations = this.handleAnimInOut();
    let cssStyle = {
      animation: animations !== [] ? animations.join(',') : null,
      left: this.left ? this.left : 0,
      maxHeight: this.props.maxHeight ? this.props.maxHeight : 'max-content',
      height: this.props.height ? this.props.height : 'max-content',
      top: this.top ? this.top : 0,
      width: this.props.width ? this.props.width : '100%'
    };
    let classNames = [
      this.props.className ? this.props.className : null,
      css.mainTooltip
    ];
    return (
      <div
        onMouseDown={this.handleMouseDown}
        ref="mainTooltip"
        className={classNames.join(' ')}
        style={cssStyle}
      >
        {this.props.children}
      </div>
    );
  }
  handleAnimInOut() {
    let animationCssClass = [
      'to_',
      `${this.verticalAlign.toLowerCase()}_`,
      this.horizontalAlign.toLowerCase()
    ].join('');
    let animations = [];
    switch (this.props.action) {
      case 'hidding':
        animations = [`${css.tooltipOut} ease ${this.inOutTime}ms forwards`];
        break;
      case 'unhidding':
        animations = [
          `${css.tooltipIn} ease ${this.inOutTime}ms forwards`,
          `${css[animationCssClass]} ease ${this.inOutTime}ms forwards`
        ];
        break;
      default:
        break;
    }
    return animations;
  }
  componentDidMount() {
    this.handlePosition();
    window.addEventListener('resize', this.handleWindowResize);
    this.setState({});
  }
  handleWindowResize = event => {
    this.handlePosition();
    this.setState({});
  };
  handlePosition() {
    let parentWidth = this.refs.mainTooltip.parentNode.clientWidth;
    let elementWidth = this.refs.mainTooltip.clientWidth;
    let sizeSeparation = this.props.sizeSeparation
      ? this.props.sizeSeparation
      : 0;
    switch (this.horizontalAlign) {
      case 'left':
        this.left = `${-elementWidth - sizeSeparation}px`;
        break;
      default:
      case 'center':
        this.left = `${(parentWidth - elementWidth) / 2}px`;
        break;
      case 'right':
        this.left = `${parentWidth + sizeSeparation}px `;
        break;
    }
    let parentHeight = this.refs.mainTooltip.parentNode.clientHeight;
    let elementHeight = this.refs.mainTooltip.clientHeight;
    switch (this.verticalAlign) {
      case 'top':
        if (this.horizontalAlign === 'center') {
          this.top = `${-elementHeight - sizeSeparation}px`;
        } else {
          this.top = `${-Math.abs(elementHeight - parentHeight)}px`;
        }
        break;
      case 'center':
        this.top = `${-Math.abs(parentHeight - elementHeight) / 2}px`;
        break;
      case 'bottom':
        if (this.horizontalAlign === 'center') {
          this.top = `${parentHeight + sizeSeparation}px`;
        } else {
          this.top = 0;
        }
        break;
      default:
        break;
    }
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize);
  }
}
export default MainTooltip;
