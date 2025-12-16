import React, { useEffect, useState } from "react";
import PivotTableUI from "react-pivottable/PivotTableUI";
import "react-pivottable/pivottable.css";

export default function PivotPage() {
  const [rows, setRows] = useState([]);
  const [pivotState, setPivotState] = useState({});

  useEffect(() => {
    (async () => {
      const res = await fetch("http://localhost:4000/api/data");
      const data = await res.json();
      setRows(data);
    })().catch(console.error);
  }, []);

  return (
    <div style={{ padding: 16 }}>
      <h2>Postgres → react-pivottable</h2>
      <PivotTableUI
        data={rows}
        onChange={s => setPivotState(s)}
        {...pivotState}
      />
    </div>
  );
}
