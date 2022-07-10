import styled from 'styled-components';

export const Container = styled.div`
  height: 50px;
  background-color: #1877f2;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
`;
export const Left = styled.div`
  flex: 3;
`;
export const Right = styled.div`
  flex: 4;
  display: flex;
  align-items: center;
  justify-content: space-around;
  color: #ffffff;
`;
export const Center = styled.div`
  flex: 4.5;
`;
export const Logo = styled.span`
  font-size: 24px;
  margin-left: 20px;
  color: white;
  font-weight: bold;
  cursor: pointer;
`;
export const SearchBar = styled.form`
  width: 100%;
  border-radius: 30px;
  display: flex;
  align-items: center;
  padding: 5px 0;
  padding-left: 10px;
  background-color: #ffffff;
`;
export const InputSearch = styled.input`
  border: none;
  width: 90%;
  &:focus {
    outline: none;
  }
`;
export const Linkes = styled.div`
  a {
    color: #ffffff;
    text-decoration: none;
    margin: 0 10px;
  }
`;

export const Icons = styled.div`
  display: flex;
  align-items: center;
`;
export const Icon = styled.div`
  margin-right: 20px;
  position: relative;
  cursor: pointer;
  /* &::before {
    content: attr(data-count);
    padding: 2px;
    position: absolute;
    top: -10px;
    right: -8px;
    width: 15px;
    height: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: red;
    border-radius: 50%;
    font-size: 12px;
  } */
  i {
    font-size: 1.2rem;
  }
`;
export const Img = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
`;
