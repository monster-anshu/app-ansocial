import styled from 'styled-components';

export const Container = styled.div`
  flex: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
export const Chats = styled.div`
  flex-grow: 1;
  overflow-y: scroll;
  scroll-behavior: smooth;
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    background-color: #f1f1f1;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgb(179, 179, 179);
  }
`;
