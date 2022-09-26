module.exports = api => {
  const isProd = api.cache(() => process.env.NODE_ENV === 'production');
  let config = {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@app': './src',
          },
        },
      ],
    ],
  };
  if (isProd) {
    config = {
      ...config,
      plugins: [...config.plugins, ['transform-remove-console']],
    };
  }
  return config;
};
