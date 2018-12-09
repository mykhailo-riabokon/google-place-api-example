import React, { Component } from 'react';
import { Container, ControlContainer } from './styled.components';
import { Select, Checkbox } from 'antd';
import supportedLanguages from './supportedLanguages';

const locationRestrictions = [
  { title: 'No restiction', value: '' },
  { title: 'Address (Street)', value: 'address' },
  { title: 'City', value: 'city' },
  { title: 'Country', value: 'Country' },
];

class Controls extends Component {

  onRestrictByChanged = (restrictBy) => {
    console.log('Restrict location by', restrictBy);
  };

  onLanguageSelected = (language) => {
    console.log('Display results in', language);
  };

  onSessionTokenChanged = (event) => {
    console.log('Display results in', event.target.checked);
  };

  render() {
    return (
      <Container>
        <ControlContainer>
          <label>Restrict location by:</label>
          <Select placeholder="Restrict by" onChange={this.onRestrictByChanged}>
            {locationRestrictions.map((restriction, index) => (
              <Select.Option key={index} value={restriction.value}>{restriction.title}</Select.Option>
            ))}
          </Select>
        </ControlContainer>
        <ControlContainer>
          <label>Language results</label>
          <Select placeholder="Results language" onChange={this.onLanguageSelected} filterOption={true}>
            {supportedLanguages.map((supportedLanguage, index) => (
              <Select.Option key={index} value={supportedLanguage.value}>{supportedLanguage.title}</Select.Option>
            ))}
          </Select>
        </ControlContainer>
        <ControlContainer>
          <Checkbox onChange={this.onSessionTokenChanged}>Generate session token</Checkbox>
        </ControlContainer>
      </Container>
    )
  }
}

export default Controls;