import styled, { css } from 'styled-components';

interface Proptypes {
  isMine?: boolean;
}

export const Container = styled.div<Proptypes>`
  flex: 2;
  width: 100%;
  display: flex;
  justify-content: flex-start;

  div {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    gap: 6px;
    max-width: 80%;
    margin: 5px;
    cursor: pointer;
    img {
      height: 40px;
      width: 40px;
      border-radius: 50%;
      object-fit: cover;
    }
    p {
      flex: 1;
      word-wrap: break-word;
      padding: 8px;
      border-radius: 7px;
      font-weight: 400;
      color: #ffffff;
      background-color: blue;
      span {
        display: block;
        text-align: end;
        font-size: 12px;
        font-weight: 300;
      }
    }
  }
  ${({ isMine }) =>
    isMine &&
    css`
      justify-content: flex-end;
      div {
        flex-direction: row-reverse;
        p {
          box-shadow: 0 0 5px gray;
          color: blue;
          background-color: #ffffff;
        }
      }
    `}
`;
