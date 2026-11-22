import { useState } from 'react'
import './Portada.css'

function Portada({ onEntrar }) {
  const [saliendo, setSaliendo] = useState(false)

  const entrar = () => {
    setSaliendo(true)          // fundido de salida
    setTimeout(onEntrar, 700)  // después muestra la tarjeta
  }

  return (
    <section className={`portada ${saliendo ? 'portada--saliendo' : ''}`}>
      <p className="titulo portada__mis">Mis 15</p>
      <h1 className="titulo portada__nombre">Olivia</h1>
      <p className="portada__frase">Te invito a celebrar una noche inolvidable</p>
      <button className="portada__boton" onClick={entrar}>
        Entrar
      </button>
    </section>
  )
}

export default Portada