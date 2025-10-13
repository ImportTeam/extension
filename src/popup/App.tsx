import { useEffect } from 'react';
import { popupLogger as logger } from '@/shared/logger';

function App() {
  useEffect(() => {
    logger.info('Popup opened');
  }, []);

  return (
    <div style={{ width: '300px', padding: '20px' }}>
      <h1>PicSel</h1>
      <p>최적 결제 수단 추천 확장 프로그램</p>
      <div>
        <h3>설정</h3>
        <label>
          <input type="checkbox" defaultChecked />
          자동 추천 활성화
        </label>
        <br />
        <label>
          선호 통화:
          <select defaultValue="KRW">
            <option value="KRW">원화 (KRW)</option>
            <option value="USD">달러 (USD)</option>
          </select>
        </label>
      </div>
      <div style={{ marginTop: '20px' }}>
        <h3>상태</h3>
        <p>✅ 확장 프로그램 활성화됨</p>
        <p>📊 큐 상태: 대기 중</p>
      </div>
    </div>
  );
}

export default App;
