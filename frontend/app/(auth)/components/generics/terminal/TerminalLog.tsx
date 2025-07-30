import { EventData } from "@/(auth)/dashboard/types";
import React, { useEffect, useLayoutEffect, useRef } from "react";

interface TerminalLogProps {
  logs: EventData[];
}

const formatTimestamp = (ts: number) => {
  const date = new Date(ts);
  const pad = (n: number) => n.toString().padStart(2, "0");

  const MM = pad(date.getMonth() + 1);
  const DD = pad(date.getDate());
  const YYYY = date.getFullYear();
  const HH = pad(date.getHours());
  const mm = pad(date.getMinutes());
  const ss = pad(date.getSeconds());

  return `${MM}-${DD}-${YYYY}-${HH}:${mm}:${ss}`;
};

const TerminalLog: React.FC<TerminalLogProps> = ({ logs }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [logs]);


  return (
    <div
      ref={containerRef}
      style={{
        backgroundColor: "#000",
        color: "#0f0",
        padding: "1rem",
        fontFamily: "monospace",
        height: "200px",
        overflowY: "scroll",
        borderRadius: "8px",
        border: "1px solid #0f0",
      }}
    >
      {logs.map((log, index) => (
        <div key={index}>
          {formatTimestamp(log.timestamp)}: <br />
          &#123;
          <br />
          &nbsp;&nbsp;event: {log.eventType} 
          <br />
          &nbsp;&nbsp;metadata:{" "}
          {JSON.stringify(log.metadata, null, 2)
            .split("\n")
            .map((line, i) => (
              <div key={i}>&nbsp;&nbsp;&nbsp;&nbsp;{line}</div>
            ))}
          &#125;
        </div>
      ))}
    </div>
  );
};

export default TerminalLog;
