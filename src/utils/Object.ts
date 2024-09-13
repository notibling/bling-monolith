
type Nested<T> = T & {
  children: Nested<T>;
}

class ObjectUtils {
  static nestRecursively<T = {}>(identifier: keyof T, nestBy: keyof T, _data: T[]) {
    const recursiveNest = (data: T[] = []) => {
      const results: Nested<T>[] = [];
      const nestedIds: unknown[] = [];

      for (let i = 0; i < data.length; i++) {
        const _item = data[i];
        const children = data.filter(el => el?.[nestBy] === _item?.[identifier]).map((top) => {
          return {
            ...top,
            children: recursiveNest(data.filter(el => el?.[nestBy] === top?.[identifier]))
          }
        })

        nestedIds.push(...children.map(child => child[identifier]));

        results.push({
          ..._item,
          children
        } as any);
      }
      return results.filter(el => !nestedIds.includes(el[identifier]));
    };

    return recursiveNest(_data);

  }
}

export { ObjectUtils }