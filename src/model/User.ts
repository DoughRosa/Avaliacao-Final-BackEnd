import { tweets } from "../database/tweet.db";
import { users } from "../database/users.db";
import TweetType from "../types/TweetType";
import UserType from "../types/UserType";
import Tweet from "./Tweet";

let userId: number = 0;

class User {
  private id: number;
  name: string;
  email: string;
  username: string;
  protected password: string;
  myTweets: TweetType[];
  following: UserType[];

  constructor(user: UserType) {
    this.id = userId++;
    this.name = user.name;
    this.email = user.email;
    this.username = user.username;
    this.password = user.password;
    this.myTweets = [];
    this.following = [];
  }

  getUserId() {
    return this.id;
  }

  getUserPassword(){
    return this.password;
  }

  signUpUser() {
    const listOfUsersEmails = users.find((item) => item.email === this.email);
    const listOfUsersUsername = users.find(
      (item) => item.username === this.username
    );

    if (listOfUsersEmails) {
      return console.log(
        "The E-mail you are trying to register has already been registered on GrowTwitter!"
      );
    } else if (listOfUsersUsername) {
      return console.log(
        "The Username you are trying to register has already been registered on GrowTwitter!"
      );
    } else {     
      users.push({
        id: this.id,
        name: this.name,
        email: this.email,
        username: this.username,
        password: this.password,
        myTweets: this.myTweets,
      });
    }
    console.log("You successfully signed up!");
  }

  tweet(tweet: Tweet) {
    const dataTweet: TweetType = {
        id: tweet.getTweetId(),
        username: this.username,
        content: tweet.content,
        type: "normal",
        likes: [],
        replies: [],
      };

      this.myTweets.push(dataTweet);
      tweets.push(dataTweet);
  }

  follow(user: User){
    const followUser = users.find((item) => item.username === user.username);
    const alreadyFollowing = this.following.findIndex((item) => item.username === user.username)

    if (!followUser){
      return console.log("User not found!")
    }
    
    if (followUser?.username === this.username){
      return console.log("You can not follow yourself!")
    }
    
    if (alreadyFollowing !== -1){
      return console.log(`You are already following ${user.username}`)
    }

    else {
      const followedUser: UserType = {
        email: user.email,
        name: user.name,
        password: "*****",
        username: user.username,
        myTweets: user.myTweets,
      }

      this.following.push(followedUser)

      return console.log(`You are now following ${user.username}`)
    }
  }

  like(tweet: Tweet) {
    const likedTweet = tweets.find((item) => item.id === tweet.getTweetId());
    const tweetUsername = users.find((user) => user.id === this.getUserId()); 
    
    if (likedTweet && tweetUsername) {
      likedTweet.likes.push(tweetUsername?.username);

      console.log("You Liked This Tweet");
      
    }
  }

  reply(originalTweet: Tweet, content: string){
    const originalTweetDb = tweets.find(item => item.id === originalTweet.getTweetId())
    const replyTweet = new Tweet(content);

    const dataReply: TweetType = {
      id: replyTweet.getTweetId(),
      username: this.username,
      content: replyTweet.content,
      type: "reply",
      likes: replyTweet.likes,
      replies: [],
    };

    tweets.push(dataReply);
    this.myTweets.push(dataReply);
    originalTweet.replies.push(dataReply);
    originalTweetDb?.replies.push(dataReply);
  }

  feed(){
    const myTweetsArray = this.myTweets;
    const followingArray = this.following;

    myTweetsArray.forEach((item) => {
      if (item.likes.length === 1){
        const myTweetsFeed = `@${this.username}: ${item.content} [${item.likes[0]} liked this]`;

      console.log(myTweetsFeed);
      console.log("------------------------");
      } else {
        const myTweetsFeed = `@${this.username}: ${item.content} [${item.likes.length} likes]`;

      console.log(myTweetsFeed);
      console.log("------------------------");
      }
    });

    followingArray.forEach((item) => {
      const tweetsFromFollowingUser = item.myTweets;

      tweetsFromFollowingUser?.forEach((item) => {
        const contentFolloingUsersTweet = item.content;
        
        const followingTweetsFeed = `> @${item.username}: ${contentFolloingUsersTweet}`;

        console.log(followingTweetsFeed);

        console.log("---------------------");
        
      });
    });
  }
}

export default User;