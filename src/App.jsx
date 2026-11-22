import { useState } from 'react'
import Portada from './componentes/Portada/Portada'
import Hero from './componentes/Hero/Hero'
import Fecha from './componentes/Fecha/Fecha'
import Lugar from './componentes/Lugar/Lugar'
import DressCode from './componentes/DressCode/DressCode'
import Regalos from './componentes/Regalos/Regalos'
import Confirmacion from './componentes/Confirmacion/Confirmacion'
import Footer from './componentes/Footer/Footer'
import useRevelar from './hooks/useRevelar'

function App() {
  const [entro, setEntro] = useState(false)

  // Animación de aparición al hacer scroll (se activa al entrar a la tarjeta)
  useRevelar(entro)

  const entrar = () => {
    setEntro(true)
    window.scrollTo(0, 0)
  }

  // Mientras no tocaron "Entrar", se ve solo la portada
  if (!entro) {
    return <Portada onEntrar={entrar} />
  }

  return (
    <main className="tarjeta">
      <Hero />
      <Fecha />
      <Lugar />
      <DressCode />
      <Regalos />
      <Confirmacion />
      <Footer />
    </main>
  )
}

export default App