import React, { MouseEventHandler } from "react"
import { Position } from "../types"

export default function FieldPosition({ x, y, setPosition } : { x?: number, y?: number, setPosition?: (p: Position) => void}) {
  const fieldRadius = 75
  const margin = 5
  const pitchWidth = 10
  const pitchHeight = 30
  const infieldRadius = 30
  const bowlerArrowLength = 15
  const bowlerArrowPitchOverlap = 5

  const infieldPath = [
    "M", -infieldRadius, -pitchHeight / 2,
    "A", infieldRadius, infieldRadius, 0, 0, 1, infieldRadius, -pitchHeight / 2,
    "V", pitchHeight / 2,
    "A", infieldRadius, infieldRadius, 0, 0, 1, -infieldRadius, pitchHeight / 2,
    "Z"
  ]
  const bowlerArrowTip = pitchHeight / 2 - bowlerArrowPitchOverlap

  let position
  if (typeof(x) === 'number' && typeof(y) === 'number') {
    position = {x: x / 100 * fieldRadius, y: y / 100 * fieldRadius}
  }

  const onClick : MouseEventHandler<SVGSVGElement> = (e) => {
    if (!setPosition) {
      return
    }
    const svg: HTMLElement = e.target.closest('svg')
    const svgRect = svg.getBoundingClientRect()
    const clientX = e.clientX - svgRect.left
    const clientY = e.clientY - svgRect.top

    // Between 0 and 1, relative to SVG
    const svgX = (e.clientX - svgRect.left) / svgRect.width
    const svgY = (e.clientY - svgRect.top) / svgRect.height

    // field ratio
    const marginLeft = margin / (fieldRadius + margin) / 2

    const fieldX = (svgX - marginLeft) / (1 - marginLeft*2)
    const fieldY = (svgY - marginLeft) / (1 - marginLeft*2)

    const newPosition = {
      x: fieldX * 200 - 100,
      y: fieldY * 200 - 100
    }
    console.log(newPosition)

    setPosition(newPosition)
  }

  return (
    <div className="image">
      <svg width="100%" height="100%" viewBox={`-${fieldRadius + margin} -${fieldRadius + margin} ${(fieldRadius + margin)*2} ${(fieldRadius  + margin)*2}`} preserveAspectRatio="xMinYMin meet" onClick={onClick}>
        <circle cx="0" cy="0" r={fieldRadius} fill="var(--bulma-success-40)" />
        <rect x={-pitchWidth / 2} y={-pitchHeight / 2} width={pitchWidth} height={pitchHeight} fill="var(--bulma-warning-70)" />
        <path d={infieldPath.join(" ")} stroke="var(--bulma-warning-70)" strokeDasharray="3,1" fill="none" strokeWidth="0.7" />
        <line x1="0" y1={bowlerArrowTip}
          x2="0" y2={pitchHeight / 2 - bowlerArrowPitchOverlap + bowlerArrowLength}
          stroke="black" strokeWidth="1"/>
        <polygon points={`0 ${bowlerArrowTip - 2} -2 ${bowlerArrowTip + 1} 2 ${bowlerArrowTip + 1}`} fill="black" />
        {position && (
          <>
            <line x1={position.x - 2} y1={position.y - 2} x2={position.x + 2} y2={position.y + 2} stroke="var(--bulma-primary)" />
            <line x1={position.x - 2} y1={position.y + 2} x2={position.x + 2} y2={position.y - 2} stroke="var(--bulma-primary)" />
          </>
        )}
      </svg>
    </div>
  )
}