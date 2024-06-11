"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_db_1 = require("./database/users.db");
const Tweet_1 = __importDefault(require("./model/Tweet"));
const User_1 = __importDefault(require("./model/User"));
const user1 = new User_1.default({
    email: "douglas@gmail.com",
    name: "Douglas",
    password: "1234",
    username: "Douglas Rosa",
});
const user2 = new User_1.default({
    email: "janaina@gmail.com",
    name: "Janaina",
    password: "1234",
    username: "Janaina Rosa",
});
const user3 = new User_1.default({
    email: "calamidade@gmail.com",
    name: "Calamidade",
    password: "1234",
    username: "Calamidade Rosa",
});
console.log("************** FEATURE #1 - CADASTRO DE USUÁRIOS *****************");
user1.signUpUser();
user2.signUpUser();
user3.signUpUser();
console.log("************** VERIFICAÇÃO SE OS USUÁRIOS FORAM CADASTRADOS *****************");
console.log(users_db_1.users);
console.log("************** VERIFICAÇÃO SE PODE CADASTRAR UM USUÁRIO COM O MESMO E-MAIL E/OU USERNAME *****************");
user1.signUpUser();
console.log("************** FEATURE #2 - CADASTRO DE TWEETS *****************");
const tweet1 = new Tweet_1.default("meu primeiro tweet");
const tweet2 = new Tweet_1.default("meu segundo tweet");
user1.tweet(tweet1);
user1.tweet(tweet2);
user2.tweet(tweet1);
user2.tweet(tweet2);
user3.tweet(tweet1);
user3.tweet(tweet2);
console.log(tweet1);
console.log(tweet2);
console.log("************** FEATURE #3 - EXIBIÇÃO DE TWEETS *****************");
tweet1.showTweet();
console.log("************** FEATURE #4 - FOLLOWERS *****************");
user1.follow(user2);
user1.follow(user3);
user1.follow(user1);
console.log("************** FEATURE #5 - LIKES EM TWEETS *****************");
user1.like(tweet2);
user3.like(tweet2);
user3.like(tweet1);
console.log("************** FEATURE #6 - REPLY EM TWEETS *****************");
user1.reply(tweet2, "este é um reply teste1");
console.log(tweet2);
console.log("************** FEATURE #7 - EXIBIÇÃO DE TWEETS COM LIKES *****************");
tweet2.showLikes();
console.log("************** FEATURE #8 - EXIBIÇÃO DE TWEETS COM REPLIES *****************");
tweet2.showReplies();
console.log("************** FEATURE #9 - FEED DE TWEETS *****************");
user1.feed();
