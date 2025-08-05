import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function UserDashboard() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [nickname, setNickname] = useState("");
  const [otp, setOtp] = useState("");
  const [passkey, setPasskey] = useState("");
  const [registered, setRegistered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [isAnimating, setIsAnimating] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [showBalance, setShowBalance] = useState(true);

  // Check if user is already registered
  useEffect(() => {
    const savedUser = localStorage.getItem('zdos-user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setPhone(user.phone);
      setNickname(user.nickname);
      setRegistered(true);
    }
  }, []);

  const validateStep = (currentStep) => {
    const newErrors = {};
    
    if (currentStep >= 1) {
      const cleanPhone = phone.replace(/[^\d\+\-\s]/g, '');
      if (!phone.trim()) newErrors.phone = "NUMERO TELEFONO RICHIESTO";
      if (!/^[\+]?[1-9][\d]{0,15}$/.test(cleanPhone.replace(/\s/g, ''))) {
        newErrors.phone = "FORMATO NUMERO NON VALIDO";
      }
    }
    
    if (currentStep >= 2) {
      const cleanNickname = nickname.replace(/[^\w\-]/g, '');
      if (!nickname.trim()) newErrors.nickname = "NICKNAME RICHIESTO";
      if (cleanNickname.length < 3) newErrors.nickname = "NICKNAME TROPPO CORTO - MIN 3 CARATTERI";
      if (!/^[a-zA-Z0-9_-]+$/.test(cleanNickname)) {
        newErrors.nickname = "SOLO LETTERE, NUMERI, _ E -";
      }
    }
    
    if (currentStep >= 3) {
      const cleanOtp = otp.replace(/\D/g, '');
      if (!otp.trim()) newErrors.otp = "CODICE OTP RICHIESTO";
      if (cleanOtp.length !== 6) newErrors.otp = "OTP DEVE ESSERE 6 CIFRE";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setIsAnimating(true);
      setTimeout(() => {
        setStep(step + 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const prevStep = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setStep(step - 1);
      setErrors({});
      setIsAnimating(false);
    }, 300);
  };

  const sendOTP = async () => {
    if (!validateStep(1)) return;
    
    setLoading(true);
    try {
      // Sanitize phone number
      const cleanPhone = phone.replace(/[^\d\+\-\s]/g, '').replace(/\s/g, '');
      
      // Production: Integrate with real SMS service
      const response = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: cleanPhone })
      });
      
      if (response.ok) {
        setOtpSent(true);
        nextStep();
      } else {
        setErrors({ phone: "ERRORE INVIO OTP - RIPROVA" });
      }
    } catch (error) {
      setErrors({ phone: "ERRORE CONNESSIONE - RIPROVA" });
    } finally {
      setLoading(false);
    }
  };

  async function registerUser() {
    if (!validateStep(3)) return;
    
    setLoading(true);
    try {
      // Sanitize inputs
      const cleanPhone = phone.replace(/[^\d\+\-\s]/g, '').replace(/\s/g, '');
      const cleanNickname = nickname.replace(/[^\w\-]/g, '');
      const cleanOtp = otp.replace(/\D/g, '');
      
      // Production: Verify OTP with backend
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          phone: cleanPhone, 
          nickname: cleanNickname, 
          otp: cleanOtp 
        })
      });
      
      if (response.ok) {
        const result = await response.json();
        
        const userData = { 
          phone: cleanPhone, 
          nickname: cleanNickname, 
          registeredAt: new Date().toISOString(),
          balance: 0.00,
          rewards: 0.00,
          cashback: 0.00,
          passkey: result.passkey,
          verified: true
        };
        
        localStorage.setItem('zdos-user', JSON.stringify(userData));
        setRegistered(true);
        setStep(1);
      } else {
        setErrors({ otp: "CODICE OTP NON VALIDO" });
      }
    } catch (error) {
      setErrors({ general: "ERRORE SISTEMA - RIPROVA" });
    } finally {
      setLoading(false);
    }
  }

  const logout = () => {
    localStorage.removeItem('zdos-user');
    setRegistered(false);
    setPhone("");
    setNickname("");
    setOtp("");
    setPasskey("");
    setStep(1);
    setErrors({});
    setOtpSent(false);
  };

  const navigateTo = (page) => {
    router.push(page);
  };

  if (registered) {
    const userData = JSON.parse(localStorage.getItem('zdos-user') || '{}');
    
    return (
      <div className="banking-dashboard">
        {/* Header Balance */}
        <div className="balance-header">
          <div className="balance-section">
            <div className="balance-toggle">
              <button 
                onClick={() => setShowBalance(!showBalance)}
                className="balance-toggle-btn"
              >
                {showBalance ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            <div className="balance-info">
              <div className="balance-label">SALDO DISPONIBILE</div>
              <div className="balance-amount">
                {showBalance ? `€ ${userData.balance?.toFixed(2) || '0.00'}` : '€ ••••••'}
              </div>
            </div>
          </div>
          
          <div className="user-info">
            <div className="user-avatar">
              <span>{nickname[0]?.toUpperCase()}</span>
            </div>
            <div className="user-details">
              <div className="user-nickname">{nickname}</div>
              <div className="user-phone">{phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')}</div>
            </div>
          </div>
        </div>

        {/* Rewards & Cashback */}
        <div className="rewards-section">
          <div className="reward-card cashback">
            <div className="reward-icon">💰</div>
            <div className="reward-info">
              <div className="reward-label">CASHBACK</div>
              <div className="reward-value">€ {userData.cashback?.toFixed(2) || '0.00'}</div>
            </div>
            <button className="reward-claim-btn">RISCATTA</button>
          </div>
          
          <div className="reward-card rewards">
            <div className="reward-icon">🎁</div>
            <div className="reward-info">
              <div className="reward-label">REWARDS</div>
              <div className="reward-value">€ {userData.rewards?.toFixed(2) || '0.00'}</div>
            </div>
            <button className="reward-claim-btn">RISCATTA</button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <div className="action-row">
            <button className="action-card primary">
              <div className="action-icon">📱</div>
              <div className="action-label">RICARICA P2P</div>
            </button>
            
            <button className="action-card secondary">
              <div className="action-icon">💳</div>
              <div className="action-label">BANCOMAT</div>
            </button>
          </div>
          
          <div className="action-row">
            <button className="action-card accent">
              <div className="action-icon">🔗</div>
              <div className="action-label">COLLEGA CONTO</div>
            </button>
            
            <button className="action-card warning">
              <div className="action-icon">₿</div>
              <div className="action-label">CRYPTO</div>
            </button>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="payment-methods">
          <div className="section-title">METODI DI PAGAMENTO</div>
          
          <div className="payment-grid">
            <div className="payment-card">
              <div className="payment-logo">💳</div>
              <div className="payment-name">Carta di Credito</div>
              <div className="payment-status connected">CONNESSA</div>
            </div>
            
            <div className="payment-card">
              <div className="payment-logo">🏦</div>
              <div className="payment-name">Bonifico SEPA</div>
              <div className="payment-status instant">ISTANTANEO</div>
            </div>
            
            <div className="payment-card">
              <div className="payment-logo">📱</div>
              <div className="payment-name">PayPal</div>
              <div className="payment-status available">DISPONIBILE</div>
            </div>
            
            <div className="payment-card">
              <div className="payment-logo">💰</div>
              <div className="payment-name">CashApp</div>
              <div className="payment-status available">DISPONIBILE</div>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="transactions-section">
          <div className="section-title">TRANSAZIONI RECENTI</div>
          
          <div className="transaction-list">
            <div className="transaction-item">
              <div className="transaction-icon income">+</div>
              <div className="transaction-details">
                <div className="transaction-desc">Cashback Shopping</div>
                <div className="transaction-date">Oggi, 14:30</div>
              </div>
              <div className="transaction-amount income">+€ 2.50</div>
            </div>
            
            <div className="transaction-item">
              <div className="transaction-icon outcome">-</div>
              <div className="transaction-details">
                <div className="transaction-desc">Ricarica Telefono</div>
                <div className="transaction-date">Ieri, 09:15</div>
              </div>
              <div className="transaction-amount outcome">-€ 10.00</div>
            </div>
            
            <div className="transaction-item">
              <div className="transaction-icon income">+</div>
              <div className="transaction-details">
                <div className="transaction-desc">Bonus Accumulo</div>
                <div className="transaction-date">2 giorni fa</div>
              </div>
              <div className="transaction-amount income">+€ 5.00</div>
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="settings-section">
          <button className="settings-btn" onClick={logout}>
            <span className="settings-icon">🚪</span>
            <span>DISCONNETTI</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="phone-signup">
      <div className="signup-container">
        <div className="signup-header">
          <h3 className="signup-title">ACCESSO RAPIDO</h3>
          <div className="signup-subtitle">
            <div className="glitch-text" data-text="REGISTRAZIONE SICURA">
              REGISTRAZIONE SICURA
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="progress-bar">
          <div className="progress-track">
            {[1, 2, 3].map((num) => (
              <div key={num} className="progress-segment">
                <div className={`progress-node ${step >= num ? 'active' : ''} ${step === num ? 'current' : ''}`}>
                  <span className="node-number">{num}</span>
                </div>
                {num < 3 && (
                  <div className={`progress-connector ${step > num ? 'active' : ''}`}>
                    <div className="connector-fill"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="progress-labels">
            <span className={step >= 1 ? 'active' : ''}>TELEFONO</span>
            <span className={step >= 2 ? 'active' : ''}>NICKNAME</span>
            <span className={step >= 3 ? 'active' : ''}>VERIFICA</span>
          </div>
        </div>

        {/* Step Content */}
        <div className={`step-content ${isAnimating ? 'animating' : ''}`}>
          {step === 1 && (
            <div className="step-panel">
              <div className="step-header">
                <div className="step-icon">📱</div>
                <div className="step-info">
                  <h4 className="step-title">NUMERO DI TELEFONO</h4>
                  <p className="step-desc">Inserisci il tuo numero per ricevere il codice OTP</p>
                </div>
              </div>

              <div className="input-group">
                <label className="input-label">NUMERO TELEFONO</label>
                <div className="input-wrapper">
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+39 123 456 7890"
                    className={errors.phone ? 'error' : ''}
                  />
                  {errors.phone && (
                    <div className="error-message">{errors.phone}</div>
                  )}
                </div>
              </div>

              <button 
                className="step-btn"
                onClick={sendOTP}
                disabled={loading}
              >
                {loading ? 'INVIO IN CORSO...' : 'INVIA OTP'}
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="step-panel">
              <div className="step-header">
                <div className="step-icon">👤</div>
                <div className="step-info">
                  <h4 className="step-title">SCEGLI NICKNAME</h4>
                  <p className="step-desc">Come vuoi essere identificato nel sistema?</p>
                </div>
              </div>

              <div className="input-group">
                <label className="input-label">NICKNAME</label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    placeholder="IlTuoNickname"
                    className={errors.nickname ? 'error' : ''}
                  />
                  {errors.nickname && (
                    <div className="error-message">{errors.nickname}</div>
                  )}
                </div>
                <div className="input-hint">
                  Min 3 caratteri • Solo lettere, numeri, _ e -
                </div>
              </div>

              <div className="step-buttons">
                <button className="step-btn secondary" onClick={prevStep}>
                  INDIETRO
                </button>
                <button className="step-btn" onClick={nextStep}>
                  CONTINUA
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="step-panel">
              <div className="step-header">
                <div className="step-icon">🔐</div>
                <div className="step-info">
                  <h4 className="step-title">VERIFICA TELEFONO</h4>
                  <p className="step-desc">Inserisci il codice OTP ricevuto via SMS</p>
                </div>
              </div>

              <div className="input-group">
                <label className="input-label">CODICE OTP</label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="123456"
                    maxLength="6"
                    className={errors.otp ? 'error' : ''}
                  />
                  {errors.otp && (
                    <div className="error-message">{errors.otp}</div>
                  )}
                </div>
                <div className="input-hint">
                  Codice a 6 cifre inviato al {phone}
                </div>
              </div>

              <div className="step-buttons">
                <button className="step-btn secondary" onClick={prevStep}>
                  INDIETRO
                </button>
                <button 
                  className="step-btn"
                  onClick={registerUser}
                  disabled={loading}
                >
                  {loading ? 'VERIFICA IN CORSO...' : 'COMPLETA REGISTRAZIONE'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}