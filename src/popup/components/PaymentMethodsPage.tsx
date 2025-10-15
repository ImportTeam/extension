import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Button, Input } from '@/shared/components';
import { storage } from '@/shared/storage';
import type { PaymentMethod } from '@/shared/types';

export const PaymentMethodsPage = () => {
  const [methods, setMethods] = useState<PaymentMethod[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPaymentMethods();
  }, []);

  const loadPaymentMethods = async () => {
    try {
      const saved = await storage.getPaymentMethods();
      setMethods(saved);
      
      // Add sample data if empty
      if (saved.length === 0) {
        await addSampleData();
      }
    } catch (error) {
      console.error('Failed to load payment methods:', error);
    } finally {
      setLoading(false);
    }
  };

  const addSampleData = async () => {
    const samples: Omit<PaymentMethod, 'id' | 'createdAt'>[] = [
      { type: 'card', name: 'KB국민카드', number: '**** 1234', primary: true },
      { type: 'mobile', name: 'Toss Money', number: '₩125,000', primary: false },
      { type: 'card', name: '신한카드', number: '**** 5678', primary: false },
      { type: 'bank', name: '우리은행', number: '**** 9012', primary: false },
    ];
    
    for (const sample of samples) {
      await storage.addPaymentMethod(sample);
    }
    
    await loadPaymentMethods();
  };

  const getIcon = (type: PaymentMethod['type']) => {
    switch (type) {
      case 'card':
        return '💳';
      case 'bank':
        return '🏦';
      case 'mobile':
        return '💰';
    }
  };

  const getTypeLabel = (type: PaymentMethod['type']) => {
    switch (type) {
      case 'card':
        return '신용/체크카드';
      case 'bank':
        return '계좌';
      case 'mobile':
        return '간편결제';
    }
  };

  const setPrimary = async (id: string) => {
    try {
      await storage.updatePaymentMethod(id, { primary: true });
      await loadPaymentMethods();
    } catch (error) {
      console.error('Failed to set primary:', error);
    }
  };

  const deleteMethod = async (id: string) => {
    try {
      await storage.deletePaymentMethod(id);
      await loadPaymentMethods();
    } catch (error) {
      console.error('Failed to delete method:', error);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-full">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">결제 수단 관리</h2>
          <p className="text-muted-foreground">등록된 결제 수단을 관리하세요</p>
        </div>
        <Button>
          <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          결제수단 추가
        </Button>
      </div>

      {/* Payment Methods List */}
      <div className="grid gap-4">
        {methods.map(method => (
          <Card key={method.id}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">{getIcon(method.type)}</span>
                  <div>
                    <CardTitle className="text-lg">{method.name}</CardTitle>
                    <CardDescription>{getTypeLabel(method.type)} • {method.number}</CardDescription>
                  </div>
                </div>
                {method.primary && (
                  <span className="text-xs bg-primary text-primary-foreground px-2.5 py-1 rounded-full font-medium">
                    주 결제수단
                  </span>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-2">
                {!method.primary && (
                  <Button variant="outline" size="sm" onClick={() => setPrimary(method.id)}>
                    주 결제수단으로 설정
                  </Button>
                )}
                <Button variant="outline" size="sm">
                  수정
                </Button>
                <Button variant="destructive" size="sm" onClick={() => deleteMethod(method.id)}>
                  삭제
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Payment Method Form */}
      <Card>
        <CardHeader>
          <CardTitle>새 결제수단 추가</CardTitle>
          <CardDescription>카드번호 또는 계좌번호를 입력하세요</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">결제수단 종류</label>
            <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
              <option>신용/체크카드</option>
              <option>계좌</option>
              <option>간편결제</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">결제수단 이름</label>
            <Input placeholder="예: KB국민카드" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">카드/계좌 번호</label>
            <Input placeholder="1234-5678-9012-3456" />
          </div>
          <Button className="w-full">추가하기</Button>
        </CardContent>
      </Card>
    </div>
  );
};
