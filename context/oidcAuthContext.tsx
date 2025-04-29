import React, { createContext, FC, ReactNode, useEffect, useState, useMemo } from 'react';
import { UserManager, User, WebStorageStateStore, Log } from 'oidc-client-ts';

interface IOidcAuthContextProps {
  user: User | null;
  signinRedirect: () => Promise<void>;
  signoutRedirect: () => Promise<void>;
  signinRedirectCallback: () => Promise<void>;
  isLoading: boolean;
}

const OidcAuthContext = createContext<IOidcAuthContextProps>({} as IOidcAuthContextProps);

interface IOidcAuthProviderProps {
  children: ReactNode;
}

const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';

const oidcConfig = {
  authority: 'https://jewelleryx-be.onrender.com/',
  client_id: 'JewelleryX_App',
  redirect_uri: baseUrl + '/signin-callback',
  response_type: 'code',
  scope: 'offline_access JewelleryX',
  post_logout_redirect_uri: baseUrl,
  userStore: typeof window !== 'undefined' ? new WebStorageStateStore({ store: window.localStorage }) : undefined,
  automaticSilentRenew: true,
  // You can add more config options as needed
};

export const OidcAuthProvider: FC<IOidcAuthProviderProps> = ({ children }) => {
  const [userManager] = useState(new UserManager(oidcConfig));
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Log.setLogger(console);
    Log.setLevel(Log.INFO);

    userManager.getUser().then((loadedUser) => {
      setUser(loadedUser);
      setIsLoading(false);
    });

    // Optional: add event listeners for user loaded, unloaded, etc.
    const onUserLoaded = (loadedUser: User) => {
      setUser(loadedUser);
    };
    const onUserUnloaded = () => {
      setUser(null);
    };

    userManager.events.addUserLoaded(onUserLoaded);
    userManager.events.addUserUnloaded(onUserUnloaded);

    return () => {
      userManager.events.removeUserLoaded(onUserLoaded);
      userManager.events.removeUserUnloaded(onUserUnloaded);
    };
  }, [userManager]);

  const signinRedirect = async () => {
    await userManager.signinRedirect();
  };

  const signinRedirectCallback = async () => {
    setIsLoading(true);
    try {
      const user = await userManager.signinRedirectCallback();
      setUser(user);
    } finally {
      setIsLoading(false);
    }
  };

  const signoutRedirect = async () => {
    await userManager.signoutRedirect();
  };

  const value = useMemo(
    () => ({
      user,
      signinRedirect,
      signoutRedirect,
      signinRedirectCallback,
      isLoading,
    }),
    [user, isLoading]
  );

  return <OidcAuthContext.Provider value={value}>{children}</OidcAuthContext.Provider>;
};

export default OidcAuthContext;
