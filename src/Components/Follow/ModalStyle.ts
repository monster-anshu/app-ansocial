import styled, { css } from 'styled-components';

export const ModalContainer = styled.div`
  background-color: #ffffff;
  padding: 10px 0;
  border-radius: 10px;
  width: 100%;
  max-width: 400px;
  max-height: 450px;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Header = styled.header`
  h3 {
    font-weight: 500;
    text-align: center;
    padding-top: 10px;
  }
  hr {
    margin: 10px 0;
  }
`;

export const Data = styled.div`
  padding: 0 5px;
  flex-grow: 1;
`;
export const User = styled.div`
  padding: 0 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;
  /* border: 2px solid; */
  & > div {
    display: flex;
    align-items: center;
    gap: 10px;
    width: calc(100% - 90px);
    overflow: hidden;
    & > div {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      flex-grow: 1;
      span {
        font-weight: 500;
      }
      p {
        color: rgb(142, 142, 142);
      }
    }
    img {
      width: 45px;
      height: 45px;
      object-fit: cover;
      border-radius: 50%;
    }
  }
`;

interface Proptype {
  isFollowing: boolean;
}

export const Follow = styled.button<Proptype>`
  background-color: #0095f6;
  border: none;
  color: #ffffff;
  border-radius: 5px;
  font-weight: 500;
  flex: 1;
  height: 25px;
  cursor: pointer;
  max-width: 80px;
  ${({ isFollowing }) =>
    isFollowing &&
    css`
      background-color: #ffffff;
      color: #0095f6;
      outline: 2px solid #0095f6;
    `}
`;
