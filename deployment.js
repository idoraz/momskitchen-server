module.exports = {
    /**
     * Application configuration section
     * http://pm2.keymetrics.io/docs/usage/application-declaration/
     */
    apps: [
  
      // First application
      {
        name: 'momskitchen',
        script: 'dist/server.js',
        instances: "2",
        exec_mode: "cluster",
        watch: false,
        "ignore_watch": ["node_modules", "log"],
        env: {
          "PORT": 3010,
          "NODE_ENV": "production",
          mongodb_cn: "mongodb://localhost:27017",
          host: 'localhost',
        }
      }
    ],
  
    /**
     * Deployment section
     * http://pm2.keymetrics.io/docs/usage/deployment/
     */
    deploy: {
      production: {
        user: 'ido',
        host: 'localhost',
        ref: 'origin/master',
        'post-deploy': 'npm install && npm run tsc && pm2 reload deployment.js --env production'
      },
      dev: {
        user: 'node',
        host: 'localhost',
        ref: 'origin/master',
        'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env dev',
        env: {
          NODE_ENV: 'dev'
        }
      }
    }
  };