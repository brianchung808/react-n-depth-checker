import React from "react";
import { keys, isEqual, isEqualWith, isObject, every, zip } from "lodash";

export const compare = depth => (curr, next) =>
	isEqualWith(curr, next, (c, n) => {
		if (typeof c !== typeof n || !isEqual(keys(curr), keys(next))) {
			return false;
		}

		// object already has same length + same keys
		if (depth >= 0 && isObject(c)) {
			return every(c, (cc, i) => compare(depth - 1)(cc, n[i]));
		}

		return c === n;
	});

const createChecker = (depth = 0) =>
	class NDepthChecker extends React.Component {
		shouldComponentUpdate(nextProps, nextState) {
			const f = compare(depth);
			return f(this.props, nextProps) && f(this.state, nextState);
		}
	};

export default createChecker;
export const OneDepthCheckedComponent = createChecker(1);
export const TwoDepthCheckedComponent = createChecker(2);
export const ThreeDepthCheckedComponent = createChecker(3);
