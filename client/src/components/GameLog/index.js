import React, { useEffect, useState } from "react";
import { useGameContext } from "../../utils/GlobalState";

const Style = {
  battleLog: {
    resize: "none",
    width: "95%",
  },
};

const GameLog = () => {
  const [state, dispatch] = useGameContext();
  const logRef = React.useRef(null);
  useEffect(() => {
    logRef.current.value += `${state.lastMessage} \n`;
    logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [state.lastMessage]);
  useEffect(()=>{
    logRef.current.value = "";
    logRef.current.scrollTop = logRef.current.scrollHeight;
  },[state.inDungeon]);
  return (
    <>
      <div>
        <textarea
          className="battle-log"
          id="battleLog"
          style={Style.battleLog}
          ref={logRef}
          readOnly
        ></textarea>
      </div>
    </>
  );
};
export default GameLog;
