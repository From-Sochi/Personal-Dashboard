module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['@testing-library/jest-dom'],
    transform: {
        '^.+\\.(ts|tsx)$': 'babel-jest',
    },
    testMatch: [
        '**/*.tests.tsx' // ищет все .test.tsx файлы в любых папках
    ],
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    }
};