type PatternsType = {
  [property in string]: RegExp;
};

const patterns: PatternsType = {
  email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
};

export default patterns;
