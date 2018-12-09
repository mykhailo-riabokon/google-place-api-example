import React, { Component } from 'react';
import { Autocomplete } from './styled.components';

class LocationSelect extends Component {
  onSelect = () => {};

  getLocations = (value) => {
    debugger;

    if (value) {
    }
  };

  getLocationDetails = (location) => {
    debugger;
  };

  onChange = (value) => {
    if (!value) {
      console.log('cleared');
    }
  };

  render() {
    return <Autocomplete onSelect={this.getLocationDetails} onSearch={this.getLocations} onChange={this.onChange} />;
  }
}

export default LocationSelect;
