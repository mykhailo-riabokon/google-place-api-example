import styled from 'styled-components';

export const ContainerColumn = styled.div`
  margin-bottom: 10px;

  @media (min-width: 1227px) {
    &:first-child {
      margin-right: 20px;
    }
  }

  @media (min-width: 768px) {
    &.bigger {
      flex-grow: 2;
      min-width: 350px;

      display: flex;
      flex-direction: row;
    }
  }
`;

export const GitHubCorner = styled.a`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 100;
  padding: 10px;

  .anticon {
    font-size: 3em;
  }
`;

export const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  background-color: #fff;
  padding: 10px;
  flex-direction: column;

  @media (min-width: 1227px) {
    flex-direction: row;
    padding: 20px;
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
  font-size: 1.3em;

  @media (min-width: 768px) {
    margin-bottom: 20px;
    font-size: 2em;
  }
`;
