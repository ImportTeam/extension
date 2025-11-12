import React from 'react';
import ReactDOM from 'react-dom/client';
import '../popup/styles/globals.css';

/**
 * Options Page Placeholder
 * TODO: Implement settings UI in future
 */

const Options: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <h1 className="text-2xl font-bold mb-4 text-primary">PicSel 설정</h1>
      <p className="text-gray-600 dark:text-gray-400">
        설정 페이지는 준비 중입니다.
      </p>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <Options />
  </React.StrictMode>
);
