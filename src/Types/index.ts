export interface UserType {
  username: string;
  coverPicture: string;
  createAt: string;
  email: string;
  amIFollowing: boolean;
  isHefollowing: boolean;
  name: string;
  profilePicture: string;
  updatedAt: string;
  userFollowers: number;
  userFollowing: number;
  userPosts: number;
  _id: string;
}
export interface PostType {
  _id: string;
  description: string;
  image: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  postLikes: number;
  postComments: number;
  isAlreadyLiked: boolean;
  isOwner: boolean;
  user: {
    _id: string;
    name: string;
    profilePicture: string;
    username: string;
  };
}

export interface MessageType {
  sender: string;
  text: string;
  createdAt: string;
  _id: string;
}
