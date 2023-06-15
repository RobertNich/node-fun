#! /usr/bin/env node
import fetch from "node-fetch";
import open from "open";
import yargs from "yargs";

const { argv } = yargs(process.argv);

async function getRandomRedditPostWithoutVideo() {
  try {
    const response = await fetch("https://reddit.com/.json");
    const data = await response.json();
    const children = data.data.children;

    if (children.length < 1) {
      console.log("Request succeeded, but there were no posts!");
      return {
        data: { title: "No reddit posts available today", link: "none" },
      };
    }

    let post = getRandomPost(children);

    while (post.data.is_video) {
      console.log("Found a video, skipping post.");

      if (children.length < 1) {
        console.log("All posts were videos, how unlucky!");
        return { data: { title: "Only videos on reddit today", link: "none" } };
      }

      post = getRandomPost(children);
    }

    return post;
  } catch (error) {
    console.error(`Failed to fetch Reddit posts: ${error}`);
    return null;
  }
}

function getRandomPost(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  const post = array[randomIndex];
  array.splice(randomIndex, 1); // Remove the selected post
  return post;
}

async function main() {
  const actualPost = await getRandomRedditPostWithoutVideo();

  if (!actualPost) {
    console.log("Failed to fetch a Reddit post");
    return;
  }

  const link = `https://reddit.com${actualPost.data.permalink}`;

  if (argv.print) {
    console.log(`title: ${actualPost.data.title}\nlink: ${link}`);
  } else {
    open(link);
  }
}

main();
