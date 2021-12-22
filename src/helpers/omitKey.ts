// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const omitKey = <ObjectReturnType>(
  key: string,
  data: { [key: string]: ObjectReturnType }
): { [key: string]: ObjectReturnType } => {
  if (Object.keys(data).length === 0) {
    return {};
  }
  return Object.keys(data).reduce(
    (acc: { [key: string]: unknown }, currentKey: string) => {
      if (currentKey != key) {
        return {
          ...acc,
          [currentKey]: data[currentKey],
        };
      } else {
        return acc;
      }
    },
    {}
  ) as { [key: string]: ObjectReturnType };
};
