import React from "react"

export default function FieldPosition() {
  const fieldRadius = 75
  const pitchWidth = 10
  const pitchHeight = 30
  const infieldRadius = 30

  const infieldPath = [
    "M", -infieldRadius, -pitchHeight / 2,
    "A", infieldRadius, infieldRadius, 0, 0, 1, infieldRadius, -pitchHeight / 2,
    "V", pitchHeight / 2,
    "A", infieldRadius, infieldRadius, 0, 0, 1, -infieldRadius, pitchHeight / 2,
    "Z"
  ]

  return (
    <div className="box">
      <svg width="100%" height="100%" viewBox={`-${fieldRadius} -${fieldRadius} ${fieldRadius*2} ${fieldRadius*2}`} preserveAspectRatio="xMinYMin meet">
        <circle cx="0" cy="0" r={fieldRadius} fill="green" />
        <rect x={-pitchWidth / 2} y={-pitchHeight / 2} width={pitchWidth} height={pitchHeight} fill="#d3bc5f" />
        <path d={infieldPath.join(" ")} stroke="#ffe680" strokeDasharray="2,2" fill="none" strokeWidth="0.7" />
      </svg>
    </div>
  )
}