"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { EventData } from "@/(auth)/dashboard/types";


interface Props {
  logs: EventData[];
}

function groupEventsByMinute(events: EventData[]) {
  const grouped: { [minute: string]: number } = {};

  events.forEach((event) => {
    const date = new Date(event.timestamp);
    const minute = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes()
    ).toISOString();

    grouped[minute] = (grouped[minute] || 0) + 1;
  });

  return Object.entries(grouped)
    .sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime())
    .map(([minute, count]) => ({
      time: new Date(minute).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      count,
    }));
}

const RequestsGraph = ({ logs }: Props) => {
  const [graphData, setGraphData] = useState<{ time: string; count: number }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setGraphData(groupEventsByMinute(logs));
    }, 10000);

    return () => clearInterval(interval);
  }, [logs]);

  return (
    <Box sx={{ height: 300, mt: 2 }}>
      <Typography sx={{ fontSize: "16px", fontWeight: "bold", mb: 1 }}>
        Requests per Minute
      </Typography>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={graphData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line type="monotone" dataKey="count" stroke="#1976d2" />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default RequestsGraph;
