import React from "react";
import { shallow } from "enzyme";
import assert from "assert";
import MatchListElement from "../../src/components/common/MatchListElement";

// unit tests for the MatchListElement component
describe('MatchListElement component', () => {
  describe('render()', () => {
    it('should render the component', () => {
      const props = {user: {}, showDelete: ()=>{}};
      const wrapper = shallow(<MatchListElement {...props} />);
      assert.equal(wrapper.length, 1);
    });
  });
});
