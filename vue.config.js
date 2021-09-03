module.exports = {
    devServer: {
        proxy: {
            "/api": {
                target: "http://49.235.109.180:4000",
                // changeOrigin: true,
            },
        },
    },
};
