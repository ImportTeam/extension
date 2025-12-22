# 🐛 Backend Bug Report: price_trend AttributeError

**Status**: 🔴 Critical Bug Found (Search Engine Working, But Result Handling Broken)  
**Date**: 2025-12-22  
**Affected Component**: `src/api/routes/price_routes.py` (Line 163)  
**Error**: `AttributeError: 'SearchResult' object has no attribute 'price_trend'`

---

## 📊 Current Situation

### ✅ What's Working
- **Search Engine**: Successfully finding products (예: 가격 169만원 상품 발견)
- **FastPath Logic**: Correctly retrieving `pcode=77378312` with `price=1691140`
- **API Routing**: Request reaching the backend correctly

### ❌ What's Broken
- **Result Object Handling**: When `SearchResult` object is used in `price_routes.py`, it crashes
- **Specific Error Location**: Line 163 in `price_routes.py`
- **Error Log**: `AttributeError: 'SearchResult' object has no attribute 'price_trend'`

---

## 🔍 Root Cause Analysis

The issue occurs when code tries to access `result.price_trend` attribute, but:

1. **Scenario A - Model Definition Issue**  
   `SearchResult` class in `schemas.py` or similar doesn't have `price_trend` field defined

2. **Scenario B - Initialization Issue**  
   FastPath returns `SearchResult` object without initializing `price_trend` attribute
   (FastPath typically only fetches current lowest price, no historical trend data)

---

## ✨ Solution (2 Steps)

### Step 1: Safely Access Missing Attributes (REQUIRED)

**File**: `src/api/routes/price_routes.py` (Around Line 163)

**Before** (❌ Crashes when attribute missing):
```python
if result.price_trend:
    # Process price trend...
    pass
```

**After** (✅ Safe attribute access):
```python
# Use getattr to safely access attribute, return None if missing
price_trend = getattr(result, 'price_trend', None)

if price_trend:
    # Process price trend data
    data_response['price_trend'] = price_trend
else:
    # Handle case when price_trend is None or missing (FastPath scenario)
    data_response['price_trend'] = None
```

**Alternative Approach** (if using Pydantic):
```python
# If SearchResult is a Pydantic model
price_trend_value = result.price_trend if hasattr(result, 'price_trend') else None
```

---

### Step 2: Update SearchResult Model (RECOMMENDED)

**File**: `src/schemas/price.py` or wherever `SearchResult` is defined

**Required Changes**:
```python
from typing import List, Optional
from pydantic import BaseModel

class SearchResult(BaseModel):
    """
    Price comparison search result
    
    Note: price_trend may be None for FastPath searches
    (FastPath only fetches current lowest price without historical data)
    """
    product_name: str
    price: int  # Current lowest price
    pcode: str  # Product code
    mall: str   # Seller/mall name
    link: str   # Product link
    
    # ADD THIS FIELD - May be None for FastPath results
    price_trend: Optional[List[dict]] = None
    
    # Optional metadata
    free_shipping: Optional[bool] = None
    delivery_info: Optional[str] = None
    selected_options: Optional[List[dict]] = None
```

---

## 🎯 Recommended Implementation Order

1. **Immediate** (Today): Apply **Step 1** - Use `getattr()` for safe attribute access
   - This is a 1-line fix that unblocks the issue
   - Works regardless of model definition

2. **Short-term** (This week): Apply **Step 2** - Update `SearchResult` model
   - Prevents similar issues in future
   - Makes code more maintainable
   - Improves IDE autocomplete support

---

## 📋 Test Cases to Verify Fix

After applying both steps, test these scenarios:

### Test Case 1: FastPath Search (No Trend Data)
```python
# Request: Search for MacBook Air M4
# Expected: Should return data without crashing
# price_trend: null or []
```

### Test Case 2: Deep Search (With Trend Data)
```python
# Request: Search for popular product with historical data
# Expected: Should return complete data including price_trend
# price_trend: [...historical data...]
```

### Test Case 3: Edge Cases
```python
# Request: Search for product not in database
# Expected: Should handle gracefully
# Should NOT crash on missing attributes
```

---

## 📊 Data Flow Diagram

```
Frontend (Chrome Extension)
    ↓
    POST /api/v1/price/search
    ↓
FastPath Logic
    ├─ Find product by name
    ├─ Get current price ✅
    ├─ Return SearchResult
    │  └─ price_trend: NOT INCLUDED (is None)
    ↓
price_routes.py Line 163
    ├─ Current: result.price_trend ❌ CRASHES
    ├─ Fixed: getattr(result, 'price_trend', None) ✅ WORKS
    ↓
Response to Frontend
    └─ {
       "status": "success",
       "data": {
           "price": 1691140,
           "price_trend": null,  // ← Safely handled
           ...
       }
    }
```

---

## 📝 Code Example: Complete Fix

**Recommended implementation in `price_routes.py`**:

```python
@router.post("/api/v1/price/search")
async def search_prices(request: PriceSearchRequest) -> dict:
    """
    Search for product prices across multiple sellers
    
    Handles both FastPath (quick, no trend) and Deep search (slow, with trend)
    """
    try:
        # Call search logic
        result = await price_service.search(
            product_name=request.product_name,
            current_price=request.current_price,
            current_url=request.current_url,
            selected_options=request.selected_options
        )
        
        # FIXED: Safely access price_trend attribute
        price_trend = getattr(result, 'price_trend', None)
        
        # Build response
        response_data = {
            "is_cheaper": result.price < request.current_price if request.current_price else None,
            "price_diff": (request.current_price - result.price) if request.current_price else None,
            "lowest_price": result.price,
            "mall": result.mall,
            "link": result.link,
            "free_shipping": getattr(result, 'free_shipping', None),
            "top_prices": getattr(result, 'top_prices', []),
            "price_trend": price_trend,  # ← Now safely handled
            "selected_options": getattr(result, 'selected_options', None),
        }
        
        return {
            "status": "success",
            "data": response_data,
            "message": "Search completed successfully"
        }
        
    except Exception as e:
        logger.error(f"Search error: {str(e)}")
        return {
            "status": "error",
            "data": None,
            "message": str(e)
        }
```

---

## 🔗 Related Documents

- [API Specification](./API_SPEC_PRICE_COMPARISON.md) - Frontend API contract
- [Search Engine Architecture](./ARCHITECTURE/PRODUCTION_PARSER_ARCHITECTURE.md) - System design

---

## ✅ Checklist for Backend Team

- [ ] Understand the issue: `price_trend` attribute missing when FastPath returns results
- [ ] Apply Step 1: Use `getattr()` for safe attribute access
- [ ] Apply Step 2: Update `SearchResult` model definition
- [ ] Test Case 1: Verify FastPath search works without crash
- [ ] Test Case 2: Verify Deep search with trend data works
- [ ] Test Case 3: Verify edge cases are handled
- [ ] Update API response documentation
- [ ] Commit changes to repository

---

**Questions?** Please check the error logs and confirm if both scenarios (FastPath vs Deep search) are handled correctly.

