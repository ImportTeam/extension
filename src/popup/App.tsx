import { useEffect, useState } from 'react';
import { popupLogger as logger } from '@/shared/logger';
import { Dashboard, PaymentMethodsPage, TransactionHistoryPage, SettingsPage, Navigation } from './components';
import { PixelGridIcon } from '@/shared/components';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  useEffect(() => {
    logger.info('Popup opened', { page: currentPage });
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'payment-methods':
        return <PaymentMethodsPage />;
      case 'transactions':
        return <TransactionHistoryPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="w-[380px] h-[600px] flex flex-col bg-background overflow-hidden">
      <header className="border-b flex-shrink-0">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            {/* PicSel 브랜드 픽셀 그리드 아이콘 */}
            <PixelGridIcon variant="accent" />
            <h1 className="text-xl font-bold tracking-tight">PicSel</h1>
          </div>
          <span className="text-sm text-muted-foreground">v1.0.0</span>
        </div>
      </header>
      
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
      
      <main className="flex-1 overflow-y-auto p-6">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;

