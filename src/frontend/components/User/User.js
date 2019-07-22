import React from 'react';

import { UserWrapper } from './styles';

const User = React.memo(({ name }) => {
  return (
    <UserWrapper>
      <div>{name}</div>
    </UserWrapper>
  );
});

User.displayName = 'User';

export default User;
