import { Loader } from 'Components';
import { Context } from 'Context';
import React, { FormEvent, useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  Container,
  Create,
  Forget,
  Form,
  Input,
  InputContainer,
  LoginBtn,
  Show,
} from './style';

const Login = () => {
  const { login, token } = useContext(Context);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const tID = toast.info('Logging user . Please wait !', {
      isLoading: true,
    });
    setLoading(true);
    if (!login) return;
    const result = await login({
      email,
      password,
      tID,
    });
    setLoading(false);
    if (result) {
      navigate('/home');
    }
  };
  useEffect(() => {
    if (token) navigate('/home');
  }, []);
  return (
    <Container>
      <h1>Ansocial</h1>
      <Form onSubmit={handleLogin}>
        <h2>Login Here</h2>
        <InputContainer>
          <Input
            required
            type={'email'}
            placeholder={'Enter your email'}
            autoComplete={'current-email'}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <i className="bx bx-user-circle"></i>
        </InputContainer>
        <InputContainer>
          <Input
            required
            type={show ? 'text' : 'password'}
            placeholder={'Enter your password'}
            autoComplete={'current-password'}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <i className="bx bx-lock-alt"></i>
          <Show
            className={`bx bx-${show ? 'hide' : 'show'}`}
            onClick={() => setShow(!show)}
          />
        </InputContainer>
        <LoginBtn type={'submit'} disabled={loading}>
          {loading ? <Loader /> : <>Login</>}
        </LoginBtn>
        <Forget>
          <Link to={'/forget'}> Forget Password</Link>
          <p>New to Ansocial ?</p>
          <Link to={'/signup'} onClick={(e) => loading && e.preventDefault()}>
            <Create disabled={loading}>
              {loading ? <Loader /> : <>Sign UP</>}
            </Create>
          </Link>
        </Forget>
      </Form>
    </Container>
  );
};

export default Login;
