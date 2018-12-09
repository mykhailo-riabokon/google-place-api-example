import React, { Component } from 'react';
import { Input, Icon } from 'antd';
import { AppContainer, Title, Container } from './styled.components';
import LocationSelect from './components/LocationSelect';
import Controls from './components/Controls';

class App extends Component {
  render() {
    return (
      <AppContainer>
        <Title>Google Place API demo</Title>
        <Container>
          <Input placeholder="API key" addonAfter={<Icon type="cross" />} />
          <Controls />
          <LocationSelect />
        </Container>
      </AppContainer>
    );
  }
}

export default App;
