module.exports = function () {
    const env = process.env.NODE_ENV;
    return require(`./webpack.${env}.js`);
};