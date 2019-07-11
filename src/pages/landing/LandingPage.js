import React from 'react';
import styled from 'styled-components';

const LandingPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  flex: 1;
`;

const LandingPage = React.memo(() => {
  return <LandingPageContainer>LANDING</LandingPageContainer>;
});

LandingPage.displayName = 'LandingPage';

export default LandingPage;
