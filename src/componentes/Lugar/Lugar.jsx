import './Lugar.css'

// Link a Google Maps. Si tenés el link exacto del salón (Maps → Compartir → Copiar vínculo),
// pegalo acá en lugar de este y queda más preciso.
const LINK_MAPS =
  'https://www.google.com/maps/search/?api=1&query=' +
  encodeURIComponent('La Quinta de Eventos, 14 de Julio 3250')

function Lugar() {
  return (
    <section className="lugar">
      <div className="seccion lugar__contenido">
        {/* Taxi neoyorquino de perfil: cartel en el techo + franja a cuadros */}
        <svg className="taxi" viewBox="0 0 72 40" aria-hidden="true">
          <defs>
            <pattern id="taxi-cuadros" width="5" height="5" patternUnits="userSpaceOnUse">
              <rect className="taxi__cuadro" x="0" y="0" width="2.5" height="2.5" />
              <rect className="taxi__cuadro" x="2.5" y="2.5" width="2.5" height="2.5" />
            </pattern>
          </defs>
          <rect className="taxi__cuerpo" x="31" y="3.5" width="10" height="4.5" rx="1" />
          <path
            className="taxi__cuerpo"
            d="M4 28 V22 Q4 19 7 18.5 L18 17 L25 9.5 Q26.5 8 29 8 H46 Q48.5 8 50 9.5 L56 16.5 L65 18 Q68 18.6 68 22 V28 Q68 30 66 30 H6 Q4 30 4 28 Z"
          />
          <path className="taxi__ventana" d="M27 10.5 H36 V16.5 H21.5 Z" />
          <path className="taxi__ventana" d="M38.5 10.5 H46 Q47.5 10.5 48.5 11.5 L53 16.5 H38.5 Z" />
          <rect x="6" y="20.5" width="60" height="5" fill="url(#taxi-cuadros)" />
          <path className="taxi__puerta" d="M37 17 V29" />
          <circle className="taxi__halo taxi__halo--trasero" cx="5" cy="21.5" r="3.5" />
          <circle className="taxi__halo taxi__halo--faro" cx="67" cy="21.2" r="4.5" />
          <rect className="taxi__trasera" x="4" y="20" width="2" height="3" />
          <rect className="taxi__faro" x="66" y="20" width="2" height="2.5" />
          <circle className="taxi__rueda" cx="17" cy="30" r="5.5" />
          <circle className="taxi__llanta" cx="17" cy="30" r="2" />
          <circle className="taxi__rueda" cx="55" cy="30" r="5.5" />
          <circle className="taxi__llanta" cx="55" cy="30" r="2" />
        </svg>

        <h2 className="titulo lugar__titulo">¿Dónde?</h2>

        <p className="titulo lugar__nombre">La Quinta Eventos</p>
        <p className="lugar__direccion">14 de Julio 3250</p>

        <a
          className="lugar__boton"
          href={LINK_MAPS}
          target="_blank"
          rel="noopener noreferrer"
        >
          Cómo llegar
        </a>
      </div>
    </section>
  )
}

export default Lugar