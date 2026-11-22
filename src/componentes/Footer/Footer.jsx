import './Footer.css'
import skyline from '../../assets/img/footer_skyline_nueva_york.webp'

// Frase del final. Si no la querés, dejala vacía así: const FRASE = ''
const FRASE = 'Porque los mejores momentos se viven acompañados...'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__contenido">
        <p className="titulo footer__mis">Mis 15</p>
        <p className="titulo footer__nombre">Olivia</p>
        {FRASE && <p className="footer__frase">{FRASE}</p>}
      </div>

      {/* Skyline de Nueva York en línea blanca */}
      <img className="footer__skyline" src={skyline} alt="" aria-hidden="true" loading="lazy" />
    </footer>
  )
}

export default Footer