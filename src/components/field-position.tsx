import React, { MouseEventHandler } from "react"
import { Position } from "../types"

export default function FieldPosition({ x, y, setPosition } : { x?: number, y?: number, setPosition?: (p: Position) => void}) {
  const fieldRadius = 75
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
    console.log(e)
    const svg: HTMLElement = e.target.closest('svg')
    const svgRect = svg.getBoundingClientRect()
    console.log(svgRect)
    const clientX = e.clientX - svgRect.left
    const clientY = e.clientY - svgRect.top

    const newPosition = {
      x: clientX / svgRect.width * 200 - 100,
      y: clientY / svgRect.height * 200 - 100
    }
    console.log(newPosition)

    setPosition(newPosition)
  }

  return (
    <div className="image m-4">
      <svg width="100%" height="100%" viewBox={`-${fieldRadius} -${fieldRadius} ${fieldRadius*2} ${fieldRadius*2}`} preserveAspectRatio="xMinYMin meet" onClick={onClick}>
        <circle cx="0" cy="0" r={fieldRadius} fill="green" />
        <rect x={-pitchWidth / 2} y={-pitchHeight / 2} width={pitchWidth} height={pitchHeight} fill="#d3bc5f" />
        <path d={infieldPath.join(" ")} stroke="#ffe680" strokeDasharray="2,2" fill="none" strokeWidth="0.7" />
        <line x1="0" y1={bowlerArrowTip}
          x2="0" y2={pitchHeight / 2 - bowlerArrowPitchOverlap + bowlerArrowLength}
          stroke="black" strokeWidth="1"/>
        <polygon points={`0 ${bowlerArrowTip - 2} -2 ${bowlerArrowTip + 1} 2 ${bowlerArrowTip + 1}`} fill="black" />
        {position && (
          <>
            <line x1={position.x - 2} y1={position.y - 2} x2={position.x + 2} y2={position.y + 2} stroke="red" />
            <line x1={position.x - 2} y1={position.y + 2} x2={position.x + 2} y2={position.y - 2} stroke="red" />
          </>
        )}
      </svg>
    </div>
  )
}