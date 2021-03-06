const plugin = require("tailwindcss/plugin")

module.exports = {
    content: ["./src/**/*.{html,jsx,tsx,ts,js}"],
    theme: {
        extend: {}
    },
    plugins: [
        plugin(({ addVariant }) => {
            addVariant("forest", ".forest &")
            addVariant("shiverchill", ".shiverchill &")
            addVariant("bonfire-spire", ".bonfire-spire &")
        })
    ]
}
