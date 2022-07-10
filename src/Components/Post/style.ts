import styled, { css } from 'styled-components';
interface Prop {
  clicked: boolean;
}
export const Container = styled.div`
  width: 100%;
  flex-grow: 1;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px,
    rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  max-width: 600px;
`;
export const Top = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const TopLeft = styled.div`
  display: flex;
  align-items: center;
`;
export const ProfilePicture = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin: 10px 0 0 10px;
  cursor: pointer;
`;
export const ProfileName = styled.span`
  font-size: 15px;
  font-weight: 500;
`;
export const Time = styled.span`
  font-size: 10px;
`;
export const TimeContainer = styled.div`
  margin: 0 10px;
  display: flex;
  flex-direction: column;
`;
export const Center = styled.div``;
export const PostText = styled.div`
  margin: 5px 0;
  margin-left: 15px;
`;
export const PostImgContainer = styled.div<Prop>`
  position: relative;
  width: 100%;

  &::after {
    content: '';
    width: 100px;
    height: 100px;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    background: url('https://imgur.com/rksyGE8.png') no-repeat center/contain;
    transform: scale(0);
    animation-duration: 1000ms;
    animation-timing-function: ease-in-out;
    ${(prop) => css`
      animation-name: ${prop.clicked ? 'like-heart-animation' : null};
    `}
  }
  img {
    object-fit: cover;
    /* height: 100%; */
    width: 100%;
  }
`;

export const TopRight = styled.div`
  position: relative;
  cursor: pointer;
`;
export const Bottom = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-bottom: 5px;
`;
export const Love = styled.div`
  display: flex;
  align-items: center;
  min-width: 40px;
  i {
    font-size: 2rem;
  }
`;
export const Count = styled.span`
  font-size: 12px;
`;
export const Options = styled.ul<{ isActive?: boolean }>`
  position: absolute;
  list-style: none;
  background-color: #f0f2f5;
  padding: 5px;
  border-radius: 10px;
  left: -100px;
  top: -10px;
  ${({ isActive }) => css`
    display: ${isActive ? 'block' : 'none'};
  `}
  li {
    text-align: center;
    background-color: #ffffff;
    padding: 10px 20px;
    margin: 5px;
    border-radius: 5px;
    cursor: pointer;
    font-weight: 500;
    &:first-child {
      background-color: red;
      color: #ffffff;
    }
  }
`;
