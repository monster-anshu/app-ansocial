import React, { useContext, useEffect, useRef, useState } from 'react';
import { Chats, Container } from './style';
import { Chat, SendMessage, Loader } from 'Components';
import { Context } from 'Context';
import { v4 } from 'uuid';
import { MessageType, UserType } from 'Types';

interface Proptypes {
  reciver: UserType;
}

const ChatContainer: React.FC<Proptypes> = ({ reciver }) => {
  const { fetchAxios, user, socket } = useContext(Context);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const ref = useRef<HTMLDivElement | null>(null);

  const [messages, setMessages] = useState<MessageType[]>([]);

  const fetchChat = () => {
    setMessages([]);
    fetchAxios({
      url: `/chat/getChat/${reciver._id}`,
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

  const handleSubmit = (text: string) => {
    const newMsg: MessageType = {
      text,
      sender: user?._id as string,
      createdAt: new Date().toISOString(),
      _id: v4(),
    };
    addMessage(newMsg);
    fetchAxios({
      method: 'POST',
      url: `/chat/${reciver._id}`,
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

      if (!(newMessage.sender === reciver._id)) return;
      audioRef.current?.play();
      addMessage(newMessage);
    });
  }, [socket, messages]);

  useEffect(() => {
    fetchChat();
  }, []);

  return user ? (
    <Container>
      <audio src="/assets/audio/msg.wav" ref={audioRef} />
      <Chats ref={ref}>
        {messages.map((message) => (
          <Chat
            key={message._id}
            message={message}
            isMine={message.sender === user._id}
            profilePicture={
              message.sender === user._id
                ? user.profilePicture
                : reciver.profilePicture
            }
            username={message.sender}
          />
        ))}
      </Chats>

      <SendMessage onSubmit={handleSubmit} />
    </Container>
  ) : (
    <Loader />
  );
};

export default ChatContainer;
