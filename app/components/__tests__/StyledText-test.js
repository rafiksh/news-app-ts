import * as React from "react";
import renderer from "react-test-renderer";

import { Text } from "../styled/typography/typography.styled";

it(`renders correctly`, () => {
  const tree = renderer.create(<Text>Snapshot test!</Text>).toJSON();

  expect(tree).toMatchSnapshot();
});
