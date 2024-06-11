"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tweet_db_1 = require("../database/tweet.db");
let tweetId = 0;
class Tweet {
    constructor(content) {
        this.id = tweetId++;
        this.content = content;
        this.type = "normal" || "reply";
        this.likes = [];
        this.replies = [];
    }
    getTweetId() {
        return this.id;
    }
    showTweet() {
        this.showLikes();
        this.showReplies();
    }
    showLikes() {
        const showedTweet = tweet_db_1.tweets.find((item) => item.id === this.getTweetId());
        if (!showedTweet) {
            return console.log("Tweet not found.");
        }
        if (showedTweet.likes.length === 0) {
            return console.log(`@${showedTweet.username}: ${showedTweet.content}.`);
        }
        if (showedTweet.likes.length === 1) {
            return console.log(`@${showedTweet.username}: ${showedTweet.content} - @${showedTweet.likes[0]} liked.`);
        }
        if (showedTweet.likes.length > 1) {
            return console.log(`@${showedTweet.username}: ${showedTweet.content} - @${showedTweet.likes[0]} and ${showedTweet.likes.length - 1} more liked.`);
        }
    }
    showReplies() {
        const showedTweet = tweet_db_1.tweets.find((item) => item.id === this.getTweetId());
        if (showedTweet) {
            console.log(`@${showedTweet.username}: ${showedTweet.content}.`);
        }
        showedTweet === null || showedTweet === void 0 ? void 0 : showedTweet.replies.forEach((item) => {
            const replyOfTweet = `> @${item.username}: ${item.content}.`;
            if (showedTweet.replies.length > 0) {
                return console.log(`${replyOfTweet}`);
            }
        });
    }
}
exports.default = Tweet;
