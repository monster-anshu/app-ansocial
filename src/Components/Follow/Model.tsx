import React, { useEffect, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { Data, Follow, Header, ModalContainer, User } from './ModalStyle';
import { UserType } from 'Types';
import { Context } from 'Context';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Loader } from 'Components';
interface Proptype {
  open: boolean;
  handleClose: () => void;
  user: UserType;
  isFollower?: boolean;
}
const TransitionsModal: React.FC<Proptype> = ({
  handleClose,
  open,
  user,
  isFollower,
}) => {
  const { fetchAxios } = React.useContext(Context);
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);

  const fetch = (Fid: string, Fpage: number) => {
    fetchAxios({
      url: `/user/${
        isFollower ? 'getFollowers' : 'getFollowing'
      }/${Fid}?page=${Fpage}`,
    })
      .then(({ data }) => {
        const newUsers = users.concat(data);
        setUsers(newUsers);
      })
      .finally(() => setLoading(false));
  };

  const handelFollow = (Fuser: UserType) => {
    const arr = users.map((Nuser) => {
      if (!(Nuser._id === Fuser._id)) return Nuser;
      return {
        ...Nuser,
        amIFollowing: !Fuser.amIFollowing,
      };
    });

    setUsers(arr);
    fetchAxios({
      url: `/user/${Fuser.amIFollowing ? 'unfollow' : 'follow'}/${Fuser._id}`,
      method: 'PUT',
    });
  };

  useEffect(() => {
    fetch(user._id, page);
    setPage(page + 1);
  }, []);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <ModalContainer>
          <Header>
            <h3>{isFollower ? 'Followers' : 'Followings'}</h3>
            <hr />
          </Header>
          <Data id={'followScroll'}>
            {loading && <Loader />}
            {!loading &&
              (users.length ? (
                <InfiniteScroll
                  dataLength={users.length}
                  hasMore={users.length < user.userFollowers}
                  loader={<>Loading</>}
                  next={() => {
                    fetch(user._id, page);
                    setPage((cpage) => cpage + 1);
                  }}
                  scrollableTarget={'followScroll'}
                >
                  {users.map((Fuser) => (
                    <User key={Fuser._id}>
                      <div>
                        <img src={Fuser.profilePicture} alt="" />
                        <div>
                          <span>{Fuser.username}</span>
                          <p>{Fuser.name}</p>
                        </div>
                      </div>
                      <Follow
                        isFollowing={Fuser.amIFollowing}
                        type={'button'}
                        onClick={() => {
                          handelFollow(Fuser);
                        }}
                      >
                        {Fuser.amIFollowing ? 'Following' : 'Follow'}
                      </Follow>
                    </User>
                  ))}
                </InfiniteScroll>
              ) : (
                <>
                  <p>No {isFollower ? 'Follower' : 'Following'} </p>
                </>
              ))}
          </Data>
        </ModalContainer>
      </Fade>
    </Modal>
  );
};
export default TransitionsModal;
