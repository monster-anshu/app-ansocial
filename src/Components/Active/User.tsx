import { Context } from 'Context';
import React, { useContext, useEffect, useState } from 'react';
import { UserType } from 'Types';
import { Profile } from './style';
interface Proptype {
  id: string;
}
const User: React.FC<Proptype> = ({ id }) => {
  const { fetchAxios } = useContext(Context);
  const [user, setUser] = useState<UserType | null>(null);
  useEffect(() => {
    fetchAxios({
      url: `/user/id/${id}`,
    }).then(({ data }) => {
      setUser(data.user);
    });
  }, []);
  return (
    user && (
      <Profile>
        <div>
          <img src={user.profilePicture} />
        </div>
        <p>
          {user.name}
          <span> ( {user.username} ) </span>
        </p>
      </Profile>
    )
  );
};

export default User;
