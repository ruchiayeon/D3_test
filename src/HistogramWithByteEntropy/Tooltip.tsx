import React from "react";

export default function Tooltip(props: {
  histogramData: number[];
  entropyData: number[];
  selectIdx: number;
  colors: { histogram: string; entropy: string };
  tooltipRef: React.MutableRefObject<HTMLDivElement | null>;
}) {
  const { histogramData, entropyData, selectIdx, tooltipRef, colors } = props;

  return (
    <div
      ref={tooltipRef}
      style={{
        background: "white",
        borderRadius: "5px",
        boxShadow: "0 0 4px",
        padding: "1rem",
      }}
    >
      <section
        style={{
          display: "flex",
          gap: "1rem",
          justifyContent: "space-between",
        }}
      >
        <strong style={{ color: colors.histogram }}>Histogram</strong>
        <div>{histogramData[selectIdx].toLocaleString()}</div>
      </section>
      <section
        style={{
          display: "flex",
          gap: "1rem",
          justifyContent: "space-between",
        }}
      >
        <strong style={{ color: colors.entropy }}>Byte Entropy</strong>
        <div>{entropyData[selectIdx].toLocaleString()}</div>
      </section>
    </div>
  );
}
