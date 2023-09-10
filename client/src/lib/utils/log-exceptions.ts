type AsyncFunction = (...args: any[]) => Promise<any>;
type NormalFunction = (...args: any[]) => any;

const logExceptions = async (
  fn: AsyncFunction | NormalFunction,
  onError?: AsyncFunction | NormalFunction
) => {
  try {
    await fn();
  } catch (err) {
    console.error(`${fn.name} caught an error.`);
    console.error(err);
    onError && onError(err);
  }
};

export default logExceptions;
