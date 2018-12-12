import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Autocomplete } from './styled.components';

export const toDataSourceItems = (locations) => {
  return locations.map((location) => ({
    value: location.place_id, // Will be used to retrive more details
    text: location.description,
  }));
};

class LocationSelect extends Component {
  state = {
    dataSource: [],
  };

  getLocations = (value) => {
    const updateDataSource = (results) => this.setState({ dataSource: toDataSourceItems(results) });

    if (value) {
      this.props.fetchLocations(value).then(updateDataSource);
    }
  };

  render() {
    return (
      <Autocomplete
        onSelect={this.props.onLocationSelected}
        onSearch={this.getLocations}
        dataSource={this.state.dataSource}
        placeholder="Type location and select"
      />
    );
  }
}

Location.propTypes = {
  fetchLocations: PropTypes.func.isRequired,
  onLocationSelected: PropTypes.func.isRequired,
};

export default LocationSelect;
