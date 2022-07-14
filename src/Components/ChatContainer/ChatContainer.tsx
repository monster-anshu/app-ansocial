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
  const { fetchAxios, user, handleRemoveUnread, unreadMsg } =
    useContext(Context);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const ref = useRef<HTMLDivElement | null>(null);

  const [messages, setMessages] = useState<MessageType[]>([]);

  const fetchChat = () => {
    setMessages([]);
    fetchAxios({
      url: `/chat/getChat/${reciver._id}`,
    }).then((res) => {
      setMessages(res.data);
    });
  };

  const scrollToBottom = () => {
    ref.current?.scrollIntoView();
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

  const addRecivedMsg = () => {
    const my = unreadMsg.filter((msg) => msg.sender === reciver._id);
    const unique = my.filter((m) => {
      const check = messages.some((n) => n._id === m._id);
      return !check;
    });
    if (!unique.length) return;
    handleRemoveUnread?.(reciver._id);
    const msg = messages.concat(unique);
    audioRef.current?.play();
    setMessages(msg);
  };
  useEffect(() => {
    addRecivedMsg();
  }, [unreadMsg]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    handleRemoveUnread?.(reciver._id);
    fetchChat();
  }, [reciver]);

  return user ? (
    <Container>
      <audio src="/assets/audio/msg.wav" ref={audioRef} />
      <Chats>
        {messages.map((message) => (
          <div ref={ref} key={message._id}>
            <Chat
              message={message}
              isMine={message.sender === user._id}
              profilePicture={
                message.sender === user._id
                  ? user.profilePicture
                  : reciver.profilePicture
              }
              username={message.sender}
            />
          </div>
        ))}
      </Chats>

      <SendMessage onSubmit={handleSubmit} />
    </Container>
  ) : (
    <Loader />
  );
};

export default ChatContainer;
