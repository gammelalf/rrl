/**
 * Import React from a single point and reexport it to the whole project.
 * Using this setup changing the React version or location is as simple as changing a single url.
 *
 * This also aliases React.createElement for convenience, as I would do this at the top of every file anyway.
 */
import React from "https://cdn.skypack.dev/react";
export default React;
export const e = React.createElement;