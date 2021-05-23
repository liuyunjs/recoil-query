import {
  ReadWriteSelectorFamilyOptions,
  ReadWriteSelectorOptions,
  RecoilState,
  SerializableParam,
} from 'recoil';

export const factory = <O = {}>(
  family: <T, P extends SerializableParam>(
    options: O & ReadWriteSelectorFamilyOptions<T, P>,
  ) => (param: P) => RecoilState<T>,
) => {
  return function <T>(
    options: O &
      ReadWriteSelectorOptions<T> & {
        set?: ReadWriteSelectorOptions<T>['set'];
      },
  ) {
    // @ts-ignore
    const { get, set } = options;

    const familyOptions = Object.assign({}, options, {
      get: () => get,
    });

    delete familyOptions.set;

    if ('set' in options) {
      familyOptions.set = () => set;
    }

    return family(
      familyOptions as unknown as O &
        ReadWriteSelectorFamilyOptions<T, undefined>,
    )(undefined);
  };
};
