import React, { useContext, useEffect, useState } from 'react';
import { Active, ChatContainer, ChatsMenu, NotSelectedChat } from 'Components';
import { Context } from 'Context';
import { Container } from './style';
import { UserType } from 'Types';
import { useLocation } from 'react-router-dom';

const Messenger = () => {
  const location = useLocation();
  const { fetchAxios, socket } = useContext(Context);
  const [selected, setSelected] = useState<string | null>(null);
  const [users, setUsers] = useState<UserType[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserType>();
  const [onlineUsers, setOnlineUsers] = useState<
    {
      userId: string;
      socketId: string;
    }[]
  >([]);

  const handleSelect = (id: string) => {
    setSelected(id);
  };

  const addUser = async () => {
    if (!location.state) return;
    const cond = typeof location.state === 'object';
    if (!cond) return;
    const nUser = location.state as UserType;
    const conds = users.some((user) => user._id === nUser._id);
    if (!conds) setUsers([nUser, ...users]);
    console.log(nUser);
    setSelected(nUser._id);
  };

  const fetchUsers = async () => {
    fetchAxios({
      url: '/chat/getUser/',
    })
      .then((res) => {
        setUsers([...res.data, ...users]);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const user = users.find((x) => x['_id'] === selected);
    setSelectedUser(user);
  }, [selected]);

  useEffect(() => {
    fetchUsers();
  }, []);
  useEffect(() => {
    addUser();
  }, [users]);

  useEffect(() => {
    if (!socket) return;
    socket.on('updateOnline', (data) => {
      setOnlineUsers(data);
    });
  }, [socket]);

  return (
    <Container>
      <ChatsMenu selected={selected} onSelect={handleSelect} users={users} />
      {selectedUser ? (
        <ChatContainer reciver={selectedUser} />
      ) : (
        <NotSelectedChat />
      )}
      <Active onlineUsersId={onlineUsers} />
    </Container>
  );
};

export default Messenger;
