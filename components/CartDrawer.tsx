import React, { useState, useEffect } from 'react';
import { X, Trash2, CreditCard, Lock, CheckCircle, Landmark, Loader2, User, Users, Briefcase } from 'lucide-react';
import { CartItem } from '../types';
import { supabase } from '../utils/supabaseClient';
// Import thư viện PayPal chuẩn cho React
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

interface ParticipantDetails {
  key: string;
  assessmentId: string;
  assessmentName: string;
  name: string;
  email: string;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ 
  isOpen, 
  onClose, 
  cart, 
  onUpdateQuantity, 
  onRemoveItem,
  onClearCart
}) => {
  const [step, setStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'paypal' | 'bank'>('paypal');
  
  // Upsell State
  const [includeDebrief, setIncludeDebrief] = useState(false);
  const DEBRIEF_PRICE = 750;

  // Buyer Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  // Participant State
  const [isBuyerParticipant, setIsBuyerParticipant] = useState(true);
  const [participants, setParticipants] = useState<ParticipantDetails[]>([]);

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = subtotal + (includeDebrief ? DEBRIEF_PRICE : 0);

  // Initialize participants structure
  useEffect(() => {
    if (step === 'checkout') {
      const newParticipants: ParticipantDetails[] = [];
      cart.forEach(item => {
        for (let i = 0; i < item.quantity; i++) {
          const key = `${item.id}-${i}`;
          const existing = participants.find(p => p.key === key);
          newParticipants.push({
            key,
            assessmentId: item.id,
            assessmentName: item.name,
            name: existing ? existing.name : '',
            email: existing ? existing.email : ''
          });
        }
      });
      setParticipants(newParticipants);
    }
  }, [cart, step]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleParticipantChange = (key: string, field: 'name' | 'email', value: string) => {
    setParticipants(prev => prev.map(p => 
      p.key === key ? { ...p, [field]: value } : p
    ));
  };

  // Hàm kiểm tra form (Validate)
  const validateOrder = () => {
    if (!formData.firstName || !formData.lastName || !formData.email) {
      alert("Please fill in all buyer information fields.");
      return false;
    }
    const needsParticipantInfo = !isBuyerParticipant || totalItems > 1;
    if (needsParticipantInfo) {
       const incomplete = participants.some(p => !p.name.trim() || !p.email.trim());
       if (incomplete) {
         alert("Please fill in all participant information fields.");
         return false;
       }
    }
    return true;
  };

  // Hàm xử lý lưu đơn hàng cuối cùng (Dùng chung cho cả Bank và PayPal)
  const processOrderFinal = async (status: string, extraData: any = {}) => {
    setIsProcessing(true);
    try {
      const orderData = {
        customer_name: `${formData.firstName} ${formData.lastName}`,
        customer_email: formData.email,
        total_amount: total,
        payment_method: paymentMethod,
        items: cart, 
        participants: participants, 
        include_debrief: includeDebrief,
        status: status,
        payment_details: extraData,
        created_at: new Date().toISOString()
      };

      // 1. Lưu vào Supabase
      const { error } = await supabase
        .from('orders')
        .insert([orderData]);

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      // 2. Gửi thông báo sang Zoho (thông qua Vercel API)
      try {
        await fetch('/api/notify-zoho', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...orderData,
                order_date: new Date().toLocaleString('vi-VN'),
                order_id_ref: `ORD-${Date.now()}`
            })
        });
      } catch (apiError) {
        console.error('API notification error:', apiError);
      }

      setStep('success');
      onClearCart();
    } catch (error: any) {
      console.error('Error placing order:', error);
      alert('There was a problem saving your order: ' + (error.message || 'Unknown error'));
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBankCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateOrder()) return;
    await processOrderFinal('pending_transfer');
  };

  if (!isOpen) return null;

  return (
    // Bọc toàn bộ trong PayPal Provider với Client ID của bạn
    <PayPalScriptProvider options={{ 
        "clientId": "AUDLZ_Y-m1CYWr8Y38b13vaubBSjUJeL-B3JFFIX8-AAY8hsC6Xe-TYGvysQDztO4_52Wb9qWQ3k0LAQ",
        currency: "USD"
    }}>
        <div className="fixed inset-0 z-[60] overflow-hidden">
        <div className="absolute inset-0 bg-[#0C3963]/50 backdrop-blur-sm" onClick={onClose} />
        
        <div className="absolute inset-y-0 right-0 max-w-lg w-full flex">
            <div className="h-full w-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-[#0C3963]">
                {step === 'cart' && 'Shopping Cart'}
                {step === 'checkout' && 'Secure Checkout'}
                {step === 'success' && 'Order Confirmed'}
                </h2>
                {step !== 'success' && (
                <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <X size={24} className="text-gray-500" />
                </button>
                )}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
                
                {/* Step 1: Cart View */}
                {step === 'cart' && (
                <>
                    {cart.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                        <div className="w-16 h-16 bg-[#E0E9F4] rounded-full flex items-center justify-center text-[#5E7AA6]">
                        <CreditCard size={32} />
                        </div>
                        <p className="text-gray-500">Your cart is empty</p>
                        <button 
                        onClick={onClose}
                        className="text-[#0C3963] font-semibold hover:underline"
                        >
                        Browse Assessments
                        </button>
                    </div>
                    ) : (
                    <div className="space-y-6">
                        {cart.map(item => (
                        <div key={item.id} className="flex gap-4">
                            <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 line-clamp-1">{item.name}</h4>
                            <p className="text-sm text-gray-500 mb-2">{item.category}</p>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center border border-gray-200 rounded">
                                <button 
                                    onClick={() => onUpdateQuantity(item.id, -1)}
                                    className="px-2 py-1 hover:bg-gray-50 text-gray-600"
                                    disabled={item.quantity <= 1}
                                >-</button>
                                <span className="px-2 text-sm font-medium w-8 text-center">{item.quantity}</span>
                                <button 
                                    onClick={() => onUpdateQuantity(item.id, 1)}
                                    className="px-2 py-1 hover:bg-gray-50 text-gray-600"
                                >+</button>
                                </div>
                                <span className="font-bold text-[#0C3963]">${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                            </div>
                            <button 
                            onClick={() => onRemoveItem(item.id)}
                            className="text-gray-400 hover:text-[#C7593A] h-fit p-1"
                            >
                            <Trash2 size={18} />
                            </button>
                        </div>
                        ))}
                    </div>
                    )}
                </>
                )}

                {/* Step 2: Checkout Form */}
                {step === 'checkout' && (
                <form id="checkout-form" onSubmit={handleBankCheckout} className="space-y-8 pb-12">
                    
                    {/* Contact Info (Buyer) */}
                    <div className="space-y-4">
                    <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
                        <User size={18} className="text-[#0C3963]" />
                        <h3 className="font-bold text-gray-900">Buyer Information</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <input 
                        required 
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        type="text" 
                        placeholder="First Name" 
                        className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-[#0C3963] focus:outline-none bg-white" 
                        />
                        <input 
                        required 
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        type="text" 
                        placeholder="Last Name" 
                        className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-[#0C3963] focus:outline-none bg-white" 
                        />
                    </div>
                    <input 
                        required 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        type="email" 
                        placeholder="Email Address" 
                        className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-[#0C3963] focus:outline-none bg-white" 
                    />
                    </div>

                    {/* Participant Info Section */}
                    <div className="space-y-4">
                    <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
                        <Users size={18} className="text-[#0C3963]" />
                        <h3 className="font-bold text-gray-900">Participant Information</h3>
                    </div>
                    
                    {totalItems === 1 ? (
                        <div className="space-y-4">
                        <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer p-3 bg-gray-50 rounded border border-gray-200 hover:bg-gray-100 transition-colors">
                            <input 
                            type="checkbox" 
                            checked={isBuyerParticipant}
                            onChange={(e) => setIsBuyerParticipant(e.target.checked)}
                            className="rounded text-[#0C3963] focus:ring-[#0C3963]"
                            />
                            <span className="font-medium">I am the sole participant for this order.</span>
                        </label>

                        {!isBuyerParticipant && (
                            <div className="animate-in fade-in slide-in-from-top-2">
                            <p className="text-xs text-gray-500 mb-2 uppercase font-bold tracking-wide">Enter Participant Details:</p>
                            {participants.map(p => (
                                <div key={p.key} className="space-y-3 bg-white p-3 rounded border border-gray-200 shadow-sm">
                                    <div className="text-xs font-bold text-[#0C3963]">{p.assessmentName}</div>
                                    <input 
                                    required={!isBuyerParticipant}
                                    value={p.name}
                                    onChange={(e) => handleParticipantChange(p.key, 'name', e.target.value)}
                                    placeholder="Participant Name" 
                                    className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#0C3963]" 
                                    />
                                    <input 
                                    required={!isBuyerParticipant}
                                    type="email"
                                    value={p.email}
                                    onChange={(e) => handleParticipantChange(p.key, 'email', e.target.value)}
                                    placeholder="Participant Email" 
                                    className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#0C3963]" 
                                    />
                                </div>
                            ))}
                            </div>
                        )}
                        </div>
                    ) : (
                        <div className="space-y-4 animate-in fade-in">
                            <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded border border-blue-100">
                            Please assign each assessment to a participant below.
                            </p>
                            {participants.map((p, index) => (
                            <div key={p.key} className="p-4 rounded-lg border border-gray-200 bg-gray-50 relative group">
                                <div className="absolute top-2 right-2 text-xs font-bold text-gray-400">#{index + 1}</div>
                                <h4 className="font-bold text-sm text-[#0C3963] mb-3">{p.assessmentName}</h4>
                                <div className="space-y-3">
                                    <input 
                                    required
                                    value={p.name}
                                    onChange={(e) => handleParticipantChange(p.key, 'name', e.target.value)}
                                    placeholder="Participant Name" 
                                    className="w-full p-2.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#0C3963] bg-white" 
                                    />
                                    <input 
                                    required
                                    type="email"
                                    value={p.email}
                                    onChange={(e) => handleParticipantChange(p.key, 'email', e.target.value)}
                                    placeholder="Participant Email" 
                                    className="w-full p-2.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#0C3963] bg-white" 
                                    />
                                </div>
                            </div>
                            ))}
                        </div>
                    )}
                    </div>

                    {/* Expert Debrief Upsell */}
                    <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4 animate-in fade-in slide-in-from-top-2 duration-300">
                    <label className="flex items-start gap-3 cursor-pointer group select-none">
                        <div className="mt-1 relative flex items-center">
                            <input 
                            type="checkbox" 
                            checked={includeDebrief}
                            onChange={(e) => setIncludeDebrief(e.target.checked)}
                            className="w-5 h-5 border-gray-300 rounded text-[#0C3963] focus:ring-[#0C3963] transition-colors"
                            />
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-center mb-1">
                                <h4 className="font-bold text-[#0C3963] flex items-center gap-2">
                                <Briefcase size={16} className="text-[#0C3963]" />
                                Add Expert Debriefing
                                </h4>
                                <span className="bg-[#0C3963] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">Recommended</span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2 leading-snug">
                                Includes a 1-hour private consultation with a senior consultant.
                            </p>
                            <div className="font-bold text-[#0C3963] text-sm">
                                +${DEBRIEF_PRICE.toFixed(2)} / hr
                            </div>
                        </div>
                    </label>
                    </div>

                    {/* Payment Method Selection */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-gray-900 border-b border-gray-100 pb-2">Select Payment Method</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                type="button"
                                onClick={() => setPaymentMethod('paypal')}
                                className={`p-4 border rounded-xl flex flex-col items-center gap-2 transition-all group ${paymentMethod === 'paypal' ? 'border-[#0C3963] bg-[#0C3963]/5 text-[#0C3963] ring-1 ring-[#0C3963]' : 'border-gray-200 hover:bg-gray-50 text-gray-500'}`}
                            >
                                <svg className={`w-10 h-10 ${paymentMethod === 'paypal' ? 'text-[#0C3963]' : 'text-gray-400 group-hover:text-gray-500'}`} viewBox="0 0 24 24" fill="currentColor">
                                <path d="M20.067 8.478c.492.298.816.822.816 1.41 0 .96-.803 1.737-1.795 1.737h-1.638l-.667 3.336a.601.601 0 0 1-.587.484h-2.181a.53.53 0 0 1-.52-.634l.43-2.148h-1.637l-.667 3.336a.6.6 0 0 1-.587.484h-2.181a.53.53 0 0 1-.52-.634l.43-2.148H6.732a.601.601 0 0 1-.587-.484l-.667-3.336a.53.53 0 0 1 .52-.634h1.637l.43-2.148H6.43a.601.601 0 0 1-.587-.484l-.667-3.336a.53.53 0 0 1 .52-.634h2.181c.258 0 .492.186.587.484l.667 3.336h1.637l.43-2.148c.095-.298.329-.484.587-.484h2.181c.492 0 .937.284 1.157.733l1.157-1.157a.53.53 0 0 1 .748 0l1.157 1.157z"/>
                                </svg>
                                <span className="font-bold text-xs uppercase tracking-wider">PayPal</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setPaymentMethod('bank')}
                                className={`p-4 border rounded-xl flex flex-col items-center gap-2 transition-all group ${paymentMethod === 'bank' ? 'border-[#0C3963] bg-[#0C3963]/5 text-[#0C3963] ring-1 ring-[#0C3963]' : 'border-gray-200 hover:bg-gray-50 text-gray-500'}`}
                            >
                                <Landmark size={40} className={`${paymentMethod === 'bank' ? 'text-[#0C3963]' : 'text-gray-400 group-hover:text-gray-500'}`} />
                                <span className="font-bold text-xs uppercase tracking-wider">Bank Transfer</span>
                            </button>
                        </div>
                    </div>

                    {/* Conditional Payment UI */}
                    {paymentMethod === 'paypal' ? (
                    <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                        <div className="bg-indigo-50 p-4 rounded-lg flex items-start gap-3 border border-indigo-100">
                        <Lock size={20} className="text-[#0C3963] mt-0.5 flex-shrink-0" />
                        <p className="text-xs text-[#0C3963] leading-relaxed">
                            Your assessment credentials will be released immediately upon successful PayPal checkout. 
                            Transactions are secured by SSL encryption.
                        </p>
                        </div>
                        
                        <div className="w-full pt-2">
                            {/* Nút PayPal Chính Hãng */}
                            <PayPalButtons 
                                style={{ layout: "vertical", color: 'gold', shape: 'rect', label: 'paypal' }}
                                createOrder={(data, actions) => {
                                    // Kiểm tra thông tin trước khi mở Popup PayPal
                                    if (!validateOrder()) return Promise.reject();
                                    
                                    return actions.order.create({
                                        purchase_units: [{
                                            amount: {
                                                value: total.toFixed(2),
                                                currency_code: 'USD'
                                            },
                                            description: `Assessments Order: ${cart.map(i => i.name).join(', ')}`
                                        }]
                                    });
                                }}
                                onApprove={async (data, actions) => {
                                    if (actions.order) {
                                        const details = await actions.order.capture();
                                        // Thanh toán thành công -> Gọi hàm lưu đơn
                                        await processOrderFinal('paid', details);
                                    }
                                }}
                                onError={(err) => {
                                    console.error('PayPal Error:', err);
                                    alert("Payment failed or cancelled. Please try again.");
                                }}
                            />
                        </div>
                    </div>
                    ) : (
                        <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 space-y-4 shadow-sm">
                            <div className="flex items-center gap-2 border-b border-gray-200 pb-3 mb-2">
                                <Landmark size={20} className="text-[#0C3963]" />
                                <h4 className="font-bold text-[#0C3963] text-sm uppercase tracking-wide">Bank Account Details</h4>
                            </div>
                            <div className="space-y-4 text-sm">
                                <div>
                                    <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Beneficiary Name</span>
                                    <div className="font-mono text-gray-900 bg-white p-3 border border-gray-200 rounded text-sm select-all font-bold">
                                    LEE HECHT HARRISON INDOCHINE
                                    </div>
                                </div>
                                <div>
                                    <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Account Number (USD)</span>
                                    <div className="font-mono text-gray-900 bg-white p-3 border border-gray-200 rounded text-sm select-all font-bold">
                                    503 527 574 301
                                    </div>
                                </div>
                                <div className="bg-blue-50 p-3 rounded border border-blue-100 text-xs text-blue-800 leading-snug">
                                    <strong>Note:</strong> Assessment codes will be released within 2 working days after transfer verification. Please include your name in the transfer description.
                                </div>
                            </div>
                        </div>
                        </div>
                    )}
                </form>
                )}

                {/* Step 3: Success Confirmation */}
                {step === 'success' && (
                <div className="h-full flex flex-col items-center justify-center animate-in fade-in duration-500 text-center p-4">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6 shadow-sm animate-in zoom-in duration-300">
                        <CheckCircle size={40} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h3>
                    <p className="text-gray-600 mb-8 max-w-sm mx-auto leading-relaxed">
                        Confirmation email has been sent to <span className="font-bold text-[#0C3963]">{formData.email}</span>.
                    </p>
                    
                    <button 
                        onClick={() => {
                        setStep('cart');
                        onClose();
                        }}
                        className="w-full bg-[#0C3963] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#2C4D81] transition-colors shadow-lg"
                    >
                        Continue Browsing
                    </button>
                </div>
                )}
            </div>

            {/* Footer / Actions */}
            {step !== 'success' && cart.length > 0 && (
                <div className="p-6 border-t border-gray-100 bg-white shadow-[0_-10px_20px_-15px_rgba(0,0,0,0.1)]">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-500 font-bold uppercase text-xs tracking-widest">Total Amount</span>
                    <span className="text-2xl font-bold text-[#0C3963]">${total.toFixed(2)}</span>
                </div>
                
                {step === 'cart' ? (
                    <button 
                    onClick={() => setStep('checkout')}
                    className="w-full bg-[#0C3963] text-white py-4 rounded-lg font-bold hover:bg-[#2C4D81] transition-colors flex items-center justify-center gap-2 shadow-lg"
                    >
                    Proceed to Checkout
                    </button>
                ) : (
                    <div className="flex gap-3">
                    <button 
                        onClick={() => setStep('cart')}
                        className="px-6 py-4 border border-gray-200 rounded-lg font-bold text-gray-600 hover:bg-gray-50 transition-colors"
                        disabled={isProcessing}
                    >
                        Back
                    </button>
                    {/* Nút Complete Order chỉ hiện khi chọn Bank Transfer, vì PayPal có nút riêng */}
                    {paymentMethod === 'bank' && (
                        <button 
                        form="checkout-form"
                        type="submit"
                        disabled={isProcessing}
                        className="flex-1 bg-[#0C3963] text-white py-4 rounded-lg font-bold hover:bg-[#2C4D81] transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg"
                        >
                        {isProcessing ? <Loader2 className="animate-spin" size={20} /> : 'Complete Order'}
                        </button>
                    )}
                    </div>
                )}
                </div>
            )}
            </div>
        </div>
        </div>
    </PayPalScriptProvider>
  );
};

export default CartDrawer;