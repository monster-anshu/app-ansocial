import { Loader } from 'Components';
import { Context } from 'Context';
import React, { FormEvent, useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Create, Forget, Form, Input, LoginBtn } from './style';

const Signup = () => {
  const { signUp } = useContext(Context);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCPassword] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (!signUp) return;
    try {
      const result = await signUp({
        name,
        username,
        email,
        password,
      });
      if (result) navigate('/login');
    } finally {
      setLoading(false);
    }
  };
  return (
    <Container>
      <h1>Ansocial</h1>
      <Form onSubmit={handleLogin}>
        <h2>Signup Here</h2>
        <Input
          required
          type={'text'}
          placeholder={'Enter your name'}
          autoComplete={'current-name'}
          value={name}
          onChange={(e) => setName(e.target.value)}
          minLength={3}
        />
        <Input
          required
          type={'text'}
          placeholder={'Enter your username'}
          autoComplete={'current-username'}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          minLength={3}
        />
        <Input
          required
          type={'email'}
          placeholder={'Enter your email'}
          autoComplete={'current-email'}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          minLength={3}
        />
        <Input
          required
          type={'password'}
          placeholder={'Enter your password'}
          autoComplete={'new-password'}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          minLength={6}
        />
        <Input
          required
          type={'password'}
          placeholder={'Enter your password'}
          autoComplete={'new-password'}
          onChange={(e) => setCPassword(e.target.value)}
          value={cpassword}
          minLength={6}
        />
        <LoginBtn type={'submit'} disabled={loading}>
          {loading ? <Loader width={20} color={'#ffffff'} /> : <>Signup</>}
        </LoginBtn>
        <Forget>
          <Link to={'/forget'}></Link>
          <p> Already have a account ?</p>
          <Link to={'/login'} onClick={(e) => loading && e.preventDefault()}>
            <Create disabled={loading}>
              {loading ? <Loader width={20} color={'#ffffff'} /> : <>Sign in</>}
            </Create>
          </Link>
        </Forget>
      </Form>
    </Container>
  );
};

export default Signup;
