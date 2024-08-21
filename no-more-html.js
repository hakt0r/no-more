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

// Convert the markdown to HTML
const html = format(manifesto);

// Write the HTML to a new file
fs.writeFileSync('index.html', html);

// Now, I could not find a good markdown renderer for html
// this repo should have next to no dependencies... so here we go... xD

function format(text) {
  return `\
<html><head>
  <title>No More!</title>
  <style>
    body {
      --l: #00FF0020; --b: #FFFFFF20; --bb: #FFFFFF20;
      font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
      max-width: 40em; margin: 5vh auto 0 auto;
      background-color: #252525; color: #f0f0f0;
      padding: 2em; border-radius: 1em;
      line-height: 160%;
      background:
        linear-gradient(0deg, #252525 5%, #303030 50%),
        linear-gradient(90deg, #252525FF 5%, #00000000 50%),
        linear-gradient(90deg, #00000000 50%, #252525FF 95%)
      ;
    }
    * { text-shadow: #00000033 1.5px 0 2.5px; }
    h1, h2 { border-radius: 0.5em; padding: 0.5em; background: var(--b);
      box-shadow: inset 0 0 0.2em #00000033;
     }
    h1, h2 { color: f04040; }
    p { margin: 0.5em 1.5em; } p:last-of-type { margin-bottom: 0; }
    a {
      margin-bottom: 0.3em;
      display:inline-block; text-decoration: none; color: #40f040;
      background: var(--l); padding: 0 0.5em; border-radius: 0.3em;
      position: relative; left: -0.2em;
    }
    a:visited { color: #40f040; } a:hover { color: #efe; background: var(--bb); }
  </style>
</head><body>
${text.replace('repository', 'website')                    // Position, position, position!
      .replace(/- (.*)/g, '$1')                            // List item 
      .replace(/## (.*)/g, '<h2>$1</h2>')                  // Headline 2
      .replace(/# (.*)/g, '<h1>$1</h1>')                   // Headline 1
      .replace(/_([\s\S]+)_/g, '<em>$1</em>')              // Italics
      .replace(/\*\*([^\*]+)\*\*/g, '<strong>$1</strong>') // Bold       vvvvvvvv Link
      .replace(/\[(.*)\]\((.*)\)/g, '<a rel="noopener" target="_blank" href="$2">$1</a>')
      .split('\n\n').join('<p/>')                          // Paragraph
    }
</body></html>`
}

// Don't be scared, it's just a small accumulation of regular expressions :D