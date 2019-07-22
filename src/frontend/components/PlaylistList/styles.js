import styled from 'styled-components';

export const PlaylistWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const SongRow = styled.div`
  display: flex;
`;

// https://github.com/bvaughn/react-virtualized/blob/master/docs/usingAutoSizer.md#can-i-use-autosizer-within-a-flex-container
export const AutoSizerWrapper = styled.div`
  flex: 1 1 auto;
`;
