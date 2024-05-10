module.exports = {
  root: true,
  extends: ["universe/native"],
  env: { node: true },
  ignorePatterns: ["expo-env.d.ts"],
  rules: {
    "import/order": "off",
  },
};
