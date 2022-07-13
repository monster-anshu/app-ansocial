import styled, { css } from 'styled-components';

export const Container = styled.div<{ isSelected?: boolean }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 20px;
  width: 100%;
  padding: 5px;
  border-radius: 5px;
  img {
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: 50%;
  }
  &:hover {
    background-color: #ffffff;
    outline: 2px solid black;
  }
  ${({ isSelected }) =>
    isSelected &&
    css`
      background-color: #ffffff;
    `}
  margin: 5px 0;
`;
export const Name = styled.span`
  flex-grow: 1;
`;

export const Unread = styled.span`
  background-color: #1877f2;
  height: 20px;
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  font-weight: 500;
  color: white;
  font-size: 12px;
`;
