import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Button, Input } from '@/shared/components';
import { storage } from '@/shared/storage';
import type { Transaction, TransactionStatus } from '@/shared/types';

export const TransactionHistoryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | TransactionStatus>('all');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      const saved = await storage.getTransactions();
      setTransactions(saved);
      
      // Add sample data if empty
      if (saved.length === 0) {
        await addSampleData();
      }
    } catch (error) {
      console.error('Failed to load transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const addSampleData = async () => {
    const samples: Omit<Transaction, 'id' | 'createdAt'>[] = [
      { store: 'Coupang', amount: 45900, date: '2025-10-12 14:30', paymentMethod: 'KB국민카드', savings: 2300, status: 'completed', category: '쇼핑' },
      { store: 'Naver Pay', amount: 12000, date: '2025-10-11 18:45', paymentMethod: 'Toss Money', savings: 600, status: 'completed', category: '음식' },
      { store: 'G마켓', amount: 88500, date: '2025-10-10 10:20', paymentMethod: 'KB국민카드', savings: 4400, status: 'completed', category: '가전' },
      { store: 'SSG.com', amount: 34200, date: '2025-10-09 16:15', paymentMethod: '신한카드', savings: 1700, status: 'pending', category: '식품' },
      { store: 'Auction', amount: 156000, date: '2025-10-08 09:30', paymentMethod: 'KB국민카드', savings: 7800, status: 'completed', category: '가구' },
      { store: '11번가', amount: 23400, date: '2025-10-07 13:40', paymentMethod: 'Toss Money', savings: 1200, status: 'failed', category: '의류' },
      { store: 'Kakao Shopping', amount: 67800, date: '2025-10-06 11:25', paymentMethod: '우리은행', savings: 3400, status: 'completed', category: '도서' },
    ];
    
    for (const sample of samples) {
      await storage.addTransaction(sample);
    }
    
    await loadTransactions();
  };

  const filteredTransactions = transactions.filter(tx => {
    const matchesSearch = tx.store.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tx.paymentMethod.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || tx.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: TransactionStatus) => {
    switch (status) {
      case 'completed':
        return <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded-full">완료</span>;
      case 'pending':
        return <span className="text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 px-2 py-1 rounded-full">대기중</span>;
      case 'failed':
        return <span className="text-xs bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 px-2 py-1 rounded-full">실패</span>;
    }
  };

  const totalSavings = filteredTransactions.reduce((sum, tx) => sum + tx.savings, 0);
  const totalAmount = filteredTransactions.reduce((sum, tx) => sum + tx.amount, 0);

  if (loading) {
    return <div className="flex items-center justify-center h-full">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">거래 내역</h2>
        <p className="text-muted-foreground">전체 거래 내역을 확인하고 관리하세요</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>총 거래 금액</CardDescription>
            <CardTitle className="text-2xl">₩{totalAmount.toLocaleString()}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>총 절약 금액</CardDescription>
            <CardTitle className="text-2xl text-green-600">₩{totalSavings.toLocaleString()}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>거래 건수</CardDescription>
            <CardTitle className="text-2xl">{filteredTransactions.length}건</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4 flex-wrap">
            <div className="flex-1 min-w-[200px]">
              <Input
                placeholder="가맹점 또는 결제수단 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterStatus === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus('all')}
              >
                전체
              </Button>
              <Button
                variant={filterStatus === 'completed' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus('completed')}
              >
                완료
              </Button>
              <Button
                variant={filterStatus === 'pending' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus('pending')}
              >
                대기
              </Button>
              <Button
                variant={filterStatus === 'failed' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus('failed')}
              >
                실패
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transactions List */}
      <Card>
        <CardHeader>
          <CardTitle>거래 목록</CardTitle>
          <CardDescription>{filteredTransactions.length}건의 거래</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredTransactions.map(tx => (
              <div key={tx.id} className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent/50 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div>
                      <p className="font-semibold">{tx.store}</p>
                      <p className="text-sm text-muted-foreground">{tx.date}</p>
                    </div>
                    {getStatusBadge(tx.status)}
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs bg-accent px-2 py-1 rounded">{tx.category}</span>
                    <span className="text-xs text-muted-foreground">• {tx.paymentMethod}</span>
                  </div>
                </div>
                <div className="text-right ml-4">
                  <p className="font-bold text-lg">₩{tx.amount.toLocaleString()}</p>
                  <p className="text-sm text-green-600">절약 ₩{tx.savings.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
