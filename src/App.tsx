import React, { useState } from 'react';
import { Wallet, ArrowUpRight, ArrowDownLeft, History, CreditCard, PieChart, Settings, LogOut, Bell, Briefcase, Gift, ChevronRight } from 'lucide-react';

type Transaction = {
  id: string;
  type: 'deposit' | 'withdrawal';
  amount: number;
  date: string;
  description: string;
  category?: string;
};

type Account = {
  balance: number;
  transactions: Transaction[];
  cardNumber: string;
  accountType: string;
  rewards: number;
};

function App() {
  const [account, setAccount] = useState<Account>({
    balance: 2500000,
    cardNumber: '**** **** **** 7890',
    accountType: 'Platinum Elite',
    rewards: 25000,
    transactions: [
      { id: '1', type: 'deposit', amount: 1500000, date: '2024-03-10', description: 'Investment Return', category: 'Investment' },
      { id: '2', type: 'withdrawal', amount: 250000, date: '2024-03-09', description: 'Real Estate Payment', category: 'Property' },
      { id: '3', type: 'deposit', amount: 750000, date: '2024-03-08', description: 'Business Revenue', category: 'Business' },
      { id: '4', type: 'withdrawal', amount: 100000, date: '2024-03-07', description: 'Luxury Purchase', category: 'Shopping' },
    ],
  });

  const [amount, setAmount] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [notifications] = useState<number>(3);

  const handleTransaction = (type: 'deposit' | 'withdrawal') => {
    const value = parseFloat(amount);
    if (isNaN(value) || value <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    if (type === 'withdrawal' && value > account.balance) {
      setError('Insufficient funds');
      return;
    }

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type,
      amount: value,
      date: new Date().toISOString().split('T')[0],
      description: description || (type === 'deposit' ? 'Deposit' : 'Withdrawal'),
      category: 'General',
    };

    setAccount(prev => ({
      ...prev,
      balance: type === 'deposit' ? prev.balance + value : prev.balance - value,
      transactions: [newTransaction, ...prev.transactions],
    }));

    setAmount('');
    setDescription('');
    setError('');
  };

  const calculateMonthlyIncome = () => {
    return account.transactions
      .filter(t => t.type === 'deposit')
      .reduce((sum, t) => sum + t.amount, 0);
  };

  const calculateMonthlyExpenses = () => {
    return account.transactions
      .filter(t => t.type === 'withdrawal')
      .reduce((sum, t) => sum + t.amount, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Wallet className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">OlowoBank</h1>
                <p className="text-sm text-gray-500">Wealth Management</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <nav className="hidden md:flex space-x-8">
                <a href="#" className="text-gray-600 hover:text-blue-600 flex items-center space-x-1">
                  <Briefcase className="h-5 w-5" />
                  <span>Investments</span>
                </a>
                <a href="#" className="text-gray-600 hover:text-blue-600 flex items-center space-x-1">
                  <CreditCard className="h-5 w-5" />
                  <span>Cards</span>
                </a>
                <a href="#" className="text-gray-600 hover:text-blue-600 flex items-center space-x-1">
                  <PieChart className="h-5 w-5" />
                  <span>Analytics</span>
                </a>
              </nav>
              <div className="flex items-center space-x-4">
                <button className="p-2 hover:bg-gray-100 rounded-full relative">
                  <Bell className="h-5 w-5 text-gray-600" />
                  {notifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      {notifications}
                    </span>
                  )}
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <Settings className="h-5 w-5 text-gray-600" />
                </button>
                <div className="flex items-center space-x-3">
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-medium text-gray-900">Baba Olowo</span>
                    <span className="text-xs text-blue-600">{account.accountType}</span>
                  </div>
                  <button className="p-2 hover:bg-gray-100 rounded-full">
                    <LogOut className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Account Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Balance Card */}
          <div className="lg:col-span-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-xl p-8 text-white">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-lg font-medium opacity-90">Total Balance</h2>
                <p className="text-4xl font-bold mt-2">${account.balance.toLocaleString()}</p>
                <p className="text-sm opacity-75 mt-2">{account.cardNumber}</p>
              </div>
              <div className="bg-white/20 p-3 rounded-xl">
                <CreditCard className="h-8 w-8" />
              </div>
            </div>
            <div className="flex space-x-4">
              <div className="bg-white/10 rounded-xl p-4 flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <ArrowDownLeft className="h-5 w-5" />
                  <span className="text-sm">Monthly Income</span>
                </div>
                <p className="text-xl font-semibold">${calculateMonthlyIncome().toLocaleString()}</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4 flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <ArrowUpRight className="h-5 w-5" />
                  <span className="text-sm">Monthly Expenses</span>
                </div>
                <p className="text-xl font-semibold">${calculateMonthlyExpenses().toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Rewards Card */}
          <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl shadow-xl p-8 text-white">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-lg font-medium opacity-90">Rewards Points</h2>
                <p className="text-3xl font-bold mt-2">{account.rewards.toLocaleString()}</p>
              </div>
              <div className="bg-white/20 p-3 rounded-xl">
                <Gift className="h-6 w-6" />
              </div>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <p className="text-sm mb-2">Available Rewards</p>
              <ul className="space-y-2">
                <li className="flex items-center justify-between">
                  <span>Travel Miles</span>
                  <ChevronRight className="h-4 w-4" />
                </li>
                <li className="flex items-center justify-between">
                  <span>Cashback</span>
                  <ChevronRight className="h-4 w-4" />
                </li>
                <li className="flex items-center justify-between">
                  <span>Luxury Perks</span>
                  <ChevronRight className="h-4 w-4" />
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Transaction Form */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Make a Transaction</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                Amount ($)
              </label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <input
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter transaction description"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <div className="flex space-x-4">
              <button
                onClick={() => handleTransaction('deposit')}
                className="flex-1 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
              >
                <ArrowDownLeft className="h-5 w-5" />
                <span>Deposit</span>
              </button>
              <button
                onClick={() => handleTransaction('withdrawal')}
                className="flex-1 bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
              >
                <ArrowUpRight className="h-5 w-5" />
                <span>Withdraw</span>
              </button>
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <History className="h-6 w-6 text-gray-600" />
              <h2 className="text-xl font-semibold text-gray-900">Transaction History</h2>
            </div>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {account.transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-xl ${
                    transaction.type === 'deposit' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {transaction.type === 'deposit' ? (
                      <ArrowDownLeft className="h-6 w-6 text-green-600" />
                    ) : (
                      <ArrowUpRight className="h-6 w-6 text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{transaction.description}</p>
                    <div className="flex items-center space-x-2">
                      <p className="text-sm text-gray-500">{transaction.date}</p>
                      {transaction.category && (
                        <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                          {transaction.category}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <p className={`font-semibold ${
                  transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.type === 'deposit' ? '+' : '-'}${transaction.amount.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;