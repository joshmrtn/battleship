// Tell ESLint that `process` is a node global:
/* global process */

import { execSync } from "child_process";

// Helper to run commands and print output.
function run(command) {
  try {
    console.log(`> ${command}`);
    execSync(command, { stdio: "inherit" });
  } catch (error) {
    console.error(`ERROR: Command failed: ${command}`, error);
    // Throw an error to bubble up the try/catch/finally block
    throw error;
  }
}

console.log("Starting deployment sequence...");

// Check for uncommitted changes and abort early if found.
try {
  const gitStatus = execSync("git status --porcelain", {
    encoding: "utf8",
  }).trim();
  if (gitStatus) {
    console.error(
      "\nDeployment aborted: You have uncommitted changes in your working directory.",
    );
    console.error("Commit or stash changes before deploying.");
    process.exit(1);
  }
} catch (error) {
  console.error("\nFailed to check Git status.", error);
  process.exit(1);
}

// Capture the starting branch dynamically.
const startingBranch = execSync("git branch --show-current", {
  encoding: "utf-8",
}).trim();

// Main execution block with rollback.
try {
  // Quality checks.
  run("npm run validate");

  // Git operations
  // Switch to the deployment branch.
  run("git checkout gh-pages");

  // Bring in the latest changes from startingBranch.
  run(`git merge ${startingBranch} --no-edit`);

  // Run the build process.
  run("npm run build");

  // Force-add the dist folder.
  run("git add dist -f");

  // Commit the changes.
  // No need to run pre-commit hooks since we run them above.
  run('git commit -m "Deployment commit" --no-verify');

  // Push the subtree to GitHub pages.
  run("git subtree push --prefix dist origin gh-pages");

  console.log("\n Deployment pushed successfully.");
} catch (error) {
  console.error("\nError. Deployment failed mid-sequence.", error);
  console.error("\nAttempting to roll back changes");
} finally {
  console.log(
    `\n Cleaning up... Returning to original branch: ${startingBranch}`,
  );

  // Abort an ongoing merge if it got stuck
  try {
    execSync("git merge --abort", { stdio: "ignore" });
  } catch {
    // No merge conflicts to abort
  }
  // Switch safely back to the main branch.
  try {
    execSync(`git checkout ${startingBranch}`, { stdio: "inherit" });
  } catch {
    console.error(`Failed to switch back to ${startingBranch}`);
  }
}
