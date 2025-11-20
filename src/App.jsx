import { useState, useEffect } from "react";
import "./App.css";
import { db, auth, provider } from "./firebase";

function App() {
  const [steps, setSteps] = useState(0);
  const [points, setPoints] = useState(0);
  const [money, setMoney] = useState(0); // 換金額
  const [activeTab, setActiveTab] = useState("home");

  useEffect(() => {
    console.log(db, auth, provider);
  }, []);

  const addSteps = () => setSteps(steps + 100);

  const watchAd = () => {
    if (steps >= 100) {
      setPoints(points + 10);
      setSteps(steps - 100);
      alert("広告視聴完了！10ポイント獲得、歩数100消費");
    }
  };

  const getStepColor = () => {
    if (steps < 200) return "#f97316";
    if (steps < 400) return "#facc15";
    return "#22c55e";
  };

  const getPointColor = () => {
    if (points < 500) return "#3b82f6";
    if (points < 800) return "#8b5cf6";
    return "#ef4444";
  };

  const renderContent = () => {
    if (activeTab === "home") {
      return (
        <>
          <div className="card">
            <p style={{ color: "#000" }}>歩数: {steps}</p>
            <div className="progress-container">
              <div
                className="progress-bar"
                style={{
                  width: `${Math.min(steps, 500) / 5}%`,
                  backgroundColor: getStepColor(),
                }}
              ></div>
            </div>
            <button onClick={addSteps}>100歩増やす</button>
          </div>

          <div className="card">
            <p style={{ color: "#000" }}>ポイント: {points}</p>
            <div className="progress-container">
              <div
                className="progress-bar"
                style={{
                  width: `${Math.min(points, 1000) / 10}%`,
                  backgroundColor: getPointColor(),
                }}
              ></div>
            </div>
            {steps >= 100 ? (
              <button onClick={watchAd}>広告を見る (+10ポイント, -100歩)</button>
            ) : (
              <button className="disabled" disabled>
                歩数不足で広告視聴不可
              </button>
            )}
          </div>
        </>
      );
    } else if (activeTab === "exchange") {
      return (
        <div className="card">
          <h2 style={{ color: "#000" }}>交換所</h2>
          <p style={{ color: "#000" }}>ポイント: {points}</p>
          <p style={{ color: "#000" }}>換金額: {money}円</p>
          {points >= 1000 ? (
            <button
              onClick={() => {
                setPoints(points - 1000);
                setMoney(money + 10);
                alert("1000ポイントで10円分PayPayに交換しました！");
              }}
            >
              1000ポイントで10円分PayPay交換
            </button>
          ) : (
            <button className="disabled" disabled>
              ポイントが不足しています
            </button>
          )}
        </div>
      );
    } else if (activeTab === "account") {
      return (
        <div className="card">
          <h2 style={{ color: "#000" }}>アカウント情報</h2>
          <p style={{ color: "#000" }}>ユーザー名: デモユーザー</p>
          <p style={{ color: "#000" }}>現在の歩数: {steps}</p>
          <p style={{ color: "#000" }}>ポイント: {points}</p>
          <p style={{ color: "#000" }}>換金額: {money}円</p>
        </div>
      );
    }
  };

  return (
    <div className="App" style={{ position: "relative" }}>
      {/* 右上に文字として表示 */}
      <div className="status-label" style={{ color: "#000" }}>
        歩数: {steps} | ポイント: {points} | 換金額: {money}円
      </div>

      <div className="main-content">{renderContent()}</div>

      <div className="footer">
        <button
          className={activeTab === "home" ? "active" : ""}
          onClick={() => setActiveTab("home")}
        >
          ホーム
        </button>
        <button
          className={activeTab === "exchange" ? "active" : ""}
          onClick={() => setActiveTab("exchange")}
        >
          交換所
        </button>
        <button
          className={activeTab === "account" ? "active" : ""}
          onClick={() => setActiveTab("account")}
        >
          アカウント
        </button>
      </div>
    </div>
  );
}

export default App;
