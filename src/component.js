import React from "./react.js";

/**
 * This class extends React's Component and adds features I define a lot in various projects.
 */
export class RRLComponent extends React.Component {
    /**
     * Wrap setState to set a single value in a nested object structure.
     *
     * `this.setPath("a.b.c", 3);` is basically equivalent to `this.state.a.b.c = 3;`, with two key differences:
     * - It uses React's setState, i.e. triggering an update.
     * - It rebuilds the objects `a` and `a.b` such that shallow comparisons notice a change.
     *
     * @param path path to variable of form `["a", "b", "c"]` or `"a.b.c"`
     * @param value arbitrary value to set variable to
     */
    setPath(path, value) {
        if (!Array.isArray(path))
            path = path.split(".");

        const last = path.pop();
        this.setState(function (state) {
            const result = {...state};
            let oldState = state;
            let newState = result;
            for (const key of path) {
                newState[key] = {...oldState[key]};
                oldState = oldState[key];
                newState = newState[key];
            }
            newState[last] = value;
            return result;
        });
    }

    /**
     * Build a setter for a single value from a path.
     * The returned function is already bound to the component.
     *
     * @param path path to variable of form `["a", "b", "c"]` or `"a.b.c"`
     * @returns {*} setter function taking a single value to set as argument.
     */
    setterForPath(path) {
        if (!Array.isArray(path))
            path = path.split(".");

        return this.setPath.bind(this, path);
    }
}
