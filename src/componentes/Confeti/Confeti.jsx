import { useMemo } from 'react'
import './Confeti.css'

const COLORES = ['#8B1E2D', '#101E35', '#C5A982', '#C82D46', '#F2E8DC']
const CANTIDAD = 36

// Explosión de papelitos. Para dispararla de nuevo, cambiale la "key" al componente.
function Confeti() {
  const piezas = useMemo(
    () =>
      Array.from({ length: CANTIDAD }, (_, i) => ({
        id: i,
        color: COLORES[i % COLORES.length],
        dx: `${Math.round((Math.random() - 0.5) * 320)}px`, // hacia los costados
        sube: `${Math.round(-80 - Math.random() * 120)}px`, // cuánto sube
        baja: `${Math.round(120 + Math.random() * 160)}px`, // cuánto cae
        giro: `${Math.round((Math.random() - 0.5) * 720)}deg`,
        demora: `${Math.random() * 0.15}s`,
        redondo: i % 3 === 0,
      })),
    []
  )

  return (
    <div className="confeti" aria-hidden="true">
      {piezas.map((p) => (
        <span
          key={p.id}
          className={`confeti__pieza ${p.redondo ? 'confeti__pieza--redonda' : ''}`}
          style={{
            '--c': p.color,
            '--dx': p.dx,
            '--sube': p.sube,
            '--baja': p.baja,
            '--giro': p.giro,
            animationDelay: p.demora,
          }}
        />
      ))}
    </div>
  )
}

export default Confeti