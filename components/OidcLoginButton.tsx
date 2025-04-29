import React, { useContext } from 'react';
import OidcAuthContext from '../context/oidcAuthContext';

const OidcLoginButton: React.FC = () => {
  const { user, signinRedirect, signoutRedirect, isLoading } = useContext(OidcAuthContext);

  if (isLoading) {
    return <button disabled>Loading...</button>;
  }

  if (user) {
    return (
      <div>
        <span>Welcome, {user.profile.name || user.profile.preferred_username}</span>
        <button onClick={() => signoutRedirect()}>Logout</button>
      </div>
    );
  }

  return <button onClick={() => signinRedirect()}>Login</button>;
};

export default OidcLoginButton;
