import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BG_URL =
  "https://www.myfreetextures.com/wp-content/uploads/2014/11/Deep-Blue-Abstract-Background.jpg";

const decodeTrade = (s) => {
  try {
    return JSON.parse(decodeURIComponent(escape(atob(s))));
  } catch {
    return null;
  }
};

const formatCurrency = (n) => {
  const v = parseFloat(n);
  if (isNaN(v)) return "US$0.00";
  const s = v < 0 ? "-" : "";
  return `${s}US$${Math.abs(v).toFixed(2)}`;
};

const tone = (v) => (v > 0 ? "pos" : v < 0 ? "neg" : "neu");

export default function TradeShare() {
  const [trade, setTrade] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const encoded = params.get("t");
    if (encoded) {
      const data = decodeTrade(encoded);
      setTrade(data);
      setTimeout(() => setLoaded(true), 200);
    }
  }, []);

  const floaty = {
    initial: { opacity: 0, y: 16, scale: 0.96 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { type: "spring", stiffness: 220, damping: 22 },
  };

  if (!trade) {
    return (
      <div className="app">
        <div className="bg" />
        <div className="bg-layer" />
        <div className="center-text">Invalid or missing trade data ❌</div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="bg" />
      <div className="bg-layer" />

      <AnimatePresence>
        {loaded && (
          <motion.div className="glass-card" {...floaty}>
            <div className="header">
              <div className="glass-pill">Trade Summary</div>
            </div>

            <div className="trade-box">
              <div className="row">
                <div className="label">Date:</div>
                <div className="value">{trade.date}</div>
              </div>

              <div className="row">
                <div className="label">P&L:</div>
                <div className={`value ${tone(+trade.pnl)}`}>
                  {formatCurrency(trade.pnl)}
                </div>
              </div>

              <div className="row">
                <div className="label">Duration:</div>
                <div className="value">{trade.duration || "—"}</div>
              </div>

              <div className="row notes">
                <div className="label">Notes:</div>
                <div className="value">
                  {trade.notes ? trade.notes : "No notes provided"}
                </div>
              </div>

              {trade.image && (
                <div className="image-box">
                  <img
                    src={trade.image}
                    alt="Trade Screenshot"
                    className="trade-img"
                  />
                </div>
              )}
            </div>

            <div className="footer">
              <motion.a
                href="/"
                className="btn-outline"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                Back to Calendar
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        :root{ --glass-bg: rgba(255,255,255,0.14); --glass-border: rgba(255,255,255,0.62); --text:#0b1013; }
        *{ box-sizing: border-box; }
        body{ margin:0; }
        .app{ min-height:100vh; position:relative; font-family:Inter,sans-serif; color:var(--text); }
        .bg{ position:fixed; inset:0; background:url('${BG_URL}') center/cover no-repeat; z-index:0; }
        .bg-layer{ position:fixed; inset:0; background:rgba(255,255,255,0.05); z-index:1; }
        .glass-card{ position:relative; z-index:2; max-width:700px; margin:60px auto; padding:22px; border-radius:24px;
          background: var(--glass-bg); border:1px solid var(--glass-border);
          box-shadow:0 24px 60px rgba(8,17,28,0.26), inset 0 1px 0 rgba(255,255,255,0.92);
          backdrop-filter: blur(18px); }
        .header{ display:flex; justify-content:center; margin-bottom:20px; }
        .glass-pill{ border-radius:18px; padding:10px 20px; background:rgba(255,255,255,0.2); border:1px solid var(--glass-border); font-weight:900; }
        .trade-box{ display:flex; flex-direction:column; gap:10px; }
        .row{ display:flex; justify-content:space-between; align-items:flex-start; background:rgba(255,255,255,0.12);
          border:1px solid rgba(255,255,255,0.5); border-radius:12px; padding:10px 14px; font-weight:600; }
        .row.notes{ flex-direction:column; }
        .label{ color:#173244; font-size:13px; font-weight:800; margin-bottom:4px; }
        .value{ font-weight:700; font-size:16px; }
        .value.pos{ color:#16a34a; }
        .value.neg{ color:#dc2626; }
        .image-box{ margin-top:16px; text-align:center; }
        .trade-img{ border-radius:16px; max-width:100%; box-shadow:0 12px 28px rgba(0,0,0,0.25); }
        .footer{ display:flex; justify-content:center; margin-top:20px; }
        .btn-outline{ padding:10px 20px; border-radius:16px; background:rgba(255,255,255,0.15); border:1px solid rgba(0,0,0,0.3);
          color:#0b1013; text-decoration:none; font-weight:800; box-shadow:0 10px 24px rgba(8,17,28,0.15), inset 0 1px 0 rgba(255,255,255,0.8); }
        .center-text{ position:relative; z-index:2; text-align:center; padding-top:40vh; font-size:18px; font-weight:700; }
      `}</style>
    </div>
  );
}
