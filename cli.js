#!/usr/bin/env node
'use strict';
const formatree = require('formatree');
const fs = require('fs');
const getStdin = require('get-stdin');
const meow = require('meow');
const path = require('path');

const cli = meow(`
	Usage
	  $ formatree <structure> [--limit=<number>] [--spacing=<number>] [--values]
  Options
    -l, --limit     Limit the tree at a specific branch depth.
    -s, --spacing   Add some extra lines between the tree branches.
    -v, --values    Show the values of the siblings in the tree
	Examples
    $ formatree
    .
    └── foo
        └── bar

    $ formatree --limit=1 --values
    .
    └── foo (1337 bytes)

`,{
  alias: {
    l: 'limit',
    s: 'spacing',
    v: 'values',
  },
});

const limit = cli.flags.limit;
const input = cli.input[0];

if (input) {
	init(input);
} else {
	getStdin().then(init);
}

function walkSync(dir, level) {
  const stats = fs.statSync(dir);
  return stats.isDirectory() && (!limit || level < limit)
    ? fs.readdirSync(dir)
      .sort((a, b) => Array.isArray(a) ? 0 : 1)
      .reduce((acc, f) => {
        acc[f] = walkSync(path.join(dir, f), level + 1)
        return acc;
      }, {})
    : stats.size + ' byte' + (stats.size > 1 ? 's' : '');
}

function init(data) {
  const structure = data ? JSON.parse(data) : walkSync(process.cwd(), 0);
	console.log(formatree(structure, cli.flags));
}
