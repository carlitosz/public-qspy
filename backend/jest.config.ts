/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
        '@functions/(.*)': '<rootDir>/functions/$1',
        '@helpers/(.*)': '<rootDir>/helpers/$1',
        '@testHelpers/(.*)': '<rootDir>/tests/helpers/$1'
    },
    setupFiles: ['dotenv/config']
}
