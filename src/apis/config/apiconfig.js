var APIConfig = {
    development: 'https://localhost:44395/api/',
    production: 'local:44395/api/'
}

export default APIConfig[process.env.NODE_ENV]