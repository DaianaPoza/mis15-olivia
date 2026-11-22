import './Hero.css'
import CuentaRegresiva from '../CuentaRegresiva/CuentaRegresiva'
import fondoMobile from '../../assets/img/olivia_hero_mobile.webp'
import fondoDesktop from '../../assets/img/olivia_hero_desktop.webp'

function Hero() {
  return (
    <section
      className="hero"
      // Las imágenes se pasan al CSS como variables para usarlas dentro de las letras
      style={{
        '--hero-mobile': `url(${fondoMobile})`,
        '--hero-desktop': `url(${fondoDesktop})`,
      }}
    >
      {/* Arriba: franja azul + "Mis 15" sobre blanco a la izquierda y bloque azul a la derecha */}
      <div className="hero__arriba">
        <div className="hero__techo" aria-hidden="true"></div>
        <div className="hero__mis-caja">
          <p className="titulo hero__mis">Mis 15</p>
        </div>
        <div className="hero__bloque" aria-hidden="true"></div>
      </div>

      {/* "OLIVIA" con la foto de Nueva York adentro de las letras */}
      <h1 className="hero__nombre">Olivia</h1>

      {/* Cuenta regresiva en un bloque azul */}
      <div className="hero__abajo">
        <CuentaRegresiva />
      </div>
    </section>
  )
}

export default Hero