import axios, { AxiosInstance } from 'axios';
import React, {
  createContext,
  ReactElement,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast, Id } from 'react-toastify';
import { io, Socket } from 'socket.io-client';
import { UserType, MessageType } from 'Types';

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
  setUser?: React.Dispatch<SetStateAction<null | UserType>>;
  handleLogout?: () => void;
  msgAudioRef?: React.RefObject<HTMLAudioElement>;
  handleRemoveUnread?: (id: string) => void;
  unreadMsg: MessageType[];
  socket?: Socket;
}

export const Context = createContext<ContextTypes>({
  user: null,
  token: null,
  host,
  fetchAxios,
  unreadMsg: [],
});
export const ContextProvider: React.FC<{ children: ReactElement }> = ({
  children,
}) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState<ContextTypes['user']>(null);
  const [unreadMsg, setUnreadMsg] = useState<MessageType[]>([]);
  const [socket, setSocket] = useState<Socket | undefined>();
  const msgAudioRef = useRef<HTMLAudioElement>(null);
  const location = useLocation();
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
  const handleAddUnread = (msg: MessageType) => {
    const newMsg = unreadMsg.concat(msg);
    setUnreadMsg(newMsg);
  };
  const handleRemoveUnread = (id: string) => {
    const newMsg = unreadMsg.filter((msg) => msg.sender !== id);
    setUnreadMsg(newMsg);
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
        IO.emit('online', { userId: data.user._id });
        setSocket(IO);
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

  const handleLogout = () => {
    setToken(null);
    setSocket(undefined);
    socket?.emit('logout');
    localStorage.removeItem('token');
    navigate('/login');
  };
  useEffect(() => {
    if (!socket) return;
    socket.off('reciveChat');
    socket.on('reciveChat', (newMsg: MessageType) => {
      fetchAxios.get(`/user/id/${newMsg.sender}`).then((res) => {
        const mUser: UserType = res.data.user;
        if (location.pathname !== '/messenger') {
          toast.info(`${mUser.name} : ${newMsg.text}`, {
            position: 'bottom-right',
          });
          msgAudioRef.current?.play();
        }
        handleAddUnread(newMsg);
      });
    });
  }, [socket, unreadMsg]);
  const value: ContextTypes = {
    user,
    token,
    login,
    signUp,
    getUser,
    fetchAxios,
    setUser,
    socket,
    handleLogout,
    msgAudioRef,
    handleRemoveUnread,
    unreadMsg,
  };
  return (
    <Context.Provider value={value}>
      {children}
      <audio src={'/assets/audio/message.mp3'} ref={msgAudioRef} />
      <ToastContainer autoClose={2500} position={'top-right'} />
    </Context.Provider>
  );
};
