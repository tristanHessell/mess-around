import React from 'react';
import styled from 'styled-components';

const LandingPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  flex: 1;
`;

function LandingPage() {
  return <LandingPageContainer>LANDING</LandingPageContainer>;
}

export default LandingPage;
