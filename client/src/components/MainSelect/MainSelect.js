import React from 'react';
import css from './MainSelect.module.css';
// Components
import MainTooltip from '../MainTooltip/MainTooltip';
import BasicOption from './components/BasicOption/BasicOption';
import MainInput from './../MainInput/MainInput';
// PROPS
// value, text, options:{value,text,description}, width, tooltipHeight
// EVENTS
// handleSelection
export default class MainSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toolTipAction: ''
    };
    this.value = this.props.value ? this.props.value : '';
    this.savedText = this.props.text ? this.props.text : '';
    this.inputText = this.props.text ? this.props.text : '';
    this.searchtext = '';
    this.inputAction = 'selected';
    this.name = this.props.name ? this.props.name : '';
    this.arrayOptions = this.props.options ? this.props.options : [];
    this.filteredOptions = [...this.arrayOptions];
    this.filterOptions();
  }
  filterOptions() {
    if (this.arrayOptions) {
      let filteredOptions = [];
      this.arrayOptions.map((option, optionIdx) => {
        let isVisible = option.text
          ? option.text.toLowerCase().includes(this.searchtext.toLowerCase())
          : false;
        if (this.inputAction === 'selected') {
          if (option.value === this.value) {
            this.savedText = option.text;
            this.inputText = option.text;
          }
        }
        filteredOptions.push(
          <BasicOption
            key={optionIdx}
            handleClick={this.handleOptionSelection}
            value={option.value}
            text={option.text}
            isSelected={option.value === this.value}
            isVisible={isVisible}
          ></BasicOption>
        );
      });
      this.filteredOptions = [...filteredOptions];
    }
  }
  handleOptionSelection = (value, text) => {
    this.savedText = text;
    this.inputText = text;
    this.searchtext = text;
    this.value = value;
    this.inputAction = 'selected';
    if (this.props.handleSelection) {
      this.props.handleSelection(value, text, this.name);
    }
    this.setState({ toolTipAction: 'hidding' });
  };
  handleInputChange = event => {
    this.inputText = event.target.value;
    this.searchtext = event.target.value;
    this.filterOptions();
    this.setState({});
  };
  handleSelectFocus = () => {
    this.inputText = '';
    this.searchtext = '';
    this.inputAction = 'selecting';
    this.setState({ toolTipAction: 'unhidding' });
  };
  render() {
    return (
      <div
        ref="mainSelect"
        className={css.select}
        onFocus={this.handleSelectFocus}
        style={{ width: this.props.width ? this.props.width : 'auto' }}
      >
        <MainInput
          handleChange={this.handleInputChange}
          value={this.inputText}
          autoselect={true}
        ></MainInput>
        <MainTooltip
          align="bottom-center"
          inOutTime={100}
          action={this.state.toolTipAction}
          sizeSeparation={0}
          width="100%"
        >
          <div
            style={{
              maxHeight: this.props.tooltipHeight
                ? `${this.props.tooltipHeight}px`
                : null
              // display: this.state.toolTipAction === 'hidding' ? 'none' : 'block'
            }}
            className={css.tooltip}
          >
            {this.filteredOptions}
          </div>
        </MainTooltip>
      </div>
    );
  }
  componentDidMount() {
    document.addEventListener('click', this.handleDocumentClick);
  }
  handleDocumentClick = event => {
    console.log('Event');
    if (!this.refs.mainSelect.contains(event.target)) {
      this.inputText = this.savedText;
      if (this.inputAction !== 'selected') {
        this.inputAction = 'selected';
        this.setState({ toolTipAction: 'hidding' });
      }
    }
  };
  componentWillUnmount() {
    document.removeEventListener('click', this.handleDocumentClick);
  }
}
