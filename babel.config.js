module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'babel-plugin-root-import',
      {
        paths: [
          {
            rootPathSuffix: './src/data',
            rootPathPrefix: 'data',
          },
          {
            rootPathSuffix: './src/domain',
            rootPathPrefix: 'domain',
          },
          {
            rootPathSuffix: './src/infra',
            rootPathPrefix: 'infra',
          },
          {
            rootPathSuffix: './src/presentation',
            rootPathPrefix: 'presentation',
          },
          {
            rootPathSuffix: './src/utils',
            rootPathPrefix: 'utils',
          },
          {
            rootPathSuffix: './src',
            rootPathPrefix: '~/',
          },
        ],
      },
    ],
    'module:react-native-dotenv',
  ],
};
