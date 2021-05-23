import React from 'react';
import { RecoilState, useSetRecoilState } from 'recoil';
import { RefreshQuery } from './query';

export const useQueryRefresh = <T>(recoilState: RecoilState<T>) => {
  const setState = useSetRecoilState(recoilState);

  return React.useCallback(() => {
    // @ts-ignore
    setState(new RefreshQuery());
  }, []);
};
