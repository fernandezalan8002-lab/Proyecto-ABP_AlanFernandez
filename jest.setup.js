// Mock oficial de AsyncStorage para que el store (persist) funcione en los tests.
jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);
