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

```

## Related

- [formatree](https://github.com/A1rPun/formatree) - API for this module

## License

MIT © [A1rPun](https://github.com/A1rPun)
