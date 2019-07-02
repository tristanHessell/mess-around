import React from 'react';
import { shallow } from 'enzyme';
// import sinon from 'sinon';
import Song from './Song';

describe('<Song />', () => {
  it('renders a song name', () => {
    const song = shallow(<Song name="SONG NAME"/>);
    expect(song.find('.name').text()).toEqual('SONG NAME');
  });

  // it('simulates click events', () => {
  //   const onButtonClick = sinon.spy();
  //   const wrapper = shallow(<Foo onButtonClick={onButtonClick} />);
  //   wrapper.find('button').simulate('click');
  //   expect(onButtonClick).to.have.property('callCount', 1);
  // });
});