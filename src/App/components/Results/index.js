import React from 'react';
import PropTypes from 'prop-types';
import Highlight from 'react-highlight';
import { Container, Title } from './styled.components';

function Results(props) {
  return (
    <Container className={props.className}>
      <Title>{props.title}</Title>
      <Highlight language="javascript">{`${JSON.stringify(props.data, null, 2)}`}</Highlight>
    </Container>
  );
}

Results.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  data: PropTypes.any,
  className: PropTypes.string,
};

export default Results;
