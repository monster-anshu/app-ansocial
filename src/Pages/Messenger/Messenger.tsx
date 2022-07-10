import React, { useContext, useEffect, useState } from 'react';
import { Active, ChatContainer, ChatsMenu, NotSelectedChat } from 'Components';
import { Context } from 'Context';
import { Container } from './style';
import { UserType } from 'Types';
import { useLocation } from 'react-router-dom';

interface user {
  _id: string;
  name: string;
  profilePicture: string;
}

const Messenger = () => {
  const location = useLocation();
  const { fetchAxios, socket } = useContext(Context);
  const [selected, setSelected] = useState<string | null>(null);
  const [users, setUsers] = useState<user[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<
    {
      userId: string;
      socketId: string;
    }[]
  >([]);

  const handelSelect = (id: string) => {
    setSelected(id);
  };

  const selectedUser = users.filter((x) => x['_id'] === selected)[0];

  const fetchUsers = () => {
    fetchAxios({
      url: '/chat/getUser/',
    })
      .then((res) => {
        setUsers([]);
        setUsers(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchUsers();

    if (!location.state) return;
    const cond = typeof location.state === 'object';
    if (!cond) return;
    const nUser = location.state as UserType;
    const conds = users.some((user) => user._id === nUser._id);
    if (!conds) setUsers([nUser, ...users]);
    setSelected(nUser._id);
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.on('updateOnline', (data) => {
      setOnlineUsers(data);
    });
  }, [socket]);

  return (
    <Container>
      <ChatsMenu selected={selected} onSelect={handelSelect} users={users} />
      {selected ? (
        <ChatContainer
          name={selectedUser['name']}
          img={selectedUser['profilePicture']}
          id={selectedUser['_id']}
        />
      ) : (
        <NotSelectedChat />
      )}
      <Active onlineUsersId={onlineUsers} />
    </Container>
  );
};

export default Messenger;
