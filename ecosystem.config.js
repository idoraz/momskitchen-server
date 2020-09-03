module.exports = {
    apps: [
        {
            name: 'momsKitchen',
            script: 'dist/server.js',
            watch: false,
            env: {
                NODE_ENV: 'development',
                MONGODB_URI:
                    'mongodb://admin2:Ido250484@momskitchen-shard-00-00.vlaea.mongodb.net:27017,momskitchen-shard-00-01.vlaea.mongodb.net:27017,momskitchen-shard-00-02.vlaea.mongodb.net:27017/momskitchen?ssl=true&replicaSet=atlas-11wwuc-shard-0&authSource=admin&retryWrites=true&w=majority',
                SESSION_SECRET: 'ashdfjhasdlkjfhalksdjhflak'
            },
            env_production: {
                NODE_ENV: 'production',
                MONGODB_URI:
                    'mongodb://admin2:Ido250484@momskitchen-shard-00-00.vlaea.mongodb.net:27017,momskitchen-shard-00-01.vlaea.mongodb.net:27017,momskitchen-shard-00-02.vlaea.mongodb.net:27017/momskitchen?ssl=true&replicaSet=atlas-11wwuc-shard-0&authSource=admin&retryWrites=true&w=majority',
                SESSION_SECRET: 'ashdfjhasdlkjfhalksdjhflak'
            },
            instances: 2,
            exec_mode: 'cluster'
        }
    ]
};
