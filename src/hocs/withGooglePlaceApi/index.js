import React, { Component } from 'react';
import queryString from 'query-string';
import RequestApiKeyModal from './RequestApiKeyModal';
import { Spin } from 'antd';

const getConfigFromLocation = () => {
  const params = queryString.parse(window.location.search);

  return {
    language: 'language' in params ? params.language : '',
    placeType: 'placeType' in params ? params.placeType : '',
    useSession: 'useSession' in params ? params.useSession === 'true' : true,
  };
};

export default (WrappedComponent) => {
  return class WithGooglePlaceApi extends Component {
    constructor(props) {
      super(props);

      this.state = {
        isApiLoading: false,
        apiKey: localStorage.getItem('apiKey'),
        showApiModal: false,
        isKeyLoading: false,
      };

      this.waitApiTimeout = null;
      this.sessionToken = null;
      this.config = getConfigFromLocation();
    }

    createSessionToken = () => {
      return new window.google.maps.places.AutocompleteSessionToken();
    };

    handleResponse = (status, response, emptyResponse) => {
      const { OK, ZERO_RESULTS } = window.google.maps.places.PlacesServiceStatus;

      if (status === OK) {
        return response;
      }

      if (status !== ZERO_RESULTS) {
        this.deleteKey();
      }

      return emptyResponse;
    };

    getPredictions = (input) => {
      return new Promise((resolve) => {
        const autocompleteService = new window.google.maps.places.AutocompleteService();
        const requestParams = {
          input,
        };

        if (this.config.placeType) {
          requestParams.types = [].concat(this.config.placeType);
        }

        if (this.config.useSession) {
          this.sessionToken = this.sessionToken || this.createSessionToken();

          requestParams.sessionToken = this.sessionToken;
        }

        autocompleteService.getPlacePredictions(requestParams, (predictions, status) => {
          const response = this.handleResponse(status, predictions, []);

          resolve(response);
        });
      });
    };

    getPlaceDetails = (placeId) => {
      return new Promise((resolve) => {
        const placeService = new window.google.maps.places.PlacesService(
          document.getElementById('hidden-map')
          // or document.createElement('div') but it meens it will be created each time
        );
        const requestParams = {
          // basic set of fields, which is free, but there are more if needed https://developers.google.com/places/web-service/details#fields
          fields: ['address_component', 'formatted_address', 'geometry', 'place_id', 'plus_code', 'utc_offset'],
          placeId,
        };

        if (this.config.useSession) {
          requestParams.sessionToken = this.sessionToken;
        }

        placeService.getDetails(requestParams, (details, status) => {
          this.sessionToken = null;
          const response = this.handleResponse(status, details, null);

          resolve(response);
        });
      });
    };

    waitForApi = () => {
      if (this.waitApiTimeout) {
        clearTimeout(this.waitApiTimeout);
      }

      if ('google' in window) {
        this.setState({ isApiLoading: false });
      } else {
        this.waitApiTimeout = setTimeout(this.waitForApi, 200);
      }
    };

    addGoogleApiScript = () => {
      const params = {
        key: this.state.apiKey,
        libraries: 'places', // in order to fetch only places lib
      };

      if (this.config.language) {
        params.language = this.config.language;
      }

      const query = queryString.stringify(params);
      const scriptElement = document.createElement('script');

      scriptElement.src = `https://maps.googleapis.com/maps/api/js?${query}`;

      document.head.appendChild(scriptElement);
      window.gm_authFailure = () => this.deleteKey();

      this.setState({ isApiLoading: true }, this.waitForApi);
    };

    reFetchGoogleApiScript = (config) => {
      const params = queryString.stringify(config);

      window.location.search = params;
    };

    onSaveKey = (key) => {
      localStorage.setItem('apiKey', key);
      this.setState({ showApiModal: false, apiKey: key }, this.addGoogleApiScript);
    };

    onUserSaveKey = (key) => {
      localStorage.setItem('apiKey', key);
      window.location.reload();
    };

    deleteKey = () => {
      localStorage.removeItem('apiKey');

      this.setState({ apiKey: null, showApiModal: true });
    };

    fetchKey = () => {
      this.setState({ isKeyLoading: true });

      fetch('https://us-central1-someexample-af6f6.cloudfunctions.net/getKey/')
        .then((response) => response.json())
        .then((response) => this.setState({ isKeyLoading: false }, () => this.onSaveKey(response.key)))
        .catch(() => this.setState({ showApiModal: true, isKeyLoading: false }));
    };

    componentDidMount() {
      if (this.state.apiKey) {
        this.addGoogleApiScript();
      } else {
        this.fetchKey();
      }
    }

    get googlePlaceApi() {
      return {
        getPlaceDetails: this.getPlaceDetails,
        getPredictions: this.getPredictions,
        reFetchGoogleApiScript: this.reFetchGoogleApiScript,
        isLoading: this.state.isApiLoading,
        config: this.config,
      };
    }

    render() {
      return (
        <Spin spinning={this.state.isKeyLoading}>
          <RequestApiKeyModal visible={this.state.showApiModal} onSaveKey={this.onUserSaveKey} />
          <WrappedComponent {...this.props} googlePlaceApi={this.googlePlaceApi} />
        </Spin>
      );
    }
  };
};
