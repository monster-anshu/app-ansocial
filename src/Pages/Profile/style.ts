import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  overflow-y: scroll;
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

export const ProfileData = styled.div`
  position: relative;
`;
export const CoverPicture = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  margin-bottom: 60px;
`;

export const ProfilePicture = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 50%;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  top: 150px;
  box-shadow: 0 0 0 3px #ffffff;
  background-color: #1877f2;
`;
export const ProfileInfo = styled.div`
  text-align: center;
  h2 {
    font-size: 24px;
  }
  p {
    font-weight: 300;
  }
`;
export const Details = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  padding: 10px 30px;
  gap: 20px;
  flex-wrap: wrap-reverse;
  & > form {
    margin: 0;
  }
`;

export const Posts = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  & > div {
    width: 100%;
    & > div {
      padding: 10px 30px;
      margin: 0 auto;
      display: flex;
      width: 100%;
      gap: 20px;
      align-items: flex-start;
      justify-content: center;
    }
  }
`;
export const PM = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  /* align-items: c; */
`;
export const CContainer = styled.div`
  flex: 1;
  height: 400px;
  border-radius: 5px;
  max-width: 500px;
  background-color: #fff;
  padding: 10px;
  box-shadow: 0 0 10px gray;
`;
