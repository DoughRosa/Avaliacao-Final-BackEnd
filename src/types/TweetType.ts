import Tweet from "../model/Tweet";
import UserType from "./UserType";

interface TweetType {
    id: number;
    username: string;
    content: string; 
    type: string;
    likes: string[];
    replies: TweetType[];
}

export default TweetType;