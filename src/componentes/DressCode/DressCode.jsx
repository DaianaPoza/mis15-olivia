import './DressCode.css'

function DressCode() {
  return (
    <section className="dress">
      <div className="seccion dress__contenido">
        <h2 className="titulo dress__titulo">Dress code</h2>

        {/* Vestido y saco colgados en percha */}
        <svg className="dress__ropa" viewBox="0 0 200 140" aria-hidden="true">
          {/* ===== Vestido ===== */}
          <g className="dress__prenda">
            <path className="dress__percha" d="M55 15 V11 A4 4 0 1 1 59 7" />
            <path className="dress__percha" d="M55 15 L32 27 H78 Z" />
            <path className="dress__bretel" d="M44.5 27 L46.5 41 M65.5 27 L63.5 41" />
            <path className="dress__bordo" d="M46 41 Q50.5 37 55 41.5 Q59.5 37 64 41 L62 61 H48 Z" />
            <path
              className="dress__bordo"
              d="M48 64 Q39 88 29 119 Q37 124 44 122 Q49 126 55 123 Q61 126 66 122 Q73 124 81 119 Q71 88 62 64 Z"
            />
            <rect className="dress__azul" x="47.5" y="60.5" width="15" height="3.5" rx="1" />
            <path className="dress__pliegue" d="M52 66 Q47 94 43 121 M58 66 Q63 94 67 121 M55 66 V122" />
            <path className="dress__reflejo" d="M49 44 Q50 52 49.5 58" />
          </g>

          {/* ===== Saco con camisa y corbata ===== */}
          <g className="dress__prenda dress__prenda--2">
            <path className="dress__percha" d="M145 15 V11 A4 4 0 1 1 149 7" />
            <path className="dress__percha" d="M145 15 L120 29 H170 Z" />
            <path className="dress__azul" d="M122 30 L109 39 L105 112 L114 113 L115 41 Z" />
            <path className="dress__azul" d="M168 30 L181 39 L185 112 L176 113 L175 41 Z" />
            <path
              className="dress__azul"
              d="M122 30 Q128 27.5 135 27 L145 62 L155 27 Q162 27.5 168 30 L175 41 L176 118 Q161 122 145 120 Q129 122 114 118 L115 41 Z"
            />
            <path className="dress__camisa" d="M135 27 L145 62 L155 27 Q145 30.5 135 27 Z" />
            <path className="dress__bordo" d="M142 29.5 H148 L147 34 H143 Z" />
            <path className="dress__bordo" d="M143 34 L141.2 52 L145 57 L148.8 52 L147 34 Z" />
            <path className="dress__costura" d="M135 27 L129.5 41 L137 44.5 L145 62 M155 27 L160.5 41 L153 44.5 L145 62" />
            <path className="dress__costura dress__costura--suave" d="M145 62 V119" />
            <circle className="dress__boton" cx="145" cy="74" r="1.6" />
            <circle className="dress__boton" cx="145" cy="86" r="1.6" />
            <path className="dress__costura" d="M120 93 H133 M157 93 H170 M157 52.5 H169" />
            <path className="dress__bordo" d="M160 51 L168 49 V52 H160 Z" />
          </g>
        </svg>

        <p className="dress__estilo">Elegante Sport</p>
      </div>
    </section>
  )
}

export default DressCode