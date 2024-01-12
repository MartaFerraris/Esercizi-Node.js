import { EventEmitter } from "events";

function createNewsFeed() {
    const emitter = new EventEmitter();

    emitter.on("newsEvent", (newsEvent) => {
        console.log(newsEvent);
    });
    setInterval(() => {
        emitter.emit("newsEvent", "News: A thing happened in a place.");
    }, 1000);

    emitter.on("breakingNews", (breakingNews) => {
        console.log(breakingNews);
    });
    setInterval(() => {
        emitter.emit("breakingNews", "Breaking news! A BIG thing happened.");
    }, 4000);

    emitter.on("error", (error) => {
        console.error(error);
    });
    setTimeout(() => {
        emitter.emit("error", new Error("News feed connection error"));
    }, 5000);

    return emitter;
}

const newsFeed = createNewsFeed();