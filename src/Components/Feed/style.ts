import styled from 'styled-components';

export const Container = styled.div`
  flex: 4.5;
  padding: 20px;
  overflow-y: scroll;
  height: 100%;
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
export const Details = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  gap: 20px;
`;
