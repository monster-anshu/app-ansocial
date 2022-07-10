import React, { useContext, useEffect, useState } from 'react';
import {
  EmptyUser,
  Home,
  Login,
  Messenger,
  Profile,
  Root,
  ServerDown,
  Signup,
} from 'Pages';
import { Loader, Sidebar, Topbar } from 'Components';
import { Route, Routes, useLocation } from 'react-router-dom';
import { ChildMain, MainContainer } from 'Style';
import { Context } from 'Context';
const Main = () => {
  const { getUser, user } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    (async () => {
      await getUser?.();
      setIsLoading(false);
    })();
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    user && (
      <>
        <Topbar />
        <MainContainer>
          {location.pathname !== '/messenger' && <Sidebar />}

          <ChildMain>
            <Routes>
              <Route path={'/home'} element={<Home />} />
              <Route path={'/profile/:username'} element={<Profile />} />
              <Route path={'/profile'} element={<EmptyUser />} />
              <Route path={'/messenger'} element={<Messenger />} />
              <Route path={'*'} element={<>Not found</>} />
            </Routes>
          </ChildMain>
        </MainContainer>
      </>
    )
  );
};

const App = () => {
  return (
    <div>
      <Routes>
        <Route path={'/'} element={<Root />} />
        <Route path={'/*'} element={<Main />} />
        <Route path={'/login'} element={<Login />} />
        <Route path={'/serverdown'} element={<ServerDown />} />
        <Route path={'/signup'} element={<Signup />} />
      </Routes>
    </div>
  );
};
export default App;
