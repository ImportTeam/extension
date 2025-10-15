import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, PixelLoader, PixelGridLarge } from '@/shared/components';
import { storage } from '@/shared/storage';
import type { PaymentMethod, Transaction } from '@/shared/types';

export const Dashboard = () => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [methods, txs] = await Promise.all([
        storage.getPaymentMethods(),
        storage.getTransactions(),
      ]);
      setPaymentMethods(methods);
      setTransactions(txs);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <PixelLoader message="데이터 로딩 중..." size="lg" />
      </div>
    );
  }

  const favoritePaymentMethods = paymentMethods.slice(0, 3);
  const recentTransactions = transactions.slice(0, 5);
  const thisMonthTransactions = transactions.filter(tx => {
    const txDate = new Date(tx.date);
    const now = new Date();
    return txDate.getMonth() === now.getMonth() && txDate.getFullYear() === now.getFullYear();
  });
  const thisMonthSavings = thisMonthTransactions.reduce((sum, tx) => tx.savings + sum, 0);
  
  const getPaymentMethodIcon = (type: PaymentMethod['type']) => {
    switch (type) {
      case 'card': return '💳';
      case 'bank': return '🏦';
      case 'mobile': return '💰';
    }
  };

  return (
    <div className="space-y-6">
      {/* Hero Card - Savings (가장 중요한 정보) */}
      <div className="space-y-3">
        <Card className="bg-gradient-to-br from-savings-500 to-savings-600 border-0 shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-white/90 mb-2">이번 달 절약 금액</p>
                <h2 className="text-5xl font-bold text-white leading-tight mb-1">
                  ₩{thisMonthSavings.toLocaleString()}
                </h2>
                <p className="text-xs text-white/70">{thisMonthTransactions.length}건의 거래</p>
              </div>
              <div className="text-7xl opacity-20 select-none">💰</div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats Grid - 2 Columns */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="bg-gradient-to-br from-picsel-600 to-picsel-700 border-0 shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-xs text-white/80 mb-0.5">결제수단</p>
                  <p className="text-2xl font-bold text-white">{paymentMethods.length}개</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-pixel-500 to-pixel-600 border-0 shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-xs text-white/80 mb-0.5">이번 달</p>
                  <p className="text-2xl font-bold text-white">{thisMonthTransactions.length}건</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Favorite Payment Methods */}
      <Card className="border-picsel-200 dark:border-picsel-700 shadow-md hover:shadow-lg transition-all duration-300">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-semibold text-foreground">즐겨찾는 결제수단</CardTitle>
              <CardDescription className="mt-1">자주 사용하는 결제 방법</CardDescription>
            </div>
            <button className="text-pixel-600 hover:text-pixel-700 text-sm font-medium flex items-center gap-1 transition-colors">
              전체보기
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {favoritePaymentMethods.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-5xl mb-4 opacity-30">💳</div>
              <p className="text-sm text-muted-foreground">등록된 결제수단이 없습니다</p>
              <button className="mt-4 px-4 py-2 bg-pixel-500 text-white text-sm font-medium rounded-lg hover:bg-pixel-600 transition-colors">
                결제수단 추가
              </button>
            </div>
          ) : (
            favoritePaymentMethods.map((method) => (
              <div 
                key={method.id} 
                className="flex items-center gap-4 p-4 rounded-lg border border-picsel-200 dark:border-picsel-700 hover:bg-pixel-50/30 dark:hover:bg-pixel-900/20 hover:border-pixel-300 dark:hover:border-pixel-700 hover:shadow-sm transition-all duration-200 cursor-pointer group"
              >
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-picsel-500 to-picsel-600 flex items-center justify-center text-2xl shadow-sm group-hover:scale-105 transition-transform duration-200">
                    {getPaymentMethodIcon(method.type)}
                  </div>
                </div>
                
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="font-semibold text-base text-foreground group-hover:text-pixel-600 dark:group-hover:text-pixel-400 transition-colors truncate">
                      {method.name}
                    </p>
                    {method.primary && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-pixel-500 text-white shadow-sm">
                        주
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{method.number}</p>
                </div>
                
                {/* Arrow */}
                <svg className="w-5 h-5 text-muted-foreground group-hover:text-pixel-600 group-hover:translate-x-1 transition-all flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card className="border-picsel-200 dark:border-picsel-700 shadow-md hover:shadow-lg transition-all duration-300">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-semibold text-foreground">최근 거래 내역</CardTitle>
              <CardDescription className="mt-1">최근 5건의 거래</CardDescription>
            </div>
            <button className="text-pixel-600 hover:text-pixel-700 text-sm font-medium flex items-center gap-1 transition-colors">
              전체보기
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </CardHeader>
        <CardContent className="space-y-1">
          {recentTransactions.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-5xl mb-4 opacity-30">📊</div>
              <p className="text-sm text-muted-foreground">거래 내역이 없습니다</p>
            </div>
          ) : (
            recentTransactions.map((tx) => (
              <div 
                key={tx.id} 
                className="flex items-center justify-between p-3 rounded-lg hover:bg-picsel-50/50 dark:hover:bg-picsel-800/30 transition-all duration-200 cursor-pointer group"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-base text-foreground group-hover:text-pixel-600 dark:group-hover:text-pixel-400 transition-colors truncate">
                    {tx.store}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">{tx.date}</p>
                </div>
                <div className="text-right flex-shrink-0 ml-4">
                  <p className="font-bold text-base text-foreground">₩{tx.amount.toLocaleString()}</p>
                  <p className="text-xs text-savings-600 dark:text-savings-400 font-medium mt-0.5">
                    절약 ₩{tx.savings.toLocaleString()}
                  </p>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
};
