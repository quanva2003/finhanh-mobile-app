import { Text as RNText, TextProps } from "react-native"

export function Text({ className = "", style, ...props }: TextProps & { className?: string }) {
  return <RNText className={`font-500 ${className}`} style={[{ paddingRight: 0.1 }, style]} {...props} />
}
