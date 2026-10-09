import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { StudentSidebar } from '../../components/dashboard/StudentSidebar';
import { StatCard } from '../../components/dashboard/StatCard';
import { StatusBadge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import confetti from 'canvas-confetti';
import { 
  IndianRupee, 
  Clock, 
  CheckCircle2, 
  ArrowUpRight, 
  ShieldCheck, 
  AlertCircle, 
  CreditCard, 
  Building, 
  FileText 
} from 'lucide-react';

export const StudentEarnings: React.FC = () => {
  const { currentUser } = useAuth();
  const { payments, projects, businessProfiles } = useData();
  const { success, error } = useToast();

  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);
  const [upiId, setUpiId] = useState('aarav.sharma@okhdfcbank');
  const [isProcessing, setIsProcessing] = useState(false);

  const studentPayments = payments.filter((p) => p.studentId === currentUser?.id);

  // Completed payments
  const completedPayments = studentPayments.filter((p) => p.status === 'completed');
  const totalEarned = completedPayments.reduce((sum, p) => sum + p.amount, 0);

  // Pending approval (in escrow)
  const pendingPayments = studentPayments.filter((p) => p.status === 'awaiting_approval');
  const totalPending = pendingPayments.reduce((sum, p) => sum + p.amount, 0);

  const handleSimulateWithdrawal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!upiId.trim()) {
      error('Please enter a mock UPI ID');
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      try {
        confetti({ particleCount: 75, spread: 60 });
      } catch (e) {}
      success('Simulated Transfer Successful!', `₹${totalEarned.toLocaleString('en-IN')} has been transferred to ${upiId} in prototype demo mode.`);
      setWithdrawModalOpen(false);
    }, 700);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8 text-left">
        <StudentSidebar />

        <div className="flex-1 space-y-6 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-black text-navy-800 tracking-tight">
                Earnings &amp; Payouts
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Simulated financial ledger and milestone payments in Indian Rupees (₹).
              </p>
            </div>

            <Button
              variant="accent"
              size="sm"
              leftIcon={<ArrowUpRight className="w-4 h-4" />}
              onClick={() => setWithdrawModalOpen(true)}
              disabled={totalEarned <= 0}
            >
              Simulate Payout Withdrawal
            </Button>
          </div>

          {/* Prototype Disclaimer Banner */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-900 flex items-start gap-3">
            <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold">Prototype Demonstration Mode:</span>
              <p className="text-amber-800 leading-relaxed text-[11px]">
                All payments, escrow locks, and disbursements shown are completely simulated. No real banking accounts, UPI handles, or payment gateway APIs are processed.
              </p>
            </div>
          </div>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-subtle space-y-1">
              <span className="text-[11px] font-bold uppercase text-slate-400">Total Earned</span>
              <div className="text-2xl font-black text-navy-800">
                ₹{totalEarned.toLocaleString('en-IN')}
              </div>
              <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Approved &amp; Cleared</span>
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-subtle space-y-1">
              <span className="text-[11px] font-bold uppercase text-slate-400">In Escrow (Pending Review)</span>
              <div className="text-2xl font-black text-navy-800">
                ₹{totalPending.toLocaleString('en-IN')}
              </div>
              <p className="text-[11px] text-amber-600 font-semibold flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>Reserved by Business</span>
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-subtle space-y-1">
              <span className="text-[11px] font-bold uppercase text-slate-400">Available For Withdrawal</span>
              <div className="text-2xl font-black text-navy-800">
                ₹{totalEarned.toLocaleString('en-IN')}
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                Simulated UPI / NEFT Payout
              </p>
            </div>
          </div>

          {/* Transaction Ledger Table */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-subtle overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-navy-800">
                  Transaction &amp; Milestone Ledger
                </h3>
                <p className="text-[11px] text-slate-400">
                  Comprehensive audit trail of milestone escrow reservations and disbursements.
                </p>
              </div>
              <span className="text-xs text-slate-500 font-medium">
                {studentPayments.length} records
              </span>
            </div>

            {studentPayments.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-xs">
                No payment transactions recorded yet. Complete micro-projects to earn stipends!
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50/70 border-b border-slate-100 text-slate-500 font-semibold">
                    <tr>
                      <th className="py-3 px-4">Ref Number</th>
                      <th className="py-3 px-4">Project Title</th>
                      <th className="py-3 px-4">Client</th>
                      <th className="py-3 px-4">Amount</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {studentPayments.map((pay) => {
                      const proj = projects.find((p) => p.id === pay.projectId);
                      const biz = businessProfiles.find((b) => b.userId === pay.businessId);

                      return (
                        <tr key={pay.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="py-3.5 px-4 font-mono font-medium text-slate-600 text-[11px]">
                            {pay.referenceNumber}
                          </td>
                          <td className="py-3.5 px-4 font-semibold text-navy-800 max-w-xs truncate">
                            {proj?.title || pay.description}
                          </td>
                          <td className="py-3.5 px-4 text-slate-600">
                            {biz?.businessName || 'Business'}
                          </td>
                          <td className="py-3.5 px-4 font-black text-navy-800">
                            ₹{pay.amount.toLocaleString('en-IN')}
                          </td>
                          <td className="py-3.5 px-4">
                            <StatusBadge status={pay.status} />
                          </td>
                          <td className="py-3.5 px-4 text-slate-400 text-[11px]">
                            {new Date(pay.completedAt || pay.createdAt).toLocaleDateString('en-IN', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Simulated Withdrawal Modal */}
      <Modal
        isOpen={withdrawModalOpen}
        onClose={() => setWithdrawModalOpen(false)}
        title="Simulate Payout Withdrawal"
        description={`Available Simulated Balance: ₹${totalEarned.toLocaleString('en-IN')}`}
        maxWidth="md"
      >
        <form onSubmit={handleSimulateWithdrawal} className="space-y-4 text-left">
          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900">
            <span className="font-bold">Simulated Instant Payout</span>
            <p className="text-[11px] text-emerald-800 mt-0.5">
              In production, funds are wired through payment partner payouts (RazorpayX / Cashfree) directly into the student verified UPI VPA or bank account.
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold text-navy-800 mb-1">
              Mock UPI Virtual Address (VPA) <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              placeholder="e.g. yourname@okhdfcbank"
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent text-slate-800 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-navy-800 mb-1">
              Withdrawal Amount (₹)
            </label>
            <input
              type="text"
              disabled
              value={`₹${totalEarned.toLocaleString('en-IN')}`}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-100 text-slate-600 font-bold"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setWithdrawModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="accent"
              size="sm"
              isLoading={isProcessing}
            >
              Simulate Payout Transfer
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
