import styled from 'styled-components';

export const ContainerColumn = styled.div`
  margin-bottom: 10px;

  @media (min-width: 768px) {
    &:first-child {
      margin-right: 20px;
    }

    &.bigger {
      flex-grow: 2;
      min-width: 350px;

      display: flex;
      flex-direction: row;
    }
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
