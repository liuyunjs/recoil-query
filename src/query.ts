import {
  ReadOnlySelectorFamilyOptions,
  ReadWriteSelectorFamilyOptions,
  selectorFamily,
  SerializableParam,
  RecoilState,
  atomFamily,
} from 'recoil';
import { factory } from './utils';

export class RefreshQuery {}

export const needRefresh = (value: any): value is RefreshQuery =>
  value instanceof RefreshQuery;

const queryRequestController = atomFamily({
  key: 'queryRequestController',
  default: [],
});

export const createQueryFamily = <O = {}>(
  family: <T, P extends SerializableParam>(
    options: O & ReadWriteSelectorFamilyOptions<T, P>,
  ) => (param: P) => RecoilState<T>,
) => {
  return <T, P extends SerializableParam>(
    options: O &
      ReadOnlySelectorFamilyOptions<T, P> & {
        set?: ReadWriteSelectorFamilyOptions<T, P>['set'];
      },
  ) => {
    const mySet: ReadWriteSelectorFamilyOptions<T, P>['set'] =
      (param) => (opts, newValue) => {
        if (needRefresh(newValue)) {
          return opts.set(
            queryRequestController(selectorFactory(param).key),
            [],
          );
        }
        if ('set' in options) {
          options.set(param)(opts, newValue);
        }
      };

    const myGet: ReadOnlySelectorFamilyOptions<T, P>['get'] =
      (param) => (opts) => {
        opts.get(queryRequestController(selectorFactory(param).key));
        return options.get(param)(opts);
      };

    const selectorFactory = family<T, P>(
      Object.assign({}, options, {
        get: myGet,
        set: mySet,
      }),
    );
    return selectorFactory;
  };
};

export const queryFamily = createQueryFamily(selectorFamily);

export const query = factory<{}>(queryFamily);
