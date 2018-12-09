import React, { Component } from 'react';
import { AppContainer, Title, ContainerColumn } from './styled.components';
import LocationSelect from './components/LocationSelect';
import Controls from './components/Controls';
import Results from './components/Results';

class App extends Component {
  render() {
    return (
      <AppContainer>
        <ContainerColumn className="red">
          <Title>Google place API</Title>
          <Controls />
          <LocationSelect />
          <div className="expenses" />
        </ContainerColumn>
        <ContainerColumn className="blue" />
      </AppContainer>
    );
  }
}

export default App;
