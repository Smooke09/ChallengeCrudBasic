"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    clearMocks: true,
    collectCoverage: true,
    coverageDirectory: "coverage",
    coverageProvider: "v8",
    coverageReporters: ["json"],
    setupFilesAfterEnv: ["./src/jest.setup.ts"],
    testMatch: ["<rootDir>src/**/*.test.ts"],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest",
    },
};
