import React from 'react';
import styled from 'styled-components';

const LoadingModalContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

//TODO actually make a modal
const LoadingModal = React.memo(() => {
  return <LoadingModalContainer>LoadingMODAL...</LoadingModalContainer>;
});

export default LoadingModal;
