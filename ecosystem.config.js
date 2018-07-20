module.exports = {
    apps: [
        {
            name: "momsKitchen",
            script: "dist/server.js",
            watch: false,
            env: {
                "NODE_ENV": "development",
            },
            env_production: {
                "NODE_ENV": "production"
            },
            instances: 2,
            exec_mode: "cluster",
        },
    ]
}