import React from 'react';
import test from "ava";
import createChecker from ".";

test("should return an instance of React.Component", t => {
	const ShallowChecker = createChecker();

	t.true(ShallowChecker.prototype instanceof React.Component);
});
