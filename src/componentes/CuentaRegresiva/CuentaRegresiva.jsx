import { useEffect, useState } from 'react'
import './CuentaRegresiva.css'

// Fecha real del evento: 26/12/2026 a las 20:45 (hora de Argentina)
const FECHA_EVENTO = new Date('2026-12-26T20:45:00-03:00').getTime()

function calcularTiempo() {
  const resta = Math.max(0, FECHA_EVENTO - Date.now())
  return {
    dias: Math.floor(resta / (1000 * 60 * 60 * 24)),
    horas: Math.floor((resta / (1000 * 60 * 60)) % 24),
    minutos: Math.floor((resta / (1000 * 60)) % 60),
    segundos: Math.floor((resta / 1000) % 60),
    termino: resta === 0,
  }
}

// Agrega un 0 adelante: 7 → "07"
const dosDigitos = (n) => String(n).padStart(2, '0')

function CuentaRegresiva() {
  const [tiempo, setTiempo] = useState(calcularTiempo)

  useEffect(() => {
    const intervalo = setInterval(() => setTiempo(calcularTiempo()), 1000)
    return () => clearInterval(intervalo) // limpia al desmontar
  }, [])

  if (tiempo.termino) {
    return (
      <div className="cuenta">
        <p className="titulo cuenta__final">¡Llegó la noche!</p>
      </div>
    )
  }

  const bloques = [
    { valor: tiempo.dias, texto: 'Días' },
    { valor: dosDigitos(tiempo.horas), texto: 'Horas' },
    { valor: dosDigitos(tiempo.minutos), texto: 'Min' },
    { valor: dosDigitos(tiempo.segundos), texto: 'Seg' },
  ]

  return (
    <div className="cuenta">
      <p className="cuenta__etiqueta">Faltan</p>
      <div className="cuenta__grilla">
        {bloques.map((bloque) => (
          <div className="cuenta__bloque" key={bloque.texto}>
            <span className="titulo cuenta__numero">
              {/* key cambia con el valor → el número "late" cada vez que cambia */}
              <span className="cuenta__digitos" key={bloque.valor}>
                {bloque.valor}
              </span>
            </span>
            <span className="cuenta__texto">{bloque.texto}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CuentaRegresiva