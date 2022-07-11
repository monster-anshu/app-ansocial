import axios, { AxiosInstance } from 'axios';
import React, {
  createContext,
  ReactElement,
  SetStateAction,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast, Id } from 'react-toastify';
import { Socket, io } from 'socket.io-client';
import { PostType, UserType } from 'Types';

const host = process.env.REACT_APP_API_URL;

const fetchAxios = axios.create({
  baseURL: host,
});

interface ContextTypes {
  host?: string;
  fetchAxios: AxiosInstance;
  user: null | UserType;
  token: null | string;
  login?: ({
    email,
    password,
  }: {
    email: string;
    password: string;
    tID: Id;
  }) => Promise<boolean>;
  signUp?: ({
    name,
    username,
    email,
    password,
    tID,
  }: {
    name: string;
    username: string;
    email: string;
    password: string;
    tID: Id;
  }) => Promise<boolean>;
  getUser?: () => Promise<boolean>;
  myPost: PostType[];
  setMyPost?: React.Dispatch<SetStateAction<PostType[]>>;
  setUser?: React.Dispatch<SetStateAction<null | UserType>>;
  handelLogout?: () => void;
  socket: Socket | null;
}

export const Context = createContext<ContextTypes>({
  user: null,
  token: null,
  host,
  fetchAxios,
  myPost: [],
  socket: null,
});
export const ContextProvider: React.FC<{ children: ReactElement }> = ({
  children,
}) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState<ContextTypes['user']>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [myPost, setMyPost] = useState<PostType[]>([]);

  const [socket, setSocket] = useState<Socket | null>(null);

  const fetchAxios = axios.create({
    baseURL: host,
    headers: {
      Authorization: token as string,
      'Content-Type': 'application/json',
    },
  });

  const navigate = useNavigate();

  const removeUser = async () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    navigate('/login');
  };

  const getUser = async () => {
    if (!token || !host) {
      removeUser();
      return false;
    }
    axios({
      method: 'GET',
      url: host + '/user/me',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    })
      .then(({ data }) => {
        setUser({ ...data.user });
        const IO = io(process.env.REACT_APP_SOCKET_URL as string);
        setSocket(IO);
        IO.emit('online', { userId: data.user._id });
        return true;
      })
      .catch((err) => {
        if (err.response.status === 401) removeUser();
        if (err.response.status === 0) navigate('/serverdown');
        return false;
      });
    return false;
  };
  const Auth = axios.create({
    baseURL: host + '/auth/',
    method: 'POST',
  });

  const login: ContextTypes['login'] = async ({ email, password, tID }) => {
    if (!host) return false;
    const result = await Auth({
      url: 'login',
      data: {
        email,
        password,
      },
      method: 'POST',
    })
      .then((res) => {
        setToken(res.data.token);
        setToken(res.data.token);
        localStorage.setItem('token', res.data.token);
        toast.update(tID, {
          isLoading: false,
          type: 'success',
          render: 'Login Successful',
          autoClose: 2000,
        });
        return true;
      })
      .catch((err) => {
        if (err.response.status === 404) {
          toast.update(tID, {
            isLoading: false,
            type: 'error',
            render: 'Wrong password or email',
            autoClose: 2000,
          });
          return false;
        }
        console.log(err);
        toast.update(tID, {
          isLoading: false,
          render: 'User alredy exist',
          autoClose: 2000,
          type: 'warning',
        });
        return false;
      });
    return result;
  };

  const signUp: ContextTypes['signUp'] = async ({
    name,
    username,
    email,
    password,
    tID,
  }) => {
    if (!host) return false;

    const result = await Auth({
      url: 'register',
      data: {
        name,
        username,
        email,
        password,
      },
    })
      .then(() => {
        toast.update(tID, {
          isLoading: false,
          render: 'Success',
          autoClose: 2000,
        });
        return true;
      })
      .catch((err) => {
        if (err.response.status === 409) {
          toast.update(tID, {
            isLoading: false,
            render: 'User alredy exist',
            autoClose: 2000,
            type: 'warning',
          });
          return false;
        }
        toast.update(tID, {
          isLoading: false,
          render: 'User alredy exist',
          autoClose: 2000,
          type: 'warning',
        });
        return false;
      });
    return result;
  };

  const handelLogout = () => {
    setToken(null);
    // socket?.emit('disconnect');
    localStorage.removeItem('token');
    navigate('/login');
  };

  const value: ContextTypes = {
    user,
    token,
    login,
    signUp,
    getUser,
    fetchAxios,
    myPost,
    setMyPost,
    setUser,
    handelLogout,
    socket,
  };
  return (
    <Context.Provider value={value}>
      {children}
      <ToastContainer autoClose={2500} position={'top-right'} />
    </Context.Provider>
  );
};
