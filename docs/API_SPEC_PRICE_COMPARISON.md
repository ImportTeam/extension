# 🛒 PicSel Price Comparison API Specification

## Overview

PicSel Chrome Extension에서 BE 가격 비교 서버로 전송하는 API 명세서입니다.
사용자가 선택한 상품 옵션 정보를 포함하여 더 정확한 가격 비교를 제공합니다.

---

## 📨 API Endpoint

**POST** `/api/v1/price/search`

---

## 🔄 Request Format

### Headers
```
Content-Type: application/json
```

### Request Body

```typescript
{
  "product_name": string,              // 필수: 상품명 (검색 쿼리)
  "current_price"?: number,            // 선택: 현재 상품 가격 (원)
  "current_url"?: string,              // 선택: 현재 상품 페이지 URL
  "selected_options"?: Array<{         // 선택: 사용자가 선택한 옵션
    "name": string,                    // 옵션명 (예: "CPU", "색상", "RAM" 등)
    "value": string                    // 옵션값 (예: "M4 Pro 14코어", "실버", "24GB" 등)
  }>,
  "product_code"?: string              // 선택: 상품 코드 (미사용)
}
```

### Request Examples

#### 예제 1: 쿠팡 - MacBook Air M4

```json
{
  "product_name": "맥북에어 M4 13인치",
  "current_price": 1899000,
  "current_url": "https://www.coupang.com/vp/products/12345678",
  "selected_options": [
    { "name": "CPU", "value": "M4 Pro 14코어" },
    { "name": "GPU", "value": "20코어" },
    { "name": "RAM", "value": "24GB" },
    { "name": "저장용량", "value": "512GB" },
    { "name": "키보드", "value": "한글" }
  ]
}
```

#### 예제 2: 11번가 - MacBook Air M4

```json
{
  "product_name": "맥북에어 13 M4 (CPU 10코어/GPU 10코어) RAM 16GB SSD 512GB 실버",
  "current_price": 1750000,
  "current_url": "https://www.11st.co.kr/products/1234567890",
  "selected_options": [
    { "name": "CPU / GPU", "value": "10 / 10" },
    { "name": "색상", "value": "실버" },
    { "name": "RAM", "value": "16GB" },
    { "name": "SSD", "value": "512GB" },
    { "name": "키보드", "value": "한국어" }
  ]
}
```

#### 예제 3: G마켓 - MacBook Air M4

```json
{
  "product_name": "맥북에어 13 M4 (CPU 10코어/GPU 10코어) RAM 16GB SSD 512GB 실버 MW0X3KH/A",
  "current_price": 1890000,
  "current_url": "https://item.gmarket.co.kr/Item?goodscode=12345678",
  "selected_options": [
    { "name": "모델", "value": "맥북에어 13 M4" },
    { "name": "CPU", "value": "10코어" },
    { "name": "GPU", "value": "10코어" },
    { "name": "색상", "value": "실버" },
    { "name": "RAM", "value": "16GB" },
    { "name": "SSD", "value": "512GB" }
  ]
}
```

---

## 📤 Response Format

### Success Response (200 OK)

```typescript
{
  "status": "success",
  "data": {
    "is_cheaper": boolean,              // 현재 가격이 최저가인지 여부
    "price_diff": number,               // 가격 차이 (현재가 - 최저가, 원)
    "lowest_price": number,             // 최저가 (원)
    "mall": string,                     // 최저가 판매처 (예: "쿠팡", "11번가" 등)
    "link": string,                     // 최저가 상품 링크
    "free_shipping": boolean,           // 무료 배송 여부
    "top_prices": Array<{               // 상위 가격 목록 (상위 3~5개)
      "rank": number,                   // 순위 (1, 2, 3...)
      "mall": string,                   // 판매처명
      "price": number,                  // 가격 (원)
      "free_shipping"?: boolean,        // 무료 배송 여부
      "delivery"?: string,              // 배송 방법 (예: "로켓배송", "스타배송" 등)
      "link"?: string                   // 상품 링크
    }>,
    "price_trend"?: Array<{             // 가격 변동 추이 (선택)
      "label": string,                  // 시간/날짜 레이블
      "price": number                   // 해당 시점의 가격
    }>,
    "selected_options"?: Array<{        // 요청한 선택된 옵션 (echo)
      "name": string,
      "value": string
    }>
  },
  "message": "검색 완료"
}
```

### Error Response (4xx, 5xx)

```typescript
{
  "status": "error",
  "data": null,
  "message": string                     // 에러 메시지 (예: "상품을 찾을 수 없습니다")
}
```

---

## 📋 Response Examples

### 예제 1: 성공 - 최저가 판매처

