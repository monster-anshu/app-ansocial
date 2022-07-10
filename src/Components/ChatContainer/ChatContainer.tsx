import React, { useContext, useEffect, useRef, useState } from 'react';
import { Chats, Container } from './style';
import { Chat, SendMessage } from 'Components';
import { Context } from 'Context';
import { v4 } from 'uuid';
import { MessageType } from 'Types';

interface Proptypes {
  name: string;
  id: string;
  img: string;
}

const ChatContainer: React.FC<Proptypes> = ({ id }) => {
  const { fetchAxios, user, socket } = useContext(Context);

  const ref = useRef<HTMLDivElement | null>(null);

  const [messages, setMessages] = useState<MessageType[]>([]);

  const fetchChat = () => {
    setMessages([]);
    fetchAxios({
      url: `/chat/getChat/${id}`,
    })
      .then((res) => {
        setMessages(res.data);
      })
      .catch((err) => console.log(err));
  };

  const scrollToBottom = () => {
    if (!ref.current) return;
    const height = ref.current.scrollHeight;
    ref.current.scroll({
      behavior: 'smooth',
      top: height,
    });
  };

  const addMessage = (message: MessageType) => {
    const newMessages = messages.concat(message);
    setMessages(newMessages);
  };

  const handelSubmit = (text: string) => {
    const newMsg: MessageType = {
      text,
      sender: user?._id as string,
      createdAt: new Date().toISOString(),
      _id: v4(),
    };
    addMessage(newMsg);
    fetchAxios({
      method: 'POST',
      url: `/chat/${id}`,
      data: {
        message: newMsg,
      },
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!socket) return;

    socket.on('reciveChat', (message) => {
      const newMessage: MessageType = {
        _id: message._id,
        sender: message.sender,
        text: message.text,
        createdAt: message.createdAt,
      };

      if (!(newMessage.sender === id)) return;
      addMessage(newMessage);
    });
  }, [socket, messages]);

  useEffect(() => {
    fetchChat();
  }, []);

  return (
    user && (
      <Container>
        <Chats ref={ref}>
          {messages.map((message) => (
            <Chat key={message._id} message={message} userId={user?._id} />
          ))}
        </Chats>

        <SendMessage onSubmit={handelSubmit} />
      </Container>
    )
  );
};

export default ChatContainer;
