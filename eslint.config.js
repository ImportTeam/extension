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
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/build/**",
      "**/.git/**",
      "**/.vscode/**",
      "**/coverage/**",
      "**/*.min.js",
      ".eslintrc.cjs",
      "vite.config.ts.timestamp-*"
    ],
    
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
      },
    }
  },
  
  // ----------------------------------------------------
  // 2. extends 정책 반영
  // ----------------------------------------------------
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended, 
  
  {
    plugins: {
      'react-hooks': pluginReactHooks,
    },
    rules: pluginReactHooks.configs.recommended.rules, 
  },
  
  // ----------------------------------------------------
  // 3. 엄격하고 실용적인 규칙
  // ----------------------------------------------------
  {
    plugins: {
      'react-refresh': pluginReactRefresh,
    },
    rules: {
      // ═══════════════════════════════════════════════════
      // TypeScript 규칙 - 타입 안전성 강화
      // ═══════════════════════════════════════════════════
      
      // 사용하지 않는 변수 금지 (언더스코어로 시작하는 인자는 허용)
      "@typescript-eslint/no-unused-vars": [
        "error",
        { 
          "argsIgnorePattern": "^_",
          "varsIgnorePattern": "^_",
          "destructuredArrayIgnorePattern": "^_"
        }
      ],
      
      // any 타입 금지 - 타입 안전성 핵심
      "@typescript-eslint/no-explicit-any": "error",
      
      // 함수 반환 타입 명시 - 코드 가독성/문서화
      "@typescript-eslint/explicit-function-return-type": ["warn", {
        "allowExpressions": true,           // 콜백에서는 허용
        "allowTypedFunctionExpressions": true,
        "allowHigherOrderFunctions": true,
      }],
      
      // non-null assertion (!) 금지 - 런타임 에러 방지
      "@typescript-eslint/no-non-null-assertion": "error",
      
      // interface vs type - 일관성
      "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
      
      // 사용하지 않는 import 제거
      "@typescript-eslint/no-unused-expressions": "error",
      
      // 빈 함수 금지 (의도적인 경우 주석 필요)
      "@typescript-eslint/no-empty-function": ["error", {
        "allow": ["arrowFunctions"] // 빈 화살표 함수는 허용 (noop 패턴)
      }],
      
      // ═══════════════════════════════════════════════════
      // 코드 품질 규칙 - 버그 방지
      // ═══════════════════════════════════════════════════
      
      // === 사용 강제 (타입 강제 변환 버그 방지)
      "eqeqeq": ["error", "always"],
      
      // const 선호 (재할당 없으면 const)
      "prefer-const": "error",
      
      // var 금지
      "no-var": "error",
      
      // console 금지 (Logger 사용 강제) - logger.ts 제외
      "no-console": ["error", { 
        "allow": ["warn", "error"] // warn, error는 개발 중 허용
      }],
      
      // debugger 금지
      "no-debugger": "error",
      
      // 도달할 수 없는 코드 금지
      "no-unreachable": "error",
      
      // 중복 케이스 금지
      "no-duplicate-case": "error",
      
      // 빈 블록 금지
      "no-empty": ["error", { "allowEmptyCatch": true }],
      
      // ═══════════════════════════════════════════════════
      // 코드 스타일 규칙 - 가독성/일관성
      // ═══════════════════════════════════════════════════
      
      // 화살표 함수 본문 스타일
      "arrow-body-style": ["warn", "as-needed"],
      
      // 객체 단축 속성
      "object-shorthand": ["warn", "always"],
      
      // 템플릿 리터럴 선호
      "prefer-template": "warn",
      
      // 스프레드 연산자 선호
      "prefer-spread": "warn",
      
      // rest 파라미터 선호 (arguments 대신)
      "prefer-rest-params": "error",
      
      // throw는 Error 객체만
      "no-throw-literal": "error",
      
      // ═══════════════════════════════════════════════════
      // React 규칙
      // ═══════════════════════════════════════════════════
      
      // React-refresh (HMR 호환성)
      "react-refresh/only-export-components": [
        "warn",
        { "allowConstantExport": true }
      ],
    }
  },
  
  // ----------------------------------------------------
  // 4. 파일별 예외 규칙
  // ----------------------------------------------------
  {
    // Logger 시스템은 console 사용 허용
    files: ["**/logger/**/*.ts"],
    rules: {
      "no-console": "off",
    }
  },
  {
    // 설정 파일들은 일부 규칙 완화
    files: ["*.config.ts", "*.config.js"],
    rules: {
      "@typescript-eslint/explicit-function-return-type": "off",
    }
  }
);