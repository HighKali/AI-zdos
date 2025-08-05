import { useState, useEffect } from 'react';

export default function B2BConnector() {
  const [connections, setConnections] = useState({
    travel: {
      amadeus: { status: 'connected', earnings: '€1,234.56', calls: 15678 },
      booking: { status: 'connected', earnings: '€2,345.67', calls: 23456 },
      airbnb: { status: 'connected', earnings: '€567.89', calls: 8901 },
      expedia: { status: 'connected', earnings: '€890.12', calls: 12345 },
      skyscanner: { status: 'connecting', earnings: '€0.00', calls: 0 },
      kayak: { status: 'connected', earnings: '€345.67', calls: 5678 }
    },
    ecommerce: {
      amazon: { status: 'connected', earnings: '€3,456.78', calls: 45678 },
      alibaba: { status: 'connected', earnings: '€2,789.34', calls: 34567 },
      shopify: { status: 'connected', earnings: '€1,567.89', calls: 23456 },
      ebay: { status: 'connected', earnings: '€789.45', calls: 12345 },
      etsy: { status: 'connected', earnings: '€456.78', calls: 8901 }
    },
    crypto: {
      binance: { status: 'connected', earnings: '€5,678.90', calls: 67890 },
      coinbase: { status: 'connected', earnings: '€3,456.78', calls: 45678 },
      kraken: { status: 'connected', earnings: '€2,345.67', calls: 34567 },
      polygon: { status: 'connected', earnings: '€1,234.56', calls: 23456 }
    },
    financial: {
      stripe: { status: 'connected', earnings: '€4,567.89', calls: 56789 },
      paypal: { status: 'connected', earnings: '€3,456.78', calls: 45678 },
      revolut: { status: 'connected', earnings: '€2,345.67', calls: 34567 }
    }
  });

  const [totalEarnings, setTotalEarnings] = useState(0);

  useEffect(() => {
    let total = 0;
    Object.values(connections).forEach(category => {
      Object.values(category).forEach(connection => {
        if (connection.status === 'connected') {
          total += parseFloat(connection.earnings.replace('€', '').replace(',', ''));
        }
      });
    });
    setTotalEarnings(total);
  }, [connections]);

  const apiKeys = {
    travel: {
      amadeus: {
        key: "LIVE_AMADEUS_GDS_API_XYZ789",
        endpoint: "https://api.amadeus.com/v2/",
        commission: "5-8%",
        type: "Flight Search & Booking"
      },
      booking: {
        key: "LIVE_BOOKING_AFFILIATE_DEF456",
        endpoint: "https://distribution-xml.booking.com/",
        commission: "15-25%",
        type: "Hotel Reservations"
      },
      airbnb: {
        key: "LIVE_AIRBNB_PARTNER_GHI123",
        endpoint: "https://api.airbnb.com/v2/",
        commission: "3-5%",
        type: "Vacation Rentals"
      },
      expedia: {
        key: "LIVE_EXPEDIA_RAPID_JKL789",
        endpoint: "https://api.ean.com/",
        commission: "8-12%",
        type: "Travel Packages"
      },
      skyscanner: {
        key: "LIVE_SKYSCANNER_RAPID_MNO456",
        endpoint: "https://partners.api.skyscanner.net/",
        commission: "2-4%",
        type: "Flight Comparison"
      },
      kayak: {
        key: "LIVE_KAYAK_PARTNERS_PQR123",
        endpoint: "https://www.kayak.com/affiliates/",
        commission: "3-6%",
        type: "Meta Search"
      }
    },
    ecommerce: {
      amazon: {
        key: "LIVE_AMAZON_AFFILIATE_STU789",
        endpoint: "https://webservices.amazon.com/paapi5/",
        commission: "1-10%",
        type: "Product Advertising"
      },
      alibaba: {
        key: "LIVE_ALIBABA_B2B_VWX456",
        endpoint: "https://gw.open.1688.com/",
        commission: "2-8%",
        type: "Wholesale Trading"
      },
      shopify: {
        key: "LIVE_SHOPIFY_PARTNER_YZA123",
        endpoint: "https://shopify.dev/api/",
        commission: "20%",
        type: "Store Development"
      },
      ebay: {
        key: "LIVE_EBAY_DEVELOPER_BCD789",
        endpoint: "https://api.ebay.com/",
        commission: "50-70%",
        type: "Marketplace Sales"
      },
      etsy: {
        key: "LIVE_ETSY_AFFILIATE_EFG456",
        endpoint: "https://openapi.etsy.com/",
        commission: "4-6%",
        type: "Handmade Marketplace"
      }
    },
    crypto: {
      binance: {
        key: "LIVE_BINANCE_API_HIJ123",
        endpoint: "https://api.binance.com/",
        commission: "20-40%",
        type: "Crypto Exchange"
      },
      coinbase: {
        key: "LIVE_COINBASE_COMMERCE_KLM789",
        endpoint: "https://api.coinbase.com/",
        commission: "1%",
        type: "Crypto Payments"
      },
      kraken: {
        key: "LIVE_KRAKEN_API_NOP456",
        endpoint: "https://api.kraken.com/",
        commission: "25%",
        type: "Pro Trading"
      },
      polygon: {
        key: "LIVE_POLYGON_RPC_QRS123",
        endpoint: "https://polygon-rpc.com/",
        commission: "Gas Fees",
        type: "Layer 2 Scaling"
      }
    },
    financial: {
      stripe: {
        key: "LIVE_STRIPE_WEBHOOK_TUV789",
        endpoint: "https://api.stripe.com/",
        commission: "2.9% + 30¢",
        type: "Payment Processing"
      },
      paypal: {
        key: "LIVE_PAYPAL_MERCHANT_WXY456",
        endpoint: "https://api.paypal.com/",
        commission: "2.9% + 30¢",
        type: "Digital Payments"
      },
      revolut: {
        key: "LIVE_REVOLUT_BUSINESS_ZAB123",
        endpoint: "https://revolut.com/api/",
        commission: "0.5-1.5%",
        type: "Digital Banking"
      }
    }
  };

  return (
    <div className="b2b-connector">
      <div className="connector-header mb-8">
        <h2 className="cyber-title text-2xl mb-4">B2B API CONNECTORS</h2>
        <div className="earnings-display">
          <span className="total-earnings">€{totalEarnings.toLocaleString()}</span>
          <span className="earnings-label">TOTAL EARNINGS</span>
        </div>
      </div>

      {Object.entries(apiKeys).map(([category, apis]) => (
        <div key={category} className="api-category mb-8">
          <h3 className="category-title">{category.toUpperCase()} APIS</h3>
          
          <div className="api-grid">
            {Object.entries(apis).map(([platform, config]) => {
              const connection = connections[category][platform];
              return (
                <div key={platform} className="api-card">
                  <div className="api-header">
                    <div className="platform-info">
                      <h4 className="platform-name">{platform.toUpperCase()}</h4>
                      <span className={`status-badge ${connection.status}`}>
                        {connection.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="earnings-info">
                      <span className="earnings">{connection.earnings}</span>
                      <span className="calls">{connection.calls.toLocaleString()} calls</span>
                    </div>
                  </div>

                  <div className="api-details">
                    <div className="api-config">
                      <div className="config-item">
                        <span className="label">API KEY:</span>
                        <span className="value font-mono">{config.key}</span>
                      </div>
                      <div className="config-item">
                        <span className="label">ENDPOINT:</span>
                        <span className="value font-mono text-xs">{config.endpoint}</span>
                      </div>
                      <div className="config-item">
                        <span className="label">COMMISSION:</span>
                        <span className="value text-success">{config.commission}</span>
                      </div>
                      <div className="config-item">
                        <span className="label">TYPE:</span>
                        <span className="value">{config.type}</span>
                      </div>
                    </div>

                    <div className="api-actions">
                      <button className="api-btn test">
                        <span>🧪</span>
                        <span>TEST</span>
                      </button>
                      <button className="api-btn configure">
                        <span>⚙️</span>
                        <span>CONFIG</span>
                      </button>
                      <button className="api-btn analytics">
                        <span>📊</span>
                        <span>STATS</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
