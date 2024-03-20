// @ts-check
import antfu from "@antfu/eslint-config"

export default antfu(
	{
		formatters: true,
		stylistic: {
			indent: "tab",
			quotes: "double",
			overrides: {
				curly: ["error", "multi-line"],
			},
		},
	},
)
