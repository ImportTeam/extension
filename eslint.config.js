// 필요한 모듈들을 import 합니다.
import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginReactRefresh from "eslint-plugin-react-refresh";

export default tseslint.config(
  // ----------------------------------------------------
  // 1. 기본 설정 및 환경 설정
  // ----------------------------------------------------
  {
    // ignorePatterns 대신 Flat Config의 'ignores' 사용
    ignores: [
      "dist",
      ".eslintrc.cjs" // 기존 설정 파일 무시
    ],
    
    // 환경 (env) 및 파서 설정
    languageOptions: {
      // browser: true 및 es2020: true를 globals 및 parserOptions로 설정
      globals: {
        ...globals.browser,
      },
      parser: tseslint.parser, // TypeScript 파서 사용
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        // TypeScript 프로젝트를 위한 tsconfig 경로 지정 (필수 권장)
        // project: ['./tsconfig.json'], 
      },
    }
  },
  
  // ----------------------------------------------------
  // 2. extends 정책 반영
  // ----------------------------------------------------
  
  // "eslint:recommended"
  pluginJs.configs.recommended,
  
  // "plugin:@typescript-eslint/recommended"
  ...tseslint.configs.recommended, 
  
  // "plugin:react-hooks/recommended"
  {
    plugins: {
      'react-hooks': pluginReactHooks,
    },
    // 추천 규칙을 배열 요소의 rules로 직접 적용
    rules: pluginReactHooks.configs.recommended.rules, 
  },
  
  // ----------------------------------------------------
  // 3. 사용자 지정 규칙 (엄격한 정책) 반영
  // ----------------------------------------------------
  {
    // react-refresh 플러그인 등록
    plugins: {
        'react-refresh': pluginReactRefresh,
    },
    rules: {
      // TypeScript ESLint 규칙
      "@typescript-eslint/no-unused-vars": [
        "error",
        { "argsIgnorePattern": "^_" }
      ],
      "@typescript-eslint/no-explicit-any": "error",
      // (기존: warn)
      "@typescript-eslint/explicit-function-return-type": "warn",
      "@typescript-eslint/no-non-null-assertion": "error",
      "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
      
      // 기본 ESLint/JS 규칙
      "eqeqeq": ["error", "always"],
      "prefer-const": "error",
      "no-var": "error",
      
      // React-refresh 플러그인 규칙
      "react-refresh/only-export-components": [
        "warn",
        { "allowConstantExport": true }
      ],
    }
  }
);