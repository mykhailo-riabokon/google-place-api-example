import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, ControlContainer, ControlsRow } from './styled.components';
import { Select, Checkbox, Tooltip, Icon } from 'antd';
import supportedLanguages from './supportedLanguages';

// https://developers.google.com/places/web-service/supported_types#table3
const locationTypes = [
  { title: 'All locations', value: '' },
  { title: 'Addresses', value: 'address' },
  { title: 'Cities', value: '(cities)' },
  { title: 'Regions', value: '(regions)' },
];

class Controls extends Component {
  state = {
    placeType: this.props.placeType,
    language: this.props.language,
    useSession: this.props.useSession,
  };

  updateState = (key, value) => {
    this.setState({ [key]: value }, () => this.props.onRequestConfigChanged(this.state));
  };

  get locationByInfo() {
    return (
      <p>
        You may restrict results from a Google Place Autocomplete request to be of a certain type. More detais by{' '}
        <a href="https://developers.google.com/places/web-service/supported_types#table3">link</a>
      </p>
    );
  }

  get languagesInfo() {
    return (
      <p>
        By default, the Maps JavaScript API uses the user's preferred language setting as specified in the browser.
        However, if you want the Maps JavaScript API to ignore the browser's language setting, you can force it to
        display information in a particular language. More details by{' '}
        <a href="https://developers.google.com/maps/documentation/javascript/localization#Language">link</a>
      </p>
    );
  }

  get sessionTokenInfo() {
    return (
      <p>
        When a session token is passed, autocomplete requests are not billed independently, but are instead billed once
        after a full autocomplete result is returned. If the session token parameter is omitted, each request is billed
        independently. See the pricing sheet for{' '}
        <a href="https://cloud.google.com/maps-platform/pricing/sheet/">details</a>.
      </p>
    );
  }

  render() {
    return (
      <Container>
        <ControlsRow>
          <Checkbox
            className="session-checkbox"
            defaultChecked={this.state.useSession}
            onChange={(event) => this.updateState('useSession', event.target.checked)}
          >
            <Tooltip title={this.sessionTokenInfo} placement="bottom">
              <Icon type="info-circle" />
            </Tooltip>{' '}
            Generate session token
          </Checkbox>
        </ControlsRow>
        <ControlsRow>
          <ControlContainer>
            <label>
              <Tooltip title={this.locationByInfo} placement="bottomRight">
                <Icon type="info-circle" />
              </Tooltip>{' '}
              Query locations by:
            </label>
            <Select
              defaultValue={this.state.placeType}
              value={this.state.placeType}
              placeholder="Query by"
              onChange={(value) => this.updateState('placeType', value)}
            >
              {locationTypes.map((locationType, index) => (
                <Select.Option key={index} value={locationType.value}>
                  {locationType.title}
                </Select.Option>
              ))}
            </Select>
          </ControlContainer>
          <ControlContainer className="language-control">
            <label>
              <Tooltip title={this.languagesInfo} placement="bottom">
                <Icon type="info-circle" />
              </Tooltip>{' '}
              Results language:
            </label>
            <Select
              defaultValue={this.state.language}
              value={this.state.language}
              placeholder="Results language"
              onChange={(value) => this.updateState('language', value)}
              filterOption={true}
            >
              {supportedLanguages.map((supportedLanguage, index) => (
                <Select.Option key={index} value={supportedLanguage.value}>
                  {supportedLanguage.title}
                </Select.Option>
              ))}
            </Select>
          </ControlContainer>
        </ControlsRow>
      </Container>
    );
  }
}

Controls.propTypes = {
  placeType: PropTypes.string,
  language: PropTypes.string,
  useSession: PropTypes.bool,
  onRequestConfigChanged: PropTypes.func.isRequired,
};

export default Controls;
