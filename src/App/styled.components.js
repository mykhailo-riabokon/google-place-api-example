import styled from 'styled-components';

export const ContainerColumn = styled.div`
  width: 100%;
  margin-bottom: 10px;

  @media (min-width: 768px) {
    margin-right: 20px;
    padding-right: 20px;
  }
`;

export const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  background-color: #fff;
  padding: 20px;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
  }

  .red {
    background-color: red;
  }

  .blue {
    background-color: blue;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
`;

export const Title = styled.h1`
  margin: 0;
  margin-bottom: 10px;
`;
