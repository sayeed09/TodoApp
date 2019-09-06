const config = {
    production: {
        SECRET: process.env.SECRET,
        DATABASE: process.env.MONGODBURI
    },
    default: {
        SECRET: "HGD&^WGHEASQ",
        DATABASE: "mongodb://localhost:27017/todos" //"mongodb+srv://sayeed09:s786ayeed@cluster0-h8bc1.mongodb.net/todoData?retryWrites=true&w=majority"
    }
}
exports.get = function get(env) {
    return config[env] || config.default
}