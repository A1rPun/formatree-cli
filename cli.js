#!/usr/bin/env node
'use strict';
const formatree = require('formatree');
const fs = require('fs');
const getStdin = require('get-stdin');
const meow = require('meow');
const path = require('path');

const cli = meow(`
  Usage
    $ formatree [--limit=<number>] [--spacing=<number>] [--values] [--theme=<string>]
  Options
    -v, --version     Show this help
    -l, --limit       Limit the tree at a specific branch depth.
    -s, --spacing     Add some extra lines between the tree branches.
    -a, --values      Show the values of the siblings
    -t, --theme       Customize the output of the tree
                      themes: ascii, clean, stripes, arrows
    -h, --header      The first line of the tree
    -f, --footer      The last line of the tree
    -p, --parent      Append a string after a parent branch
        --sibling
        --lastSibling
        --indent
        --lastIndent
  Examples
    $ formatree
    .
    └── foo
        └── bar

    $ formatree --limit=1 --values
    .
    └── foo (/foo)

`, {
    alias: {
      v: 'version',
      l: 'limit',
      s: 'spacing',
      a: 'values',
      t: 'theme',
      h: 'header',
      f: 'footer',
      p: 'parent',
    },
  });

const limit = cli.flags.limit;
const input = cli.input[0];
const themes = {
  ascii: { sibling: '|-- ', lastSibling: '`-- ', indent: '|   ' },
  clean: { header: '', sibling: ' ', lastSibling: ' ', indent: '  ', lastIndent: '  ', footer: '' },
  stripes: { sibling: '─ ', lastSibling: '─ ', indent: '──', lastIndent: '──' },
  arrows: { header: 'v', sibling: '> ', lastSibling: '> ', indent: '>>', lastIndent: '>>', footer: '^' },
};

if (input) {
  init(input);
} else {
  getStdin().then(init);
}

function walkSync(dir, level) {
  try {
    return fs.statSync(dir).isDirectory() && (!limit || level < limit)
      ? fs.readdirSync(dir)
        .reduce((acc, f) => {
          acc[f] = walkSync(path.join(dir, f), level + 1);
          return acc;
        }, {})
      : dir;
  } catch (e) {
    return '';
  }
}

function init(data) {
  const structure = data ? data : walkSync(process.cwd(), 0);
  const theme = themes[cli.flags.theme] || {};
  const options = Object.assign({}, theme, cli.flags);
  console.log(formatree(structure, options));
}
