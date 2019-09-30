/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import Song from './Song';
import { SongContainer } from './styles';

describe('<Song />', () => {
  it('simulates DOM events', () => {
    const onButtonClick = sinon.spy();
    const songObject = {};
    const song = shallow(<Song song={songObject} onClick={onButtonClick} />);

    song.find(SongContainer).simulate('doubleClick');

    expect(onButtonClick.callCount).toEqual(1);
  });
});
