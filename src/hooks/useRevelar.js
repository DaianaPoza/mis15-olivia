import { useEffect } from 'react'

// Hace aparecer el contenido de cada sección a medida que se hace scroll.
// No hace falta tocar los componentes: busca solo el contenido de cada sección
// (deja afuera el Hero, que ya tiene su propia animación, y las fotos de fondo).
const SELECTOR = [
  '.tarjeta > section:not(.hero) > *:not(picture):not([aria-hidden="true"])',
  '.tarjeta > footer > *',
].join(', ')

function useRevelar(activo) {
  useEffect(() => {
    if (!activo) return

    const elementos = document.querySelectorAll(SELECTOR)
    elementos.forEach((el) => el.classList.add('revelar'))

    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) {
            entrada.target.classList.add('revelar--visible')
            observador.unobserve(entrada.target) // aparece una sola vez
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -8% 0px' }
    )

    elementos.forEach((el) => observador.observe(el))
    return () => observador.disconnect()
  }, [activo])
}

export default useRevelar