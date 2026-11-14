// Decorative rotating mandala (pure SVG, uses currentColor)
export default function Mandala({ className = '' }) {
  const rings = [
    { n: 24, r: 470, len: 26, w: 1 }, { n: 16, r: 390, len: 70, w: 1.2 },
    { n: 12, r: 300, len: 90, w: 1.4 }, { n: 8, r: 200, len: 80, w: 1.6 },
  ]
  return (
    <svg viewBox="-500 -500 1000 1000" className={className} fill="none" stroke="currentColor" aria-hidden="true">
      {[480, 420, 330, 230, 120].map((r) => <circle key={r} r={r} strokeWidth=".8" strokeDasharray={r % 3 ? '' : '3 7'} />)}
      {rings.map((g) =>
        Array.from({ length: g.n }, (_, i) => (
          <g key={g.r + '-' + i} transform={`rotate(${(360 / g.n) * i}) translate(0 -${g.r})`}>
            <path strokeWidth={g.w} d={`M0 0 C ${g.len / 2.2} ${g.len * 0.35}, ${g.len / 2.2} ${g.len * 0.8}, 0 ${g.len} C ${-g.len / 2.2} ${g.len * 0.8}, ${-g.len / 2.2} ${g.len * 0.35}, 0 0Z`} />
          </g>
        )),
      )}
    </svg>
  )
}
