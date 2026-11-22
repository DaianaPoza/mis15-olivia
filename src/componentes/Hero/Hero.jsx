import './Hero.css'
import CuentaRegresiva from '../CuentaRegresiva/CuentaRegresiva'
import fondoMobile from '../../assets/img/olivia_hero_mobile.webp'
import fondoDesktop from '../../assets/img/olivia_hero_desktop.webp'

function Hero() {
  return (
    <section className="hero">
      {/* Fondo: el navegador elige la imagen según el ancho de pantalla */}
      <picture className="hero__fondo" aria-hidden="true">
        <source media="(min-width: 768px)" srcSet={fondoDesktop} />
        <img src={fondoMobile} alt="" />
      </picture>

      {/* Capa azul encima de la foto para dar profundidad y que el texto se lea */}
      <div className="hero__capa" aria-hidden="true"></div>

      <div className="hero__contenido">
        <p className="titulo hero__mis">Mis 15</p>
        <h1 className="titulo hero__nombre">Olivia</h1>

        <div className="hero__cuenta">
          <CuentaRegresiva />
        </div>
      </div>
    </section>
  )
}

export default Hero