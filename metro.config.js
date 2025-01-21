const { getDefaultConfig } = require("expo/metro-config")
const { withNativeWind } = require("nativewind/metro")

const config = async () => {
  const defaultConfig = await getDefaultConfig(__dirname)

  defaultConfig.transformer = {
    ...defaultConfig.transformer,
    babelTransformerPath: require.resolve("react-native-svg-transformer"),
  }

  defaultConfig.resolver = {
    ...defaultConfig.resolver,
    assetExts: defaultConfig.resolver.assetExts.filter(ext => ext !== "svg"),
    sourceExts: [...defaultConfig.resolver.sourceExts, "svg"],
  }

  return withNativeWind(defaultConfig, { input: "./global.css" })
}

module.exports = config()
