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
        boxShadow: "0 0 4px hsla(0, 0.00%, 0.00%, 0.47)",
      }}
    >
      <section
        style={{
          background: "#eee",
          borderRadius: "5px 5px 0 0",
          padding: "0.7rem",
          fontSize: "13px",
        }}
      >
        {selectIdx}
      </section>
      <section
        style={{
          padding: "0.7rem",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              background: colors.histogram,
            }}
          />
          <strong style={{ fontSize: "13px" }}>
            {histogramData[selectIdx].toLocaleString()}
          </strong>
        </div>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              background: colors.entropy,
            }}
          />
          <strong style={{ fontSize: "13px" }}>
            {entropyData[selectIdx].toLocaleString()}
          </strong>
        </div>
      </section>
    </div>
  );
}
