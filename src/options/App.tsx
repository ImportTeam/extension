import { useEffect } from 'react';
import { optionsLogger as logger } from '@/shared/logger';

function App() {
  useEffect(() => {
    logger.info('Options page opened');
  }, []);

  return (
    <div style={{ padding: '20px', maxWidth: '600px' }}>
      <h1>PicSel 설정</h1>
      <p>PicSel 확장 프로그램의 설정을 관리합니다.</p>
      
      <div>
        <h3>기본 설정</h3>
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
            <option value="EUR">유로 (EUR)</option>
          </select>
        </label>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h3>알림 설정</h3>
        <label>
          <input type="checkbox" defaultChecked />
          추천 알림 표시
        </label>
        <br />
        <label>
          <input type="checkbox" />
          오류 알림 표시
        </label>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h3>개인정보</h3>
        <p>PicSel 개인정보를 수집하지 않습니다.</p>
        <button>데이터 초기화</button>
      </div>
    </div>
  );
}

export default App;
