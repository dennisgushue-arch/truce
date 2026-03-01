import { useState, useEffect, useRef } from 'react'

const PHASES = [
  { label: 'Breathe in…', duration: 4000 },
  { label: 'Hold…', duration: 2000 },
  { label: 'Breathe out…', duration: 6000 },
  { label: 'Hold…', duration: 2000 },
]
const TOTAL_DURATION = 90

export default function ResetTimer({ reset, color }) {
  const [secondsLeft, setSecondsLeft] = useState(TOTAL_DURATION)
  const [phaseIndex, setPhaseIndex] = useState(0)
  const [phaseProgress, setPhaseProgress] = useState(0)
  const [running, setRunning] = useState(false)
  const [done, setDone] = useState(false)
  const timerRef = useRef(null)
  const phaseRef = useRef(null)
  const phaseIntervalRef = useRef(null)

  useEffect(() => {
    return () => {
      clearInterval(timerRef.current)
      clearTimeout(phaseRef.current)
      clearInterval(phaseIntervalRef.current)
    }
  }, [])

  function startTimer() {
    setRunning(true)
    setDone(false)
    setSecondsLeft(TOTAL_DURATION)
    setPhaseIndex(0)
    setPhaseProgress(0)
    runPhase(0)
    timerRef.current = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current)
          setRunning(false)
          setDone(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  function runPhase(idx) {
    clearInterval(phaseIntervalRef.current)
    const phase = PHASES[idx % PHASES.length]
    setPhaseIndex(idx % PHASES.length)
    let elapsed = 0
    const step = 50
    phaseIntervalRef.current = setInterval(() => {
      elapsed += step
      setPhaseProgress(elapsed / phase.duration)
      if (elapsed >= phase.duration) {
        clearInterval(phaseIntervalRef.current)
        phaseRef.current = setTimeout(() => runPhase(idx + 1), 0)
      }
    }, step)
  }

  const circumference = 2 * Math.PI * 54
  const progressArc = circumference * (1 - secondsLeft / TOTAL_DURATION)

  return (
    <div className="reset-panel">
      <p className="reset-cue">{reset}</p>
      <div className="breath-circle-wrap">
        <svg viewBox="0 0 120 120" className="breath-svg">
          <circle cx="60" cy="60" r="54" className="breath-track" />
          <circle
            cx="60" cy="60" r="54"
            className="breath-progress"
            style={{
              stroke: color,
              strokeDasharray: circumference,
              strokeDashoffset: circumference - progressArc,
            }}
          />
        </svg>
        <div className="breath-inner">
          {running ? (
            <>
              <span className="breath-phase">{PHASES[phaseIndex].label}</span>
              <span className="breath-seconds">{secondsLeft}s</span>
            </>
          ) : done ? (
            <span className="breath-done">✓ Done</span>
          ) : (
            <span className="breath-start-hint">Tap Start</span>
          )}
        </div>
      </div>
      {!running && (
        <button
          className="reset-btn"
          style={{ background: color }}
          onClick={startTimer}
        >
          {done ? 'Restart 90s' : 'Start 90-sec Reset'}
        </button>
      )}
      {running && (
        <button
          className="reset-btn reset-btn--stop"
          onClick={() => {
            clearInterval(timerRef.current)
            setRunning(false)
          }}
        >
          Stop
        </button>
      )}
    </div>
  )
}
