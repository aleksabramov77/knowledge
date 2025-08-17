import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Подключаем базовые конфиги Next
  ...compat.extends('next/core-web-vitals', 'next/typescript'),

  // Подключаем плагин prettier
  {
    plugins: {
      prettier: require('eslint-plugin-prettier'),
    },
    rules: {
      'prettier/prettier': 'error',
    },
  },

  // Подключаем eslint-config-prettier (отключает правила ESLint, конфликтующие с Prettier)
  ...compat.extends('prettier'),
];

export default eslintConfig;
