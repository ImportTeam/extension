interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Navigation = ({ currentPage, onNavigate }: NavigationProps) => {
  const navItems = [
    { id: 'dashboard', label: '대시보드', icon: '🏠' },
    { id: 'payment-methods', label: '결제수단', icon: '💳' },
    { id: 'transactions', label: '거래내역', icon: '📊' },
    { id: 'settings', label: '설정', icon: '⚙️' },
  ];

  return (
    <nav className="border-b bg-background">
      <div className="flex space-x-1 p-2">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              currentPage === item.id
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
            }`}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};
