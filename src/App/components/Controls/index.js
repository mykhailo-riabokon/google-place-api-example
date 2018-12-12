import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, ControlContainer } from './styled.components';
import { Select, Checkbox } from 'antd';
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

  render() {
    return (
      <Container>
        <ControlContainer>
          <label>Query locations by:</label>
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
          <label>Results language:</label>
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
        <ControlContainer>
          <Checkbox
            className="session-checkbox"
            defaultChecked={this.state.useSession}
            onChange={(event) => this.updateState('useSession', event.target.checked)}
          >
            Generate session token
          </Checkbox>
        </ControlContainer>
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
