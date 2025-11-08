<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>P-L Calendar — Inline Preview</title>

  <!-- React + Framer Motion -->
  <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/framer-motion@10.16.4/dist/framer-motion.umd.js"></script>
  <!-- Babel lets browser handle JSX -->
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

  <style>
    body {
      margin: 0;
      background: url("https://www.myfreetextures.com/wp-content/uploads/2014/11/Deep-Blue-Abstract-Background.jpg") center/cover no-repeat;
      font-family: Inter, sans-serif;
      color: #0b1013;
    }
    .container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 24px;
    }
    .glass-card {
      background: rgba(255, 255, 255, 0.14);
      border: 1px solid rgba(255, 255, 255, 0.62);
      border-radius: 22px;
      padding: 16px;
      box-shadow: 0 22px 58px rgba(8,17,28,0.16), inset 0 1px 0 rgba(255,255,255,0.88);
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }
    .calendar {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 10px;
    }
    .day {
      border-radius: 18px;
      padding: 12px;
      background: rgba(255,255,255,0.14);
      border: 1px solid rgba(255,255,255,0.62);
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.92);
      text-align: center;
      cursor: pointer;
      min-height: 100px;
      color: #fff;
    }
    .day:hover {
      background: rgba(255,255,255,0.2);
    }
  </style>
</head>
<body>
  <div id="root"></div>

  <script type="text/babel">
    const { motion } = window['framer-motion'];

    function TradeCalendar() {
      const days = ["Su","Mo","Tu","We","Th","Fr","Sa"];
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth();
      const first = new Date(year, month, 1);
      const last = new Date(year, month + 1, 0);
      const blanks = Array(first.getDay()).fill(null);
      const dates = Array.from({length:last.getDate()}, (_,i)=>i+1);
      const grid = [...blanks, ...dates];

      return (
        <div className="container">
          <motion.div
            className="glass-card"
            initial={{opacity:0,y:10}}
            animate={{opacity:1,y:0}}
            transition={{type:"spring",stiffness:180,damping:18}}
          >
            <div className="header">
              <h2>{now.toLocaleString('default',{month:'long'})} {year}</h2>
            </div>
            <div className="calendar">
              {days.map(d=><div key={d} style={{fontWeight:"bold",color:"#173244"}}>{d}</div>)}
              {grid.map((d,i)=>(
                <motion.div key={i} className="day" whileHover={{scale:1.05}} whileTap={{scale:0.96}}>
                  {d || ""}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      );
    }

    ReactDOM.createRoot(document.getElementById("root")).render(<TradeCalendar />);
  </script>
</body>
</html>
