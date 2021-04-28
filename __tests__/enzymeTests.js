import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('should return true', () => {
  it('should return true', () => {
    expect('true').toEqual('true');
  });
});
