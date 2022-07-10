import styled from 'styled-components';

export const Container = styled.form`
  border-radius: 10px;
  padding: 10px 20px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px,
    rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  flex: 1;
  position: relative;
`;
export const LoaderDiv = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 5;
  background-color: rgb(255, 255, 255, 0.5);
`;
export const Top = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
`;
export const Img = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
`;
export const Input = styled.textarea`
  border: none;
  width: 100%;
  height: 100%;
  resize: none;
  padding: 10px;
  margin-left: 10px;
  background-color: #f0f2f5;

  &:focus {
    outline: none;
  }
  &::-webkit-scrollbar {
    display: none;
  }
`;
export const Hr = styled.hr`
  margin: 10px 0;
`;
export const Bottom = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const Options = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
  width: 100%;
`;

export const Option = styled.label`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  cursor: pointer;
`;

export const OptionText = styled.p`
  font-size: 14px;
  font-weight: 500;
`;

export const Button = styled.button`
  border: none;
  padding: 7px;
  border-radius: 5px;
  background-color: green;
  font-weight: 500;
  color: white;
  cursor: pointer;
`;
export const PreviewContainer = styled.div`
  position: relative;
  img {
    width: 100%;
    border-radius: 5px;
  }
  margin-top: 20px;
  i {
    position: absolute;
    background-color: #ffffff;
    right: -5px;
    top: -5px;
    font-size: 20px;
    border-radius: 50%;
    padding: 5px;
    cursor: pointer;
  }
`;
