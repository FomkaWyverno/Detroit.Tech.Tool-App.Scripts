/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: "node",
  verbose: true,
  roots: ['<rootDir>/tests/'],
  testMatch: [
    '**/tests/**/*.[tj]s?(x)', // Тести тільки в папці tests
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
};