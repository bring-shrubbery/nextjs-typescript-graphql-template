module.exports = {
  roots: ['<rootDir>'],
  moduleNameMapper: {
    "@src/(.*)": "<rootDir>/src/$1"
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'jsx'],
  testPathIgnorePatterns: ['<rootDir>[/\\\\](node_modules|.next)[/\\\\]'],
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(ts|tsx)$'],
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest',
    '\\.graphql$': [
      'graphql-let/jestTransformer',
      { subsequentTransformer: 'babel-jest' },
    ],
  },
}
