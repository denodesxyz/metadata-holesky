import * as core from '@actions/core';
import * as github from '@actions/github';

const token = process.env.GITHUB_TOKEN;

if (!token) {
  core.setFailed('GITHUB_TOKEN env variable is required');
  process.exit(1);
}

const octokit = github.getOctokit(token);

export const addComment = async (body: string) => {
  const { owner, repo, number } = github.context.issue;

  await octokit.rest.issues.createComment({ owner, repo, issue_number: number, body });
};

export const run = async (command: () => Promise<void>) => {
  try {
    await command();
  } catch (error) {
    core.setFailed(error.message);
  }
}