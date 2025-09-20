module.exports = {
    presets: [
        ['@babel/preset-env', { targets: { node: 'current' } }],
        'next/babel', // For Next.js projects
    ],
    "plugins": [
        [
            "@babel/plugin-transform-react-jsx",
            {
                "runtime": "automatic"
            }
        ]
    ]
};