import React, { useState } from "react";

function ShowText() {
  const [showText, setShowText] = useState(false);
  return (
    <div>
      <h2>No test show</h2>
      {showText && <h3>boooooooooooow</h3>}
      {!showText && <button onClick={() => setShowText(true)}>show</button>}
    </div>
  );
}

export default ShowText;
