# formatree-cli

> Format a folder structure to a depth indented string

## Install

```
$ npm i -g formatree-cli
```

## Usage
```
$ formatree --help

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

```

## Related

- [formatree](https://github.com/A1rPun/formatree) - API for this module

## License

MIT © [A1rPun](https://github.com/A1rPun)
