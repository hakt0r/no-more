#!/usr/bin/env node
const fs = require('fs');
const { join } = require('path');

// Read the contents of the README file
const manifesto = fs.readFileSync(
  join(__dirname, 'README.md'),
  'utf8'
  // We only want the first section of the README
  // which is the manifesto
).split('## How')[0]

// If the script is run from a terminal, make the text red
if (process.stdin.isTTY) console.log(format(manifesto));

// Else, just print the text
else console.log(manifesto);

// Protest would not be complete without disruption
process.exit(1);

// Now, I could not find a good markdown renderer for the terminal
// this repo should have next to no dependencies... so here we go... xD

function format(text) {
  const red = '\x1b[31m', yellow = '\x1b[33m', bold = '\x1b[1m',
    italic = '\x1b[3m', underline = '\x1b[4m', reset = '\x1b[0m';
  return text
    .replace(/\[(.*)\]\((.*)\)/, `${underline}$2${reset}\n\n${bold}$1${reset}`)      // First Link
    .replace(/\[(.*)\]\((.*)\)/g, `${underline}$2${reset}\x1b[45G${bold}$1${reset}`) // Link
    .replace(/## (.*)/g, `--==[${yellow}$1${reset}]==--`)                            // Headline 2
    .replace(/# (.*)/g, `\n--==[${red}$1${reset}]==--`)                              // Headline 1
    .replace(/_([\s\S]+)_/g, `${italic}$1${reset}`)                                  // Italics
    .replace(/\*\*([^\*]+)\*\*/g, `${bold}$1${reset}`)                               // Bold
    .replace(/<br>/g, ``)                                                            // Line break (html)
}

// Don't be scared, it's just a small accumulation of regular expressions :D ... and ansi escape codes