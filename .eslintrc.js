module.exports = {
  env: {
    node: true,
  },
  extends: 'airbnb',
  rules: {
    // let reference mongo document _id property
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
  },
};
