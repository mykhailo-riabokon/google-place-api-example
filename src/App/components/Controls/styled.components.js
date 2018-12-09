import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
`;

export const ControlContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  min-width: 200px;
  margin-right: 10px;
  justify-content: center;
  margin-bottom: 10px;
  &:last-child {
    margin-right: 0;
  }

  .session-checkbox {
    margin-top: auto;
    margin-bottom: 8px;
  }
`;
