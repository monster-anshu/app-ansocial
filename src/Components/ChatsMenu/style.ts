import styled from 'styled-components';

export const Container = styled.div`
  padding: 10px;
  flex: 1;
  /* background-color: yellow; */
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
`;

export const Search = styled.input`
  width: 80%;
  border-radius: 10px;
  height: 30px;
  padding: 10px;
`;
