import styled from 'styled-components';
export const Container = styled.div`
  display: flex;
  justify-content: center;

  height: 100vh;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;
  h1 {
    font-size: 3rem;
    font-weight: 500;
    color: #0095f6;
  }
`;

export const Form = styled.form`
  display: flex;
  margin: 10px;
  width: 100%;
  flex-direction: column;
  padding: 20px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px,
    rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;
  background-color: #ffffff;
  border-radius: 5px;
  gap: 10px;
  max-width: 500px;
  h2 {
    font-size: 25px;
    font-weight: 400;
  }
`;

export const Input = styled.input`
  background-color: #f0f2f5;
  border: none;
  width: 100%;
  padding: 10px;
  border-radius: 5px;
`;
export const LoginBtn = styled.button`
  background-color: #0095f6;
  font-weight: 500;
  height: 40px;
  border: none;
  width: 200px;
  border-radius: 20px;
  color: #ffffff;
  margin: 0 auto;
  cursor: pointer;
  &:focus {
    transition: background-color 500ms ease-in-out;
    background-color: #12294a;
  }
`;

export const Forget = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    margin: 10px 0;
    font-size: 12px;
  }
`;
export const Create = styled.button`
  background-color: #0095f6;
  font-weight: 500;
  height: 40px;
  border: none;
  width: 100px;
  border-radius: 20px;
  color: #ffffff;
  margin: 0 auto;
  cursor: pointer;
`;
