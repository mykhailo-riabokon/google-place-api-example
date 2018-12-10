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

    getPredictions = (input, sessionToken) => {
      return new Promise((resolve) => {
        const autocompleteService = new window.google.maps.places.AutocompleteService();

        autocompleteService.getPlacePredictions(
          {
            input,
            types: ['address'],
            sessionToken,
          },
          (predictions, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
              resolve(predictions);
            } else {
              resolve([]);
            }
          }
        );
      });
    };

    getPlaceDetails = (placeId, sessionToken) => {
      return new Promise((resolve) => {
        const placeService = new window.google.maps.places.PlacesService(
          document.getElementById('hidden-location-field')
        );

        placeService.getDetails(
          {
            fields: [
              'geometry',
              'place_id',
              'address_component',
              'formatted_address',
              'scope',
              'type',
              'utc_offset',
              'vicinity',
            ],
            placeId,
            sessionToken,
          },
          (details, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
              resolve(details);
            } else {
              resolve(null);
            }
          }
        );
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
      const scriptElement = document.createElement('script');

      scriptElement.src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places`;

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
