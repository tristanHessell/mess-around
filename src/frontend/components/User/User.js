import React from 'react';
import styled from 'styled-components';

const UserContainer = styled.div`
  /*  */
`;

const User = React.memo(({ name }) => {
  return (
    <UserContainer>
      <div>{name}</div>
    </UserContainer>
  );
});

User.displayName = 'User';

export default User;
