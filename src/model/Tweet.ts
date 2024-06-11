import { tweets } from "../database/tweet.db";
import TweetType from "../types/TweetType";

let tweetId = 0;

class Tweet {
    private id: number;
    content: string; 
    type: string;
    likes: [];
    replies: TweetType[];


    constructor(content:string) {
        this.id = tweetId++;
        this.content = content;
        this.type = "normal" || "reply";
        this.likes = [];
        this.replies = [];
    }

    getTweetId(){
        return this.id;
    }

    showTweet(){
        this.showLikes();
        this.showReplies();
    }

    showLikes(){
        const showedTweet = tweets.find((item) => item.id === this.getTweetId());

        if (!showedTweet) {
            return console.log("Tweet not found.")
        }

        if (showedTweet.likes.length === 0){
            return console.log(`@${showedTweet.username}: ${showedTweet.content}.`);
        }

        if (showedTweet.likes.length === 1){
            return console.log(`@${showedTweet.username}: ${showedTweet.content} - @${showedTweet.likes[0]} liked.`);
        }

        if (showedTweet.likes.length > 1){
             return console.log(`@${showedTweet.username}: ${showedTweet.content} - @${showedTweet.likes[0]} and ${showedTweet.likes.length-1} more liked.`);
        }
    }

    showReplies(){
        const showedTweet = tweets.find((item) => item.id === this.getTweetId());

        if (showedTweet) {
            console.log(`@${showedTweet.username}: ${showedTweet.content}.`)
        }

        showedTweet?.replies.forEach((item) => {
            const replyOfTweet = `> @${item.username}: ${item.content}.`;
      
            if (showedTweet.replies.length > 0){
                return console.log(`${replyOfTweet}`);
            }
        })
    }
}

export default Tweet