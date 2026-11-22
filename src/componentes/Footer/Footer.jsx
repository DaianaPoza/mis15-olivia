import './Footer.css'
import fondoMobile from '../../assets/img/olivia_hero_mobile.webp'
import fondoDesktop from '../../assets/img/olivia_hero_desktop.webp'

// Frase del final. Si no la querés, dejala vacía así: const FRASE = ''
const FRASE = 'La noche es nuestra'

function Footer() {
  return (
    <footer
      className="footer"
      // Mismas imágenes del Hero, para usarlas dentro de las letras
      style={{
        '--hero-mobile': `url(${fondoMobile})`,
        '--hero-desktop': `url(${fondoDesktop})`,
      }}
    >
      <div className="footer__contenido">
        <p className="titulo footer__mis">Mis 15</p>
        <p className="footer__nombre">Olivia</p>
        {FRASE && <p className="footer__frase">{FRASE}</p>}
      </div>
    </footer>
  )
}

export default Footer