module.exports = function (api) {
  api.cache(true)
  return {
    presets: [["babel-preset-expo", { jsxImportSource: "nativewind" }], "nativewind/babel"],
    plugins: [
      // Add any other plugins you're using
      "react-native-reanimated/plugin", // if you're using reanimated
    ],
  }
}
