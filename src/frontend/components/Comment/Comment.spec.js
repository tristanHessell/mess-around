/* eslint-env jest */
import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import ReactMarkdown from 'react-markdown';
import { ThemeProvider } from 'styled-components';

import Comment from './Comment';
import { CommentContainer, CommentArea } from './styles';
import { lightTheme } from '../../useTheme';

/**
 * Having to attach theming to each of the mount tests is annoying, but I'd rather have to do that in tests rather
 * allow the Comment component to exist without a theme. Given that these tests are "action" tests (rather than snapshot),
 * the use of the themeProvider HOC is not a problem.
 */

function mountWithTheme(tree, theme) {
  return mount(<ThemeProvider theme={theme}>{tree}</ThemeProvider>);
}

describe('<Comment />', () => {
  it('defaults to showing markdown box', () => {
    const comment = mountWithTheme(<Comment />, lightTheme);

    expect(comment.find(ReactMarkdown).length).toEqual(1);
  });

  it('shows the editable box when clicked', () => {
    const comment = mountWithTheme(<Comment />, lightTheme);

    comment.find(CommentContainer).simulate('click');

    expect(comment.find(CommentArea).length).toEqual(1);
  });

  it('shows the markdown box when the comment area is blurred', () => {
    const comment = mountWithTheme(<Comment />, lightTheme);

    comment.find(CommentContainer).simulate('click');
    expect(comment.find(CommentArea).length).toEqual(1);

    comment.find(CommentArea).simulate('blur');
    expect(comment.find(ReactMarkdown).length).toEqual(1);
  });

  it('fires onChange when the comment is changed', () => {
    const onChange = sinon.spy();

    const comment = mountWithTheme(<Comment onChange={onChange} />, lightTheme);

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
