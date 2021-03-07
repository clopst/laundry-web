const snakeToCamelCase = str => (
    str.toLowerCase().replace( /[-_][a-z0-9]/g, group => group.slice(-1).toUpperCase())
);

const camelToSnakeCase = str => (
  str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
);

export {
  snakeToCamelCase,
  camelToSnakeCase
};
