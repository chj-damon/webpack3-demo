module.exports = () => {
    const iconUrl = process.env.NODE_ENV.trim() !== 'prod' ? "'/src/assets/iconfont/iconfont'" : "'/assets/iconfont/iconfont'";
    return {
        '@icon-url': iconUrl,
        '@primary-color': '#1976d2',
        '@font-size-base': '14px'
    };
};
