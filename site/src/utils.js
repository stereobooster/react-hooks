import Cache from "tmp-cache";

const memoize = fn => {
  const cache = {};
  return arg => {
    if (!(arg in cache)) cache[arg] = fn(arg);
    return cache[arg];
  };
};

const memoizeSearch = fn => {
  const cache = new Cache(30);
  return (arg, arr) => {
    if (!cache.has(arg)) {
      const prev = arg.substring(0, arg.length - 1);
      if (cache.has(prev)) {
        cache.set(arg, fn(arg, cache.get(prev)));
      } else {
        cache.set(arg, fn(arg, arr));
      }
    }
    return cache.get(arg);
  };
};

export const githubName = memoize(link =>
  link.replace("https://github.com/", "")
);

const lower = memoize(str => str.toLowerCase());

const lowerArray = memoize(tags => tags.map(tag => tag.toLowerCase()));

export const findHooks = memoizeSearch((term, arr) => {
  if (term === "") return arr;
  if (term === "#")
    return arr.filter(hook => hook.tags && hook.tags.length > 0);
  if (term[0] === "#") {
    const tagToSearch = lower(term.replace("#", ""));
    return arr.filter(hook =>
      lowerArray(hook.tags).some(tag => tag.includes(tagToSearch))
    );
  }
  return arr.filter(
    hook =>
      lower(hook.name).includes(lower(term)) ||
      lower(githubName(hook.repositoryUrl)).includes(lower(term))
  );
});
