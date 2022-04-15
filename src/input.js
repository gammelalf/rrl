import React, {e} from "./react.js";

/**
 * @callback setter
 * @param value - value to set
 */

/**
 * A single controlled <input> element
 * https://reactjs.org/docs/forms.html#controlled-components
 *
 * The properties value and setValue are required for any reasonable usage.
 * See the other (optional) props for additional features.
 *
 * @param value {string} - current value to show (should reflect setValue's argument)
 * @param setValue {setter} - callback with new value entered by user
 * @param autoFocus {Boolean} - boolean whether the element should request focus after mounting
 * @param maxLength {Number} - maximum length the string given to setValue can have
 * @param otherProps {Object} - remaining props are forwarded to <input>
 */
export function TextInput({value, setValue, autoFocus, maxLength, ...otherProps}) {
    const callback = React.useCallback((element) => {
        if (element && autoFocus) {
            setTimeout(function () {element.focus();}, 10);
        }
    }, []);

    return e("input", {
        value,
        onChange(event) {
            let newValue = event.target.value;
            if (newValue.length > maxLength) newValue = newValue.substr(0, maxLength);
            setValue(newValue);
        },
        ref: callback,
        ...otherProps,
    });
}
TextInput.defaultProps = {
    value: "",
    setValue(value) {},
    autoFocus: false,
    maxLength: Infinity,
};

/**
 *  A lazy TextInput behaves like a TextInput with two changes:
 *  - setValue is only called when the user leaves the input
 *  - the input's value is only set to props.value when it changes
 *
 *  The resulting behaviour is a TextInput who can perform conversions in setValue
 *  while still allowing the user to type uninterrupted.
 *
 *  Example of solved problem:
 *  ```
 *  const [n, setN] = React.useState(0);
 *  return e(TextInput, {value: n, setValue(value) {setN(parseFloat(value))}});
 *  ```
 *  This code would render an input whose value is always stored as internally as number instead of string.
 *  But now parseFloat is called after every character. So when trying to type something like `1e3`, the e couldn't be
 *  typed because the intermediate string `1e` would convert to `1`.
 *
 *  LazyInput solves this by only calling setValue, when the user is expected to have finished typing.
 *
 *  @param props - see {@link TextInput}
 */
export function LazyInput(props) {
    const {value, setValue, ...otherProps} = props;
    const [v, setV] = React.useState(value);
    React.useEffect(() => {
        setV(value);
    }, [value]);
    return e(TextInput, {
        value: v,
        setValue: setV,
        onBlur() {
            setV(value);
            setValue(v);
        },
        ...otherProps,
    });
}
