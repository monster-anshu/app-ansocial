import React, { FormEvent, useState } from 'react';
import { Container } from './style';

interface Proptypes {
  onSubmit?: (text: string) => void;
}

const SendMessage: React.FC<Proptypes> = ({ onSubmit }) => {
  const [msg, setMsg] = useState('');
  const handelSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (msg.length < 1) return;
    onSubmit?.(msg);
    setMsg('');
  };
  return (
    <Container onSubmit={handelSubmit}>
      <textarea
        rows={5}
        onChange={(e) => setMsg(e.target.value)}
        value={msg}
        placeholder={'Send a message'}
      ></textarea>
      <button type={'submit'}>Send</button>
    </Container>
  );
};

export default SendMessage;
