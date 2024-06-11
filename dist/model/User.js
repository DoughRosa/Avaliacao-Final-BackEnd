"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tweet_db_1 = require("../database/tweet.db");
const users_db_1 = require("../database/users.db");
const Tweet_1 = __importDefault(require("./Tweet"));
let userId = 0;
class User {
    constructor(user) {
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
    getUserPassword() {
        return this.password;
    }
    signUpUser() {
        const listOfUsersEmails = users_db_1.users.find((item) => item.email === this.email);
        const listOfUsersUsername = users_db_1.users.find((item) => item.username === this.username);
        if (listOfUsersEmails) {
            return console.log("The E-mail you are trying to register has already been registered on GrowTwitter!");
        }
        else if (listOfUsersUsername) {
            return console.log("The Username you are trying to register has already been registered on GrowTwitter!");
        }
        else {
            users_db_1.users.push({
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
    tweet(tweet) {
        const dataTweet = {
            id: tweet.getTweetId(),
            username: this.username,
            content: tweet.content,
            type: "normal",
            likes: [],
            replies: [],
        };
        this.myTweets.push(dataTweet);
        tweet_db_1.tweets.push(dataTweet);
    }
    follow(user) {
        const followUser = users_db_1.users.find((item) => item.username === user.username);
        const alreadyFollowing = this.following.findIndex((item) => item.username === user.username);
        if (!followUser) {
            return console.log("User not found!");
        }
        if ((followUser === null || followUser === void 0 ? void 0 : followUser.username) === this.username) {
            return console.log("You can not follow yourself!");
        }
        if (alreadyFollowing !== -1) {
            return console.log(`You are already following ${user.username}`);
        }
        else {
            const followedUser = {
                email: user.email,
                name: user.name,
                password: "*****",
                username: user.username,
                myTweets: user.myTweets,
            };
            this.following.push(followedUser);
            return console.log(`You are now following ${user.username}`);
        }
    }
    like(tweet) {
        const likedTweet = tweet_db_1.tweets.find((item) => item.id === tweet.getTweetId());
        const tweetUsername = users_db_1.users.find((user) => user.id === this.getUserId());
        if (likedTweet && tweetUsername) {
            likedTweet.likes.push(tweetUsername === null || tweetUsername === void 0 ? void 0 : tweetUsername.username);
            console.log("You Liked This Tweet");
        }
    }
    reply(originalTweet, content) {
        const originalTweetDb = tweet_db_1.tweets.find(item => item.id === originalTweet.getTweetId());
        const replyTweet = new Tweet_1.default(content);
        const dataReply = {
            id: replyTweet.getTweetId(),
            username: this.username,
            content: replyTweet.content,
            type: "reply",
            likes: replyTweet.likes,
            replies: [],
        };
        tweet_db_1.tweets.push(dataReply);
        this.myTweets.push(dataReply);
        originalTweet.replies.push(dataReply);
        originalTweetDb === null || originalTweetDb === void 0 ? void 0 : originalTweetDb.replies.push(dataReply);
    }
    feed() {
        const myTweetsArray = this.myTweets;
        const followingArray = this.following;
        myTweetsArray.forEach((item) => {
            if (item.likes.length === 1) {
                const myTweetsFeed = `@${this.username}: ${item.content} [${item.likes[0]} liked this]`;
                console.log(myTweetsFeed);
                console.log("------------------------");
            }
            else {
                const myTweetsFeed = `@${this.username}: ${item.content} [${item.likes.length} likes]`;
                console.log(myTweetsFeed);
                console.log("------------------------");
            }
        });
        followingArray.forEach((item) => {
            const tweetsFromFollowingUser = item.myTweets;
            tweetsFromFollowingUser === null || tweetsFromFollowingUser === void 0 ? void 0 : tweetsFromFollowingUser.forEach((item) => {
                const contentFolloingUsersTweet = item.content;
                const followingTweetsFeed = `> @${item.username}: ${contentFolloingUsersTweet}`;
                console.log(followingTweetsFeed);
                console.log("---------------------");
            });
        });
    }
}
exports.default = User;
