import styled from 'styled-components';

export const Container = styled.div`
  overflow: auto;
  position: relative;

  @media (min-width: 768px) {
    flex-grow: 1;
    min-width: 350px;

    &:first-child {
      margin-right: 10px;
    }

    &.bigger {
      flex-grow: 2;
    }

    pre {
      margin-top: 50px;
    }
  }
`;

export const Title = styled.h2`
  margin: 0;
  line-height: 30px;
  height: 30px;
  position: fixed;
  z-index: 2;
  width: 100%;
  background-color: #fff;
  padding-bottom: 10px;
`;
