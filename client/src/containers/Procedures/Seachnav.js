import { Filters, FilterBar, ChangeFQLHander } from 'react-dynamic-filterbar';
import React from 'react';
type AppProps = {};
type AppState = {
    fql?: FilterBars.FilterQueryLanguage<MyData>,
}
 
class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
      super(props);
      this.state = {
          fql: undefined,
      }
  }
 
  onFilterUpdate: ChangeFQLHander<MyData> = (fql) => {
      this.setState({ fql });
  }
 
  render() {
  return (
    <FilterBar onFilterUpdate={this.onFilterUpdate} fql={fql} buttonClassName="btn">
      <Filters.StringFilter field={['firstName', 'lastName']} label="Name" className="form-control" buttonClassName="btn btn-primary" />
      <Filters.StringFilter field="comment" label="Comment" className="form-control" buttonClassName="btn btn-primary" showOperator />
      <Filters.NumericFilter field="amount" label="Amount" className="form-control" />
      <Filters.SelectFilter field="color" label="Colors" options={colorOptions} styles={customStyles} isMulti />
      <Filters.DateFilter field="birthday" label="Birthday" showOperator buttonClassName="btn btn-primary" shown/>
    </FilterBar>);
  }
}