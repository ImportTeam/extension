import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Button, ThemeToggle } from '@/shared/components';
import { storage } from '@/shared/storage';
import type { AppSettings } from '@/shared/types';

export const SettingsPage = () => {
  const [settings, setSettings] = useState<AppSettings>({
    theme: 'system',
    language: 'ko',
    notifications: true,
    autoDetect: true,
    savingsAlerts: true,
    dataSync: false,
  });
  
  const [loading, setLoading] = useState(true);

  // Load settings on mount
  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const saved = await storage.getSettings();
      setSettings(saved);
    } catch (error) {
      console.error('Failed to load settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateSetting = async <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    
    try {
      await storage.setSettings({ [key]: value });
    } catch (error) {
      console.error('Failed to save setting:', error);
      // Revert on error
      setSettings(settings);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-full">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">설정</h2>
        <p className="text-muted-foreground">PicSel 확장 프로그램 설정을 관리하세요</p>
      </div>

      {/* Appearance */}
      <Card>
        <CardHeader>
          <CardTitle>모양</CardTitle>
          <CardDescription>테마 및 표시 설정</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">다크 모드</p>
              <p className="text-sm text-muted-foreground">어두운 테마 사용</p>
            </div>
            <ThemeToggle />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">언어</p>
              <p className="text-sm text-muted-foreground">인터페이스 언어 설정</p>
            </div>
            <select
              className="flex h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              value={settings.language}
              onChange={(e) => updateSetting('language', e.target.value as 'ko' | 'en' | 'ja')}
            >
              <option value="ko">한국어</option>
              <option value="en">English</option>
              <option value="ja">日本語</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>알림</CardTitle>
          <CardDescription>알림 및 메시지 설정</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">알림 활성화</p>
              <p className="text-sm text-muted-foreground">브라우저 알림 수신</p>
            </div>
            <button
              onClick={() => updateSetting('notifications', !settings.notifications)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.notifications ? 'bg-primary' : 'bg-input'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-background transition-transform ${
                  settings.notifications ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">절약 알림</p>
              <p className="text-sm text-muted-foreground">절약 금액이 발생하면 알림</p>
            </div>
            <button
              onClick={() => updateSetting('savingsAlerts', !settings.savingsAlerts)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.savingsAlerts ? 'bg-primary' : 'bg-input'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-background transition-transform ${
                  settings.savingsAlerts ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Payment Detection */}
      <Card>
        <CardHeader>
          <CardTitle>결제 감지</CardTitle>
          <CardDescription>결제 페이지 자동 감지 설정</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">자동 감지</p>
              <p className="text-sm text-muted-foreground">결제 페이지 자동으로 인식</p>
            </div>
            <button
              onClick={() => updateSetting('autoDetect', !settings.autoDetect)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.autoDetect ? 'bg-primary' : 'bg-input'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-background transition-transform ${
                  settings.autoDetect ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          <div className="p-4 rounded-lg bg-muted">
            <p className="text-sm text-muted-foreground">
              자동 감지가 활성화되면 쇼핑몰 결제 페이지를 자동으로 인식하여 
              최적의 결제 수단을 추천합니다.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Data & Privacy */}
      <Card>
        <CardHeader>
          <CardTitle>데이터 및 개인정보</CardTitle>
          <CardDescription>데이터 동기화 및 개인정보 설정</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">클라우드 동기화</p>
              <p className="text-sm text-muted-foreground">여러 기기에서 데이터 공유</p>
            </div>
            <button
              onClick={() => updateSetting('dataSync', !settings.dataSync)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.dataSync ? 'bg-primary' : 'bg-input'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-background transition-transform ${
                  settings.dataSync ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              데이터 내보내기
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              데이터 가져오기
            </Button>
            <Button variant="destructive" className="w-full justify-start">
              <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              모든 데이터 삭제
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* About */}
      <Card>
        <CardHeader>
          <CardTitle>정보</CardTitle>
          <CardDescription>확장 프로그램 정보</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">버전</span>
            <span className="text-sm font-medium">1.0.0</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">라이선스</span>
            <span className="text-sm font-medium">MIT</span>
          </div>
          <div className="pt-2 space-y-2">
            <Button variant="outline" className="w-full justify-start">
              <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              도움말 및 지원
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              개인정보 처리방침
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
