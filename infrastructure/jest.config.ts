/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
        '@functions/(.*)': '<rootDir>/functions/$1',
        '@testHelpers/(.*)': '<rootDir>/functions/tests/helpers/$1'
    },
    setupFiles: ['dotenv/config']
}
