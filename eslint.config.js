// @ts-check
import antfu from "@antfu/eslint-config"

export default antfu(
  {
    formatters: true,
    stylistic: {
      quotes: "double",
      overrides: {
        curly: ["error", "all"],
      },
    },
    vue: {
      overrides: {
        "vue/script-indent": ["error", 2, { baseIndent: 1 }],
        "style/indent": "off",
      },
    },
  },
)
