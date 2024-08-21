#!/usr/bin/env node
const fs = require('fs');
const { join, basename } = require('path');
const { execSync } = require('child_process');

// Get the name of the repository
const name = basename(repo);

// Get the list of repositories to replace
const args = process.argv.slice(2);

// If no repositories are provided, use the current directory
if (args.length === 0) args.push(process.cwd());

// Loop through each repository
for (const repo of args) {

  // Log the repository being solidarized
  console.log(`Solidarizing ${repo} with us!`);

  // Enter the repository directory
  process.chdir(repo);

  if (fs.existsSync(join(repo, 'protest.js'))) {
    console.error(`${name} seems to be protesting already`);
    process.exit(1);
  }

  // Check out main branch and pull the latest changes
  try { execSync('git checkout main && git pull') } catch (e) {
    // If this fails we don't want to continue
    console.error(`Failed to pull the latest changes from ${name}`);
    console.error(e);
    process.exit(1);
  }

  // Delete all files, including hidden files, except .git
  const files = fs.readdirSync(repo);
  for (const file of files) {
    if (file !== '.git') {
      const filePath = join(repo, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        fs.rmdirSync(filePath, { recursive: true });
      } else {
        fs.unlinkSync(filePath);
      }
    }
  }

  // Copy the files from this repository (not including hidden files)
  const sourceDir = __dirname, destDir = repo;

  fs.readdirSync(sourceDir).forEach((file) => {
    const sourceFile = join(sourceDir, file);
    const destFile = join(destDir, file);
    fs.copyFileSync(sourceFile, destFile);
  });

  // Commit the changes
  try { execSync('git add . && git commit -m "NO MORE"') } catch (e) {
    console.error(`Failed to commit the changes to ${name}`);
    console.error(e);
    process.exit(1);
  }

  console.log(`${name} is now solidarized with us`);
  console.log('Please push the changes or create an MR to the main branch');
}
