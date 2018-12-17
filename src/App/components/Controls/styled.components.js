import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ControlsRow = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

export const ControlContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  min-width: 145px;
  margin-right: 10px;
  justify-content: center;
  margin-bottom: 20px;
  &:last-child {
    margin-right: 0;
  }

  &.language-control {
    width: 230px;
  }

  label {
    margin-bottom: 10px;
  }

  .session-checkbox {
    margin-top: auto;
    margin-bottom: 8px;
  }
`;
