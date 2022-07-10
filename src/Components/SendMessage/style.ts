import styled from 'styled-components';

export const Container = styled.form`
  padding: 5px;
  display: flex;
  align-items: flex-start;
  gap: 7px;
  textarea {
    flex-grow: 1;
    border-radius: 5px;
    padding: 10px;
    resize: vertical;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  button {
    cursor: pointer;
    border: none;
    padding: 10px;
    background-color: #ffffff;
    color: blue;
    border-radius: 5px;
    box-shadow: 0 0 5px gray;
  }
`;
