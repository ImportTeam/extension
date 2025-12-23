/**
 * Login Page
 * 확장 프로그램 로그인 UI (popup에서 표시)
 */

import React, { useState } from 'react';
import { useAuthStore } from '@/shared/store/slices/auth';
import { AuthService } from '@/shared/utils/authService';

const API_BASE = (() => {
  if (typeof process !== 'undefined' && process.env?.REACT_APP_SERVER_URL) {
    return process.env.REACT_APP_SERVER_URL;
  }
  return 'https://picsel.kr';
})();

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { setToken, setUser, setAuthenticated } = useAuthStore();

  const handleLogin = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await AuthService.login(email, password);
      
      // Zustand 스토어 업데이트
      setToken({
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
        expiresAt: Date.now() + response.expiresIn * 1000,
      });
      setUser(response.user);
      setAuthenticated(true);

      // 로그인 성공 후 popup 닫기
      window.close();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenWebLogin = (): void => {
    // 웹 로그인 페이지로 이동 (새 탭)
    chrome.tabs.create({
      url: `${API_BASE}/login?redirect=extension`,
    });
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>PicSel 로그인</h2>
        
        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.inputGroup}>
            <label htmlFor="email" style={styles.label}>
              이메일
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              disabled={isLoading}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="password" style={styles.label}>
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              disabled={isLoading}
              required
              style={styles.input}
            />
          </div>

          {error && (
            <div style={styles.error}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            style={{
              ...styles.button,
              opacity: isLoading ? 0.6 : 1,
            }}
          >
            {isLoading ? '로그인 중...' : '로그인'}
          </button>
        </form>

        <div style={styles.divider} />

        <button
          onClick={handleOpenWebLogin}
          style={styles.webLoginButton}
        >
          웹 사이트에서 로그인
        </button>

        <p style={styles.helpText}>
          아직 계정이 없으신가요?{' '}
          <a
            href={`${API_BASE}/signup`}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.link}
          >
            회원가입
          </a>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    padding: '20px',
  } as React.CSSProperties,
  
  card: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    padding: '24px',
    width: '100%',
    maxWidth: '320px',
  } as React.CSSProperties,
  
  title: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '20px',
    textAlign: 'center' as const,
    color: '#333',
  } as React.CSSProperties,
  
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  } as React.CSSProperties,
  
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  } as React.CSSProperties,
  
  label: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#555',
  } as React.CSSProperties,
  
  input: {
    padding: '10px 12px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '14px',
    fontFamily: 'inherit',
    transition: 'border-color 0.2s',
  } as React.CSSProperties,
  
  button: {
    padding: '10px 16px',
    borderRadius: '4px',
    backgroundColor: '#346AFF',
    color: '#fff',
    border: 'none',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  } as React.CSSProperties,
  
  error: {
    padding: '10px 12px',
    borderRadius: '4px',
    backgroundColor: '#fee',
    color: '#c33',
    fontSize: '12px',
  } as React.CSSProperties,
  
  divider: {
    height: '1px',
    backgroundColor: '#eee',
    margin: '16px 0',
  } as React.CSSProperties,
  
  webLoginButton: {
    padding: '10px 16px',
    borderRadius: '4px',
    backgroundColor: '#f5f5f5',
    color: '#333',
    border: '1px solid #ddd',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  } as React.CSSProperties,
  
  helpText: {
    fontSize: '12px',
    color: '#666',
    textAlign: 'center' as const,
    marginTop: '12px',
  } as React.CSSProperties,
  
  link: {
    color: '#346AFF',
    textDecoration: 'none',
    fontWeight: '600',
  } as React.CSSProperties,
};