```json
{
  "status": "success",
  "data": {
    "is_cheaper": true,
    "price_diff": -50000,
    "lowest_price": 1750000,
    "mall": "11번가",
    "link": "https://www.11st.co.kr/products/...",
    "free_shipping": true,
    "top_prices": [
      {
        "rank": 1,
        "mall": "11번가",
        "price": 1750000,
        "free_shipping": true,
        "delivery": "일반배송",
        "link": "https://www.11st.co.kr/products/..."
      },
      {
        "rank": 2,
        "mall": "쿠팡",
        "price": 1899000,
        "free_shipping": true,
        "delivery": "로켓배송",
        "link": "https://www.coupang.com/vp/products/..."
      },
      {
        "rank": 3,
        "mall": "G마켓",
        "price": 1890000,
        "free_shipping": true,
        "delivery": "일반배송",
        "link": "https://item.gmarket.co.kr/Item?..."
      }
    ],
    "price_trend": [
      { "label": "3일전", "price": 1850000 },
      { "label": "2일전", "price": 1800000 },
      { "label": "1일전", "price": 1750000 },
      { "label": "오늘", "price": 1750000 }
    ],
    "selected_options": [
      { "name": "CPU", "value": "M4 Pro 14코어" },
      { "name": "GPU", "value": "20코어" },
      { "name": "RAM", "value": "24GB" },
      { "name": "저장용량", "value": "512GB" },
      { "name": "키보드", "value": "한글" }
    ]
  },
  "message": "검색 완료"
}
```

### 예제 2: 오류 - 상품 미발견

```json
{
  "status": "error",
  "data": null,
  "message": "요청 파라미터가 올바르지 않습니다. (400)"
}
```

---

## ⏱️ Timeout & Performance

- **Timeout**: 15초 (클라이언트 측)
- **권장 응답시간**: 2초 이내
- **최대 응답시간**: 5초

---

## 🔄 Integration Flow

```
1. Content Script (파서)
   ├─ 사용자가 선택한 옵션 정보 추출 (selectedOptions)
   ├─ 상품명, 현재가, 현재 URL 수집
   └─ 데이터 포장

2. Background Worker
   ├─ COMPARE_PRICES 메시지 수신
   ├─ API 요청 전송 (POST /api/v1/price/search)
   └─ 응답 처리 및 반환

3. Content Script (UI)
   ├─ 비교 결과 렌더링
   ├─ 최저가 정보 표시
   └─ 선택된 옵션에 맞는 가격 비교 제공
```

---

## 📌 선택된 옵션 필드 가이드

### 쿠팡 (Coupang)

| 필드명 | 예시 |
|--------|------|
| CPU | M4 Pro 14코어, M4 10코어 |
| GPU | 20코어, 10코어 |
| RAM | 24GB, 16GB, 32GB |
| 저장용량 | 512GB, 1TB, 2TB |
| 키보드 | 한글, 영어 |
| 색상 | 실버, 스페이스 블랙 |

### 11번가 (11st)

| 필드명 | 예시 |
|--------|------|
| CPU / GPU | 10 / 10, 14 / 20 |
| 색상 | 실버, 스페이스 블랙 |
| RAM | 16GB, 24GB, 32GB |
| SSD | 512GB, 1TB, 2TB, 4TB |
| 키보드 | 한국어, 영어 |

### G마켓 (Gmarket)

| 필드명 | 예시 |
|--------|------|
| 모델 | 맥북에어 13 M4 |
| CPU | 10코어, 14코어 |
| GPU | 10코어, 20코어 |
| 색상 | 실버, 스페이스 블랙 |
| RAM | 16GB, 24GB, 32GB |
| SSD | 512GB, 1TB, 2TB |

---

## 🔐 Error Handling

### 클라이언트 측 (Chrome Extension)

| 상태 | 처리 방법 |
|------|----------|
| 서버 다운 | "가격 비교 서버가 실행 중이 아닙니다." 표시 |
| 타임아웃 (15초) | "요청 시간 초과 (15초)" 표시 |
| 400 Bad Request | "요청 파라미터가 올바르지 않습니다." 표시 |
| 404 Not Found | "상품을 찾을 수 없습니다." 표시 |
| 500 Server Error | "가격 비교 검색 실패" 표시 |

### 서버 측 (Backend)

- **400**: 필수 파라미터 누락 또는 형식 오류
- **404**: 상품 미발견
- **500**: 내부 서버 오류 (DB, 외부 API 호출 실패 등)

---

## 📝 Version History

| 버전 | 날짜 | 변경 사항 |
|------|------|----------|
| 1.0 | 2024-12-22 | 선택된 옵션 필드 추가 |
| 0.9 | 2024-12-20 | 초기 버전 (옵션 필드 없음) |

---

## 💡 Best Practices

1. **옵션 정보 정규화**: 공백 정리 및 특수문자 제거
2. **캐싱**: 동일한 쿼리 + 옵션으로 반복 요청 시 캐싱 활용
3. **부분 매칭**: 옵션이 없어도 상품명으로 검색 가능하도록 구현
4. **다국어 지원**: 옵션값 다국어 처리 (예: 한글, 영어 혼용)

