import React from "react";
import { shallow } from "enzyme";
import assert from "assert";
import { MatchList } from "../../src/components/common/MatchList";

// unit tests for the MatchList component
describe('MatchList component', () => {
  describe('render()', () => {
    it('should render the progressbar', () => {
      const props = {users: []};
      const wrapper = shallow(<MatchList {...props} />);
      assert.equal(wrapper.length, 1);
    });
  });
});
