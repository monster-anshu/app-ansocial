import styled from 'styled-components';
export const Container = styled.div`
  padding: 20px 10px;
  flex: 1;
  border-radius: 10px;
  height: 100%;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px,
    rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;
  background-color: #ffffff;
`;
export const Details = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 30px;
`;
export const Item = styled.div`
  text-align: center;
  span {
    font-size: 0.9em;
  }
`;
export const H2 = styled.h2`
  font-size: 20px;
  font-weight: 400;
`;
export const Message = styled.div`
  display: flex;
  padding-top: 20px;
  justify-content: space-around;
  align-items: center;
  gap: 20px;
`;
export const FollowBTN = styled.button`
  background-color: #0095f6;
  border: none;
  color: #ffffff;
  border-radius: 5px;
  font-weight: 500;
  flex: 1;
  height: 30px;
  cursor: pointer;
`;
export const MsgBTN = styled.button`
  background-color: #ffffff;
  flex: 1;
  border: none;
  color: black;
  border-radius: 5px;
  font-weight: 500;
  box-shadow: 0 0 0 2px #dfdfdf;
  height: 30px;
  cursor: pointer;
`;
export const AlreadyFollowBtn = styled.button`
  background-color: #ffffff;
  border: none;
  color: #0095f6;
  border-radius: 5px;
  outline: 2px solid #0095f6;
  font-weight: 500;
  flex: 1;
  height: 30px;
  cursor: pointer;
`;
