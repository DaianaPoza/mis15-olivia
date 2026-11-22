import './Fecha.css'

function Fecha() {
  return (
    <section className="fecha">
      <div className="seccion fecha__contenido">
        {/* Ícono de calendario en línea fina */}
        <svg className="fecha__icono" viewBox="0 0 48 48" aria-hidden="true">
          <rect x="6" y="10" width="36" height="32" rx="2" />
          <path d="M6 18 H42 M15 6 V14 M33 6 V14" />
          <path d="M21 26 L25 24 V36" />
        </svg>

        <h2 className="titulo fecha__titulo">¿Cuándo?</h2>

        <p className="fecha__dia">26 de diciembre de 2026</p>
        
        <p className="titulo fecha__hora">20:45 hs</p>
      </div>
    </section>
  )
}

export default Fecha