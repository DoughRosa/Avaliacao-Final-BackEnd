import TweetType from "./TweetType";

interface UserType {
    id?: number;
    name: string;
    email: string;
    username: string;
    password: string;
    myTweets?: TweetType[];
    following?: [];
}

export default UserType;