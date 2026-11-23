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
      <div className="hero__contenido">
        <p className="titulo hero__mis">Mis 15</p>

        {/* "OLIVIA" con la foto de Nueva York adentro de las letras */}
        <h1 className="hero__nombre">Olivia</h1>

        <div className="hero__cuenta">
          <CuentaRegresiva />
        </div>
      </div>
    </section>
  )
}

export default Hero