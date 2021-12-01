import "../../css/threedot.css";

export default function ThreeDot() {
  return (
    <div className="chat-bubble ml-2">
      <div className="typing">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
    </div>
  );
}
