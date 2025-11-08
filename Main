import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ===== Config =====
const BG_URL =
  "https://www.myfreetextures.com/wp-content/uploads/2014/11/Deep-Blue-Abstract-Background.jpg";
const LS_KEY = "tradecalendar_inline_v7";
const ROW_H = 118;

const uid = () => Math.random().toString(36).slice(2, 9);
const toISO = (d) =>
  new Date(d.getTime() - d.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 10);
const endOfMonth = (d) => new Date(d.getFullYear(), d.getMonth() + 1, 0);
const months = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];
const weekDays = ["Su","Mo","Tu","We","Th","Fr","Sa"];

const formatCurrency = (n) => {
  const v = parseFloat(n);
  if (isNaN(v)) return "US$0.00";
  const s = v < 0 ? "-" : "";
  return `${s}US$${Math.abs(v).toFixed(2)}`;
};

const encodeTrade = (t) => {
  try { return btoa(unescape(encodeURIComponent(JSON.stringify(t)))); } catch { return ""; }
};
const decodeTrade = (s) => {
  try { return JSON.parse(decodeURIComponent(escape(atob(s)))); } catch { return null; }
};

function getCalendarGrid(year, month) {
  const first = new Date(year, month, 1);
  const last = endOfMonth(first);
  const startDay = first.getDay();
  const totalDays = last.getDate();
  const cells = [];
  for (let i = 0; i < startDay; i++) cells.push(null);
  for (let d = 1; d <= totalDays; d++) cells.push(new Date(year, month, d));
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

const aggByDate = (trades) => {
  const map = {};
  Object.values(trades).forEach((t) => {
    if (!t || !t.date) return;
    (map[t.date] ||= []).push(t);
  });
  return map;
};

const tone = (v) => (v > 0 ? "pos" : v < 0 ? "neg" : "neu");

export default function TradeCalendarMain() {
  const today = useMemo(() => new Date(), []);
  const [viewDate, setViewDate] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [trades, setTrades] = useState(() => {
    try { const r = localStorage.getItem(LS_KEY); return r ? JSON.parse(r) : {}; } catch { return {}; }
  });

  const [modal, setModal] = useState({ open: false, trade: null, date: null, shared: false });
  const [share, setShare] = useState({ open: false, link: "" });
  const [toast, setToast] = useState("");

  useEffect(() => {
    try { localStorage.setItem(LS_KEY, JSON.stringify(trades)); } catch {}
  }, [trades]);

  const grid = useMemo(() => getCalendarGrid(viewDate.getFullYear(), viewDate.getMonth()), [viewDate]);
  const byDate = useMemo(() => aggByDate(trades), [trades]);
  const rows = useMemo(()=>{ const out=[]; for(let i=0;i<grid.length;i+=7){ out.push(grid.slice(i,i+7)); } return out; }, [grid]);

  const openAdd = (iso) =>
    setModal({
      open: true,
      trade: { id: uid(), date: iso, pnl: "", notes: "", duration: "", image: "" },
      date: iso,
      shared: false,
    });

  const openEdit = (t) =>
    setModal({ open: true, trade: { ...t }, date: t.date, shared: false });

  const saveTrade = (t) => {
    setTrades((s) => ({ ...s, [t.id]: t }));
    closeModal();
    ping("Saved");
  };

  const deleteTrade = (id) => {
    setTrades((s) => {
      const c = { ...s };
      delete c[id];
      return c;
    });
    closeModal();
    ping("Deleted");
  };

  const ping = (m) => {
    setToast(m);
    setTimeout(() => setToast(""), 1400);
  };

  const closeModal = () =>
    setModal({ open: false, trade: null, date: null, shared: false });

  const showSharePopup = (t) =>
    setShare({
      open: true,
      link: `${window.location.origin}/share?t=${encodeTrade(t)}`,
    });

  const copyShareLink = async () => {
    try {
      await navigator.clipboard.writeText(share.link);
      ping("Link copied ✅");
    } catch {
      ping("Copy failed");
    }
  };

  const press = {
    whileHover: { y: -1.5 },
    whileTap: { scale: 0.94 },
    transition: { type: "spring", stiffness: 340, damping: 20 },
  };

  const floaty = {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    transition: { type: "spring", stiffness: 220, damping: 20 },
  };

  return (
    <div className="app">
      <div className="bg" />
      <div className="bg-layer" />

      <div className="container">
        <div className="header">
          <div className="glass-pill">My Trades</div>
        </div>

        <motion.div className="glass-card" {...floaty}>
          <div className="weekday-row">
            {weekDays.map((d) => (
              <div key={d} className="weekday">{d}</div>
            ))}
          </div>

          <div className="calendar-rows">
            {rows.map((weekCells, rIdx) => (
              <div className="week-row" key={rIdx}>
                {weekCells.map((cell, idx) => {
                  if (!cell)
                    return <div key={idx} className="spacer" />;
                  const iso = toISO(cell);
                  const arr = byDate[iso] || [];
                  const total = arr.reduce((s, t) => s + (+t.pnl || 0), 0);
                  const t = tone(total);
                  return (
                    <motion.div
                      key={iso}
                      className={`tile ${t}`}
                      onClick={() => openAdd(iso)}
                      whileHover={{ y: -3, scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <div className="tile-top">
                        <div className="tile-day inner-glass">
                          {cell.getDate()}
                        </div>
                        <div className="tile-count inner-glass">
                          {arr.length} {arr.length === 1 ? "trade" : "trades"}
                        </div>
                      </div>
                      <div className={`pnl inner-glass ${t}`}>
                        {formatCurrency(total)}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Add/Edit Modal (with image + duration) */}
      <AnimatePresence>
        {modal.open && (
          <motion.div
            className="modal-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div className="modal-scrim" onClick={closeModal} />
            <motion.div
              className="modal-card"
              initial={{ y: 18, scale: 0.965, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 12, opacity: 0 }}
            >
              <div className="modal-title">Trade Details</div>
              <div className="muted">{modal.date}</div>
              <div className="form">
                <div className="inset-box">
                  <input
                    className="input-glass"
                    placeholder="Add P&L here"
                    value={modal.trade.pnl}
                    onChange={(e) =>
                      setModal((m) => ({
                        ...m,
                        trade: { ...m.trade, pnl: e.target.value },
                      }))
                    }
                  />
                </div>
                <div className="inset-box">
                  <input
                    className="input-glass"
                    placeholder="Duration (e.g. 2m 15s)"
                    value={modal.trade.duration}
                    onChange={(e) =>
                      setModal((m) => ({
                        ...m,
                        trade: { ...m.trade, duration: e.target.value },
                      }))
                    }
                  />
                </div>
                <div className="inset-box">
                  <textarea
                    className="input-glass"
                    style={{ height: 100 }}
                    placeholder="Add notes here…"
                    value={modal.trade.notes}
                    onChange={(e) =>
                      setModal((m) => ({
                        ...m,
                        trade: { ...m.trade, notes: e.target.value },
                      }))
                    }
                  />
                </div>
                <div className="inset-box">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () =>
                          setModal((m) => ({
                            ...m,
                            trade: { ...m.trade, image: reader.result },
                          }));
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                  {modal.trade.image && (
                    <img
                      src={modal.trade.image}
                      alt="Preview"
                      style={{ marginTop: 10, borderRadius: 12, width: "100%" }}
                    />
                  )}
                </div>
              </div>
              <div className="actions">
                <motion.button
                  className="btn-ghost"
                  {...press}
                  onClick={() =>
                    setShare({
                      open: true,
                      link: `${window.location.origin}/share?t=${encodeTrade(
                        modal.trade
                      )}`,
                    })
                  }
                >
                  Share
                </motion.button>
                <div style={{ flex: 1 }} />
                {modal.trade.id && (
                  <motion.button
                    className="btn-ghost"
                    {...press}
                    onClick={() => deleteTrade(modal.trade.id)}
                  >
                    Delete
                  </motion.button>
                )}
                <motion.button
                  className="btn-outline"
                  {...press}
                  onClick={() => saveTrade({ ...modal.trade, date: modal.date })}
                >
                  Save
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Share Popup */}
      <AnimatePresence>
        {share.open && (
          <motion.div className="modal-wrap" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="modal-scrim" onClick={() => setShare({ open: false, link: "" })} />
            <motion.div className="share-card" initial={{ y: 16, scale: 0.96, opacity: 0 }} animate={{ y: 0, scale: 1, opacity: 1 }} exit={{ y: 12, opacity: 0 }}>
              <div className="modal-title">Share Trade</div>
              <div className="muted">Copy this link:</div>
              <div className="inset-box" style={{ marginTop: 8 }}>
                <input className="input-glass" readOnly value={share.link} onFocus={(e) => e.target.select()} />
              </div>
              <div className="actions">
                <motion.button className="btn-outline" {...press} onClick={copyShareLink}>Copy Link</motion.button>
                <motion.button className="btn-ghost" {...press} onClick={() => setShare({ open: false, link: "" })}>Close</motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {toast && <div className="toast">{toast}</div>}

      <style>{`
        :root{ --glass-bg: rgba(255,255,255,0.14); --glass-border: rgba(255,255,255,0.62); --text:#0b1013; }
        *{ box-sizing: border-box; }
        body{ margin:0; }
        .app{ min-height:100vh; color:var(--text); font-family: Inter, sans-serif; }
        .bg{ position:fixed; inset:0; background:url('${BG_URL}') center/cover no-repeat; z-index:0; }
        .bg-layer{ position:fixed; inset:0; background:rgba(255,255,255,0.05); z-index:1; }
        .container{ position:relative; z-index:2; padding:24px; max-width:1200px; margin:auto; }
        .glass-card{ border-radius:22px; padding:12px; background: var(--glass-bg); border:1px solid var(--glass-border); backdrop-filter: blur(12px); }
        .glass-pill{ border-radius:16px; padding:10px 14px; background: rgba(255,255,255,0.18); border:1px solid var(--glass-border); font-weight:900; }
        .weekday-row{ display:grid; grid-template-columns:repeat(7,1fr); text-align:center; margin-bottom:6px; }
        .week-row{ display:grid; grid-template-columns:repeat(7,1fr); gap:8px; min-height:${ROW_H}px; }
        .tile{ border-radius:18px; padding:10px; background:rgba(255,255,255,0.12); border:1px solid rgba(255,255,255,0.6); color:#fff; }
        .tile.pos{ background:linear-gradient(180deg,rgba(52,211,153,0.34),rgba(16,185,129,0.26)); }
        .tile.neg{ background:linear-gradient(180deg,rgba(248,113,113,0.32),rgba(239,68,68,0.24)); }
        .tile.neu{ background:linear-gradient(180deg,rgba(255,255,255,0.18),rgba(255,255,255,0.1)); }
        .inner-glass{ background:rgba(255,255,255,0.18); border:1px solid rgba(255,255,255,0.5); border-radius:10px; padding:4px 6px; }
        .modal-wrap{ position:fixed; inset:0; display:flex; align-items:center; justify-content:center; z-index:2000; }
        .modal-scrim{ position:absolute; inset:0; background:rgba(8,17,28,0.45); }
        .modal-card,.share-card{ position:relative; z-index:2100; border-radius:20px; padding:18px; background:rgba(255,255,255,0.18); border:1px solid rgba(255,255,255,0.6); backdrop-filter:blur(24px); width:min(680px,92vw); }
        .input-glass{ width:100%; border:none; outline:none; background:transparent; padding:10px; color:#0b1013; }
        .inset-box{ border-radius:14px; background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.6); margin-top:8px; padding:6px; }
        .actions{ display:flex; justify-content:flex-end; gap:8px; margin-top:12px; }
        .btn-ghost,.btn-outline{ border-radius:14px; padding:8px 12px; font-weight:700; cursor:pointer; }
        .btn-ghost{ background:rgba(255,255,255,0.15); border:1px solid rgba(255,255,255,0.6); }
        .btn-outline{ background:rgba(255,255,255,0.1); border:1px solid #000; }
        .toast{ position:fixed; right:20px; bottom:20px; background:rgba(0,0,0,0.8); color:#fff; border-radius:10px; padding:10px 14px; }
      `}</style>
    </div>
  );
}
