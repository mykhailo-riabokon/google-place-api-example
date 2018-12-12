import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AppContainer, Title, ContainerColumn } from './styled.components';
import { Spin } from 'antd';
import LocationSelect from './components/LocationSelect';
import Controls from './components/Controls';
import Results from './components/Results';
import withGooglePlaceApi from '../hocs/withGooglePlaceApi';

const mapRawGoogleDetails = (rawGoogleDetails) => {
  // More information about google address type: https://developers.google.com/maps/documentation/geocoding/intro#Types
  const getFromAddress = (type) => {
    const addressComponent = rawGoogleDetails.address_components.find((item) => item.types.includes(type));

    return (addressComponent && addressComponent.long_name) || null;
  };

  return {
    placeId: rawGoogleDetails.place_id,
    displayAddress: rawGoogleDetails.formatted_address,
    streetNumber: getFromAddress('street_number'),
    street: getFromAddress('street_address') || getFromAddress('route'),
    postalCode: getFromAddress('postal_code'),
    city: getFromAddress('locality'),
    county: getFromAddress('administrative_area_level_2'),
    state: getFromAddress('administrative_area_level_1'),
    country: getFromAddress('country'),
    lat: rawGoogleDetails.geometry.location.lat(),
    lng: rawGoogleDetails.geometry.location.lng(),
  };
};

class App extends Component {
  state = {
    googleDetails: {},
    mappedGoogleDetails: {},
  };

  updateState = (googlePlaceDetails) => {
    if (googlePlaceDetails) {
      this.setState({
        googleDetails: googlePlaceDetails,
        mappedGoogleDetails: mapRawGoogleDetails(googlePlaceDetails),
      });
    }
  };

  onLocationSelected = (googlePlaceId) => {
    this.props.googlePlaceApi.getPlaceDetails(googlePlaceId).then(this.updateState);
  };

  render() {
    const { googlePlaceApi } = this.props;

    return (
      <AppContainer>
        <ContainerColumn>
          <Title>Google place API config</Title>
          <Spin spinning={googlePlaceApi.isLoading}>
            <Controls onRequestConfigChanged={googlePlaceApi.reFetchGoogleApiScript} {...googlePlaceApi.config} />
            <LocationSelect
              fetchLocations={googlePlaceApi.getPredictions}
              onLocationSelected={this.onLocationSelected}
            />
          </Spin>
        </ContainerColumn>
        <ContainerColumn className="bigger">
          <Results title="Google API results" data={this.state.googleDetails} />
          <Results title="Parsed result" data={this.state.mappedGoogleDetails} />
        </ContainerColumn>
      </AppContainer>
    );
  }
}

App.propTypes = {
  googlePlaceApi: PropTypes.shape({
    reFetchGoogleApiScript: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    config: PropTypes.shape({
      placeType: PropTypes.string,
      language: PropTypes.string,
      useSession: PropTypes.bool,
    }),
  }).isRequired,
};

export default withGooglePlaceApi(App);
