import React, { Component } from 'react';
import queryString from 'query-string';

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
      };

      this.waitApiTimeout = null;
      this.config = getConfigFromLocation();
    }

    createSessionToken = () => {
      return new window.google.maps.places.AutocompleteSessionToken();
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

        autocompleteService.getPlacePredictions(requestParams, (predictions, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            resolve(predictions);
          } else {
            resolve([]);
          }
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
          // sessionToken,
        };

        placeService.getDetails(requestParams, (details, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            resolve(details);
          } else {
            resolve(null);
          }
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

    addGoogleApiScript = (config = {}) => {
      const key = 'AIzaSyBid0kzTee-45dCVdR26QzsJxUiQqymL9s';
      const params = {
        key,
        libraries: 'places', // in order to fetch only places lib
      };

      if (this.config.language) {
        params.language = this.config.language;
      }

      const query = queryString.stringify(params);
      const scriptElement = document.createElement('script');

      scriptElement.src = `https://maps.googleapis.com/maps/api/js?${query}`;

      document.head.appendChild(scriptElement);

      this.setState({ isApiLoading: true }, this.waitForApi);
    };

    reFetchGoogleApiScript = (config) => {
      const params = queryString.stringify(config);

      window.location.search = params;
    };

    componentDidMount() {
      this.addGoogleApiScript();
    }

    get googlePlaceApi() {
      return {
        getPlaceDetails: this.getPlaceDetails,
        getPredictions: this.getPredictions,
        createSessionToken: this.createPlaceSessionToken,
        reFetchGoogleApiScript: this.reFetchGoogleApiScript,
        isLoading: this.state.isApiLoading,
        config: this.config,
      };
    }

    render() {
      return <WrappedComponent {...this.props} googlePlaceApi={this.googlePlaceApi} />;
    }
  };
};
