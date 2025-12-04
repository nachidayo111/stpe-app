import { useState } from "react";
import "./App.css";
import shoeChar from "./assets/bed183fd-2ea7-491c-9b9c-2a5e73fc9da8.png";

function App() {
  const [steps, setSteps] = useState(0);
  const [points, setPoints] = useState(0);
  const [money, setMoney] = useState(0);
  const [activeTab, setActiveTab] = useState("home");
  const [username, setUsername] = useState("デモユーザー"); // 初期ユーザー名
  const [newUsername, setNewUsername] = useState(""); // 入力用

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
            <p>歩数: {steps}</p>
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
            {/* テスト用ポイント追加ボタン */}
            <button
              style={{ backgroundColor: "#ef4444", marginTop: "0.5rem" }}
              onClick={() => {
                setPoints(points + 10000);
                alert("テスト用に10000ポイント付与しました！");
              }}
            >
              テスト用 +10000ポイント
            </button>
          </div>

          <div className="card">
            <p>ポイント: {points}</p>
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
          <h2>交換所</h2>
          <p>ポイント: {points}</p>
          <p>換金額: {money}円</p>
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
          <h2>アカウント情報</h2>
          <p>ユーザー名: {username}</p>
          <p>現在の歩数: {steps}</p>
          <p>ポイント: {points}</p>
          <p>換金額: {money}円</p>

          <hr style={{ margin: "1rem 0" }} />

          {/* アカウント登録フォーム */}
          <h3>アカウント登録 / 名前変更</h3>
          <input
            type="text"
            placeholder="新しいユーザー名"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            style={{ padding: "0.5rem", borderRadius: "8px", width: "100%" }}
          />
          <button
            style={{ marginTop: "0.5rem" }}
            onClick={() => {
              if (newUsername.trim() === "") {
                alert("ユーザー名を入力してください");
                return;
              }
              setUsername(newUsername);
              setNewUsername("");
              alert("ユーザー名を更新しました！");
            }}
          >
            登録 / 更新
          </button>
        </div>
      );
    }
  };

  return (
    <div className="App" style={{ position: "relative", minHeight: "100vh" }}>
      {/* 背景キャラクター（全画面、うっすら表示） */}
      <img
        src={shoeChar}
        alt="背景キャラクター"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.2,
          zIndex: 0,
        }}
      />

      {/* ステータス表示 */}
      <div className="status-label" style={{ position: "relative", zIndex: 1 }}>
        歩数: {steps} | ポイント: {points} | 換金額: {money}円
      </div>

      {/* メインコンテンツ */}
      <div className="main-content" style={{ position: "relative", zIndex: 1 }}>
        {renderContent()}
      </div>

      {/* フッター（固定） */}
      <div className="footer" style={{ zIndex: 1 }}>
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
