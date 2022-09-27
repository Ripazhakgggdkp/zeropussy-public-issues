import fs from "fs";
import { join } from "path";
import { Octokit } from "octokit";
import Issue from "../interfaces/post";

const postsDirectory = join(process.cwd(), "_posts");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export async function getAllPosts(): Promise<Issue[]> {
  const octokit = new Octokit({
    auth: process.env.API_KEY,
  });

  const result = await octokit.paginate(
    "GET /repos/{owner}/{repo}/issues",
    {
      owner: "Ripazhakgggdkp",
      repo: "zeropussy",
      per_page: 100,
      state: "all",
      sort: "updated",
    },
    (response, done) => response.data
  );

  console.log("length", result.length);

  return result
    .filter((issue) => !issue.pull_request)
    .map((issue) => ({
      title: issue.title,
      description: issue.body,
      date: issue.updated_at,
      state: issue.state,
    }));
}
