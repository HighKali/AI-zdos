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
      if (!phone.trim()) newErrors.phone = "NUMERO TELEFONO RICHIESTO";
      if (!/^[\+]?[1-9][\d]{0,15}$/.test(phone.replace(/\s/g, ''))) {
        newErrors.phone = "FORMATO NUMERO NON VALIDO";
      }
    }
    
    if (currentStep >= 2) {
      if (!nickname.trim()) newErrors.nickname = "NICKNAME RICHIESTO";
      if (nickname.length < 3) newErrors.nickname = "NICKNAME TROPPO CORTO - MIN 3 CARATTERI";
      if (!/^[a-zA-Z0-9_-]+$/.test(nickname)) {
        newErrors.nickname = "SOLO LETTERE, NUMERI, _ E -";
      }
    }
    
    if (currentStep >= 3) {
      if (!otp.trim()) newErrors.otp = "CODICE OTP RICHIESTO";
      if (otp.length !== 6) newErrors.otp = "OTP DEVE ESSERE 6 CIFRE";
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
      // Simulate OTP sending
      await new Promise(resolve => setTimeout(resolve, 1500));
      setOtpSent(true);
      nextStep();
    } catch (error) {
      setErrors({ phone: "ERRORE INVIO OTP - RIPROVA" });
    } finally {
      setLoading(false);
    }
  };

  async function registerUser() {
    if (!validateStep(3)) return;
    
    setLoading(true);
    try {
      // Simulate OTP verification and account creation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate secure passkey
      const generatedPasskey = Math.random().toString(36).slice(2, 10).toUpperCase();
      setPasskey(generatedPasskey);
      
      const userData = { 
        phone: phone.replace(/\s/g, ''), 
        nickname, 
        registeredAt: new Date().toISOString(),
        balance: 0.00,
        rewards: 0.00,
        cashback: 0.00,
        passkey: generatedPasskey,
        verified: true
      };
      localStorage.setItem('zdos-user', JSON.stringify(userData));
      setRegistered(true);
      setStep(1);
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
                    className={`phone-input ${errors.phone ? 'error' : ''}`}
                  />
                </div>
                {errors.phone && (
                  <div className="error-message">
                    <span>⚠️</span>
                    <span>{errors.phone}</span>
                  </div>
                )}
                <div className="input-tip">
                  <span>🔒</span>
                  <span>Il tuo numero viene utilizzato solo per la verifica</span>
                </div>
              </div>

              <div className="step-actions">
                <button 
                  onClick={sendOTP} 
                  disabled={loading}
                  className="btn btn-primary btn-lg"
                >
                  {loading ? (
                    <>
                      <div className="spinner"></div>
                      <span>INVIO OTP...</span>
                    </>
                  ) : (
                    <>
                      <span>INVIA CODICE</span>
                      <span>📲</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="step-panel">
              <div className="step-header">
                <div className="step-icon">👤</div>
                <div className="step-info">
                  <h4 className="step-title">SCEGLI NICKNAME</h4>
                  <p className="step-desc">Come vuoi essere identificato nella piattaforma</p>
                </div>
              </div>

              <div className="input-group">
                <label className="input-label">NICKNAME</label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    placeholder="Il tuo nickname..."
                    className={`nickname-input ${errors.nickname ? 'error' : ''}`}
                  />
                </div>
                {errors.nickname && (
                  <div className="error-message">
                    <span>⚠️</span>
                    <span>{errors.nickname}</span>
                  </div>
                )}
                <div className="input-tip">
                  <span>💡</span>
                  <span>Puoi usare lettere, numeri, trattini e underscore</span>
                </div>
              </div>

              <div className="step-actions">
                <button onClick={prevStep} className="btn btn-secondary">
                  <span>◀️</span>
                  <span>INDIETRO</span>
                </button>
                <button onClick={nextStep} className="btn btn-primary btn-lg">
                  <span>CONTINUA</span>
                  <span>▶️</span>
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="step-panel">
              <div className="step-header">
                <div className="step-icon">🔐</div>
                <div className="step-info">
                  <h4 className="step-title">VERIFICA OTP</h4>
                  <p className="step-desc">Inserisci il codice a 6 cifre ricevuto via SMS</p>
                </div>
              </div>

              <div className="input-group">
                <label className="input-label">CODICE OTP</label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
                    placeholder="000000"
                    className={`otp-input ${errors.otp ? 'error' : ''}`}
                    maxLength="6"
                  />
                </div>
                {errors.otp && (
                  <div className="error-message">
                    <span>⚠️</span>
                    <span>{errors.otp}</span>
                  </div>
                )}
                <div className="input-tip">
                  <span>📱</span>
                  <span>Codice inviato a {phone}</span>
                </div>
              </div>

              {passkey && (
                <div className="passkey-display">
                  <div className="passkey-header">
                    <span className="passkey-icon">🔑</span>
                    <span className="passkey-title">LA TUA PASSKEY</span>
                  </div>
                  <div className="passkey-code">{passkey}</div>
                  <div className="passkey-note">
                    Salva questa passkey in un posto sicuro. Ti servirà per accedere.
                  </div>
                </div>
              )}

              <div className="step-actions">
                <button onClick={prevStep} className="btn btn-secondary">
                  <span>◀️</span>
                  <span>INDIETRO</span>
                </button>
                <button 
                  onClick={registerUser} 
                  disabled={loading}
                  className="btn btn-primary btn-lg"
                >
                  {loading ? (
                    <>
                      <div className="spinner"></div>
                      <span>VERIFICA...</span>
                    </>
                  ) : (
                    <>
                      <span>COMPLETA</span>
                      <span>✅</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {errors.general && (
          <div className="system-error">
            <div className="error-icon">⛔</div>
            <div className="error-content">
              <div className="error-title">ERRORE SISTEMA</div>
              <div className="error-desc">{errors.general}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}