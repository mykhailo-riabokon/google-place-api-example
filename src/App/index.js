import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AppContainer, Title, ContainerColumn } from './styled.components';
import { Spin } from 'antd';
import LocationSelect from './components/LocationSelect';
import Controls from './components/Controls';
import Results from './components/Results';
import withGooglePlaceApi from '../hocs/withGooglePlaceApi';

class App extends Component {
  state = {
    googleDetails: {},
    mappedGoogleDetails: {},
  };

  render() {
    const { googlePlaceApi } = this.props;

    return (
      <AppContainer>
        <ContainerColumn>
          <Title>Google place API</Title>
          <Spin spinning={googlePlaceApi.isLoading}>
            <Controls onRequestConfigChanged={googlePlaceApi.reFetchGoogleApiScript} {...googlePlaceApi.config} />
            <LocationSelect />
          </Spin>
        </ContainerColumn>
        <ContainerColumn className="bigger">
          <Results title="Google API results" data={this.state.googleDetails} />
          <Results title="Mapped to save results" data={this.state.mappedGoogleDetails} />
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
