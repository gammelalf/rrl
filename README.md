# rrl
Random React Library

## Setup
- Clone the repo and move or link the content of `src` to the appropriate position in your code
- Edit `react.js` and `react-dom.js` to import React from the location of your choice (the default is not for production!)
- Import the components / files you want and happy coding <3
---
- If the uncommitted changes to the files annoy you, have a look at `ignore-react.sh`.

## Controlled Components
This library contains various simple wrappers around html tags turning them into [controlled components](https://reactjs.org/docs/forms.html#controlled-components):

| HTML      | RRL                      | File         |
|-----------|--------------------------|--------------|
| `<input>` | `TextInput`, `LazyInput` | src/input.js |

They all require (and are controlled by) the two properties `value` and `setValue`.
