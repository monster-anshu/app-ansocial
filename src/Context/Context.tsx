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
import { io, Socket } from 'socket.io-client';
import { UserType, MessageType } from 'Types';
import toast, { Toaster } from 'react-hot-toast';
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
  }) => Promise<boolean>;
  signUp?: ({
    name,
    username,
    email,
    password,
  }: {
    name: string;
    username: string;
    email: string;
    password: string;
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
    console.log('Adding msg');
    fetchAxios.get(`/user/id/${msg.sender}`).then((res) => {
      const mUser: UserType = res.data.user;
      if (location.pathname !== '/messenger') {
        toast(
          <div
            onClick={() =>
              navigate('/messenger', {
                state: mUser,
              })
            }
            style={{
              cursor: 'pointer',
            }}
          >
            <strong>{mUser.name} : </strong>
            <span> {msg.text} </span>
          </div>,
          {
            position: 'bottom-right',
            icon: <img src={mUser.profilePicture} height={20} width={20} />,
          },
        );
        msgAudioRef.current?.play();
      }
      setUnreadMsg((unread) => [...unread, msg]);
    });
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

  const login: ContextTypes['login'] = async ({ email, password }) => {
    if (!host) return false;
    const promise = Auth({
      url: 'login',
      data: {
        email,
        password,
      },
      method: 'POST',
    }).then(({ data }) => {
      setToken(data.token);
      setToken(data.token);
      localStorage.setItem('token', data.token);
      return true;
    });
    toast.promise(
      promise,
      {
        loading: <strong>Loading</strong>,
        success: <strong>Login Successful</strong>,
        error: (err) => {
          const status = err?.response?.status;
          if (status === 404)
            return <strong>Enter valid Email or Password</strong>;
          return <strong>Server Error</strong>;
        },
      },
      {
        position: 'bottom-center',
      },
    );
    return promise;
  };

  const signUp: ContextTypes['signUp'] = async ({
    name,
    username,
    email,
    password,
  }) => {
    if (!host) return false;
    const promise = Auth({
      url: 'register',
      data: {
        name,
        username,
        email,
        password,
      },
    }).then(() => true);
    toast.promise(
      promise,
      {
        loading: <strong>Loading</strong>,
        success: <strong>Account created successfuly</strong>,
        error: (err) => {
          const status = err?.response?.status;
          if (status === 409)
            return <strong>Email or Username Already Exists</strong>;
          return <strong>Server Error</strong>;
        },
      },
      {
        position: 'bottom-center',
      },
    );

    return promise;
  };

  const handleLogout = () => {
    setToken(null);
    socket?.disconnect();
    setSocket(undefined);
    socket?.emit('logout');
    localStorage.removeItem('token');
    navigate('/login');
  };

  useEffect(() => {
    if (!socket) return;
    socket.on('reciveChat', handleAddUnread);
  }, [socket]);

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
      <Toaster />
    </Context.Provider>
  );
};
