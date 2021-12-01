import "../../css/threedot.css";

export function ThreeDot() {
  return (
    <div className="chat-bubble">
      <div className="typing">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
    </div>
  );
}

export function ThreeDotConv() {
  return (
    <div className="conv-bubble">
      <div className="typing">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
    </div>
  );
}
