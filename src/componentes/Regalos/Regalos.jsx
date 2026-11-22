import { useState } from 'react'
import './Regalos.css'

const ALIAS = 'oliviapieri.mp'

// Copia texto al portapapeles (con alternativa para celulares viejos)
async function copiarTexto(texto) {
  try {
    await navigator.clipboard.writeText(texto)
  } catch {
    const campo = document.createElement('textarea')
    campo.value = texto
    document.body.appendChild(campo)
    campo.select()
    document.execCommand('copy')
    document.body.removeChild(campo)
  }
}

function Regalos() {
  const [abierto, setAbierto] = useState(false)
  const [copiado, setCopiado] = useState(false)

  const copiar = async () => {
    await copiarTexto(ALIAS)
    setCopiado(true)
    setTimeout(() => setCopiado(false), 2500)
  }

  return (
    <section className="regalos">
      <div className="seccion regalos__contenido">
        {/* Regalo animado: se sacude cada tanto y se abre al tocar "Ver datos" */}
        <svg
          className={`regalo ${abierto ? 'regalo--abierto' : ''}`}
          viewBox="0 0 64 64"
          aria-hidden="true"
        >
          <g className="regalo__chispas">
            <path d="M18 12 L15 7 M32 9 V3 M46 12 L49 7 M10 22 L5 20 M54 22 L59 20" />
          </g>
          <g className="regalo__caja">
            <rect x="14" y="30" width="36" height="26" rx="1.5" />
            <path d="M32 30 V56" />
          </g>
          <g className="regalo__tapa">
            <rect x="11" y="22" width="42" height="8" rx="1.5" />
            <path d="M32 22 V30" />
            <path d="M32 22 C27 13 19 15 23 20 C25 22 29 22 32 22 Z" />
            <path d="M32 22 C37 13 45 15 41 20 C39 22 35 22 32 22 Z" />
          </g>
        </svg>

        <h2 className="titulo regalos__titulo">obsequios</h2>

        <p className="regalos__frase">
          ¡Lo más lindo de esta noche  <br />es poder compartirla con vos! <br /> Si además querés hacerme un regalo, <br />  te dejo mis datos.
        </p>

        <button
          className="regalos__boton"
          onClick={() => setAbierto(!abierto)}
          aria-expanded={abierto}
          aria-controls="datos-regalo"
        >
          {abierto ? 'Ocultar datos' : 'Ver datos'}
        </button>

        {/* Datos: se despliegan con una animación suave */}
        <div
          id="datos-regalo"
          className={`regalos__datos ${abierto ? 'regalos__datos--visible' : ''}`}
        >
          <div className="regalos__datos-interno">
            <div className="regalos__tarjeta">
              <span className="regalos__etiqueta">Alias</span>
              <span className="regalos__alias">{ALIAS}</span>
              <button className="regalos__copiar" onClick={copiar}>
                {copiado ? '¡Copiado!' : 'Copiar alias'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Regalos