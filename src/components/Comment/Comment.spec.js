/* eslint-env jest */
import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';

import Comment from './Comment';
import { CommentContainer, CommentArea } from './styles';
import ReactMarkdown from 'react-markdown';
// import ReadOnlyContext from '../../ReadOnlyContext';

describe('<Comment />', () => {
  it('defaults to showing markdown box', () => {
    const comment = mount(<Comment />);

    expect(comment.find(ReactMarkdown).length).toEqual(1);
  });

  it('shows the editable box when clicked', () => {
    const comment = mount(<Comment />);

    comment.find(CommentContainer).simulate('click');

    expect(comment.find(CommentArea).length).toEqual(1);
  });

  it('shows the markdown box when the comment area is blurred', () => {
    const comment = mount(<Comment />);

    comment.find(CommentContainer).simulate('click');
    expect(comment.find(CommentArea).length).toEqual(1);

    comment.find(CommentArea).simulate('blur');
    expect(comment.find(ReactMarkdown).length).toEqual(1);
  });

  it('fires onChange when the comment is changed', () => {
    const onChange = sinon.spy();

    const comment = mount(<Comment onChange={onChange} />);

    comment.find(CommentContainer).simulate('click');
    expect(comment.find(CommentArea).length).toEqual(1);

    comment.find(CommentArea).simulate('change');
    expect(onChange.callCount).toEqual(1);
  });

  // enzyme currently only works with the legacy context API
  // https://github.com/airbnb/enzyme/issues/2176
  xit('is connected to the readOnly context', () => {
    // const comment = mount(<Comment/>, {});
  });

  // enzyme currently only works with the legacy context API
  // https://github.com/airbnb/enzyme/issues/2176
  xit('it cannot call onChange when readOnly', () => {
    // const comment = mount(<Comment/>);
  });
});
