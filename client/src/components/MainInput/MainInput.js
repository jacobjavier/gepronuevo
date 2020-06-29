import React from 'react';
import css from './MainInput.module.css';
// images
import imgSearch from './imgs/search.png';
//import imgDefault from './imgs/default.png';
import imgOk from './imgs/ok.png';
import imgWrong from './imgs/wrong.png';
import imgPickColor from './imgs/pick_color.png';
// Props
//  style, type, value, orientation, name
// Events
//  handleOnKeyDown, handleBlur, handleFocus, handleChange
class MainInput extends React.Component {
  constructor(props) {
    super(props);
    this.images = {
      search: imgSearch,
      
      ok: imgOk,
      wrong: imgWrong,
      color: imgPickColor
    };
    this.icon = this.props.type ? this.props.type : 'default';
    this.name = this.props.name ? this.props.name : null;
    this.autoselect = this.props.autoselect ? this.props.autoselect : false;
    this.value = this.props.handleChange ? this.props.value : '';
  }
  handleOnKeyDown = event => {
    if (this.props.handleOnKeyDown) {
      this.props.handleOnKeyDown(event, this.name);
    }
  };
  handleBlur = event => {
    if (this.props.handleBlur) this.props.handleBlur(event, this.name);
  };
  handleFocus = event => {
    if (this.autoselect === true) event.target.select();
    if (this.props.handleFocus) this.props.handleFocus(event, this.name);
  };
  handleChange = event => {
    if (this.props.handleChange) {
      this.props.handleChange(event, this.name);
    } else {
      this.value = event.target.value;
      this.setState({});
    }
  };
  render() {
    let orientation = this.props.orientation ? this.props.orientation : 'left';
    let classNames = [css.mainInput, css[orientation]];
    let inputType = this.props.type ? this.props.type : 'text';
    let inputClassNames = [css.input, inputType === 'color' ? css.color : null];
    if (this.props.handleChange) {
      this.value = this.props.value ? this.props.value : '';
    }
    return (
      <div className={classNames.join(' ')}>
        <img className={css.img} src={this.images[this.icon]} alt="" />
        <input
          className={inputClassNames.join(' ')}
          onBlur={this.handleBlur}
          onKeyDown={this.handleOnKeyDown}
          onChange={this.handleChange}
          onClick={this.handleClick}
          onFocus={this.handleFocus}
          style={this.props.style ? this.props.style : null}
          type={inputType}
          value={this.value}
        />
      </div>
    );
  }
}

export default MainInput;
