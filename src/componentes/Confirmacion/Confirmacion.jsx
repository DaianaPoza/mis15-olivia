import { useEffect, useRef, useState } from 'react'
import './Confirmacion.css'
import Confeti from '../Confeti/Confeti'
import skylineMobile from '../../assets/img/skyline_azul_olivia_mobile.webp'
import skylineDesktop from '../../assets/img/skyline_azul_olivia_desktop.webp'

const RESTRICCIONES = [
  { valor: 'ninguna', texto: 'Ninguna' },
  { valor: 'vegetariano', texto: 'Vegetariano' },
  { valor: 'vegano', texto: 'Vegano' },
  { valor: 'celiaco', texto: 'Celíaco' },
  { valor: 'alergia', texto: 'Alergia' },
  { valor: 'otra', texto: 'Otra' },
]

const MAX_INVITADOS = 10

// Pegá acá la URL de la aplicación web de Google Apps Script (termina en /exec)
const URL_PLANILLA = 'https://script.google.com/macros/s/AKfycbyZSBciu7I77rPN4Kb7LsGdAlpFR_EMwthcvvq0yjrXDLJP5IXHUjG6K-Huo5MPeN4/exec'

// ID único de este celular/navegador: si la misma persona vuelve a confirmar,
// se reemplaza su respuesta en la planilla (y dos tocayos no se pisan)
function obtenerIdRespuesta() {
  const nuevo = () =>
    (window.crypto && crypto.randomUUID
      ? crypto.randomUUID()
      : Date.now().toString(36) + Math.random().toString(36).slice(2))
  try {
    let id = localStorage.getItem('olivia15_id')
    if (!id) {
      id = nuevo()
      localStorage.setItem('olivia15_id', id)
    }
    return id
  } catch {
    return nuevo() // si el navegador no deja guardar, igual se envía con un ID
  }
}

const invitadoVacio = () => ({ nombre: '', restriccion: 'ninguna', detalle: '' })

function Confirmacion() {
  const [nombre, setNombre] = useState('')
  const [asiste, setAsiste] = useState(null) // null | 'si' | 'no'
  const [invitados, setInvitados] = useState([invitadoVacio()])
  const [error, setError] = useState('')
  const [enviado, setEnviado] = useState(false)
  const [enviando, setEnviando] = useState(false)
  const graciasRef = useRef(null)

  // Al confirmar, lleva el mensaje de "¡Gracias!" al centro de la pantalla
  useEffect(() => {
    if (enviado && graciasRef.current) {
      graciasRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [enviado])

  // Lista de nombres confirmados: "María, Juan y Ana"
  const nombresConfirmados = [nombre.trim(), ...invitados.slice(1).map((inv) => inv.nombre.trim())]
  const listaNombres =
    nombresConfirmados.length > 1
      ? `${nombresConfirmados.slice(0, -1).join(', ')} y ${nombresConfirmados.at(-1)}`
      : nombresConfirmados[0]
  const [confeti, setConfeti] = useState(0) // cada vez que sube, explota el confeti

  const elegirAsistencia = (valor) => {
    if (valor === 'si' && asiste !== 'si') setConfeti((n) => n + 1)
    setAsiste(valor)
  }

  // Suma o resta invitados manteniendo lo que ya completaron
  const cambiarCantidad = (nueva) => {
    if (nueva < 1 || nueva > MAX_INVITADOS) return
    setInvitados((prev) =>
      nueva > prev.length
        ? [...prev, ...Array.from({ length: nueva - prev.length }, invitadoVacio)]
        : prev.slice(0, nueva)
    )
  }

  const actualizarInvitado = (indice, campo, valor) => {
    setInvitados((prev) =>
      prev.map((inv, i) => (i === indice ? { ...inv, [campo]: valor } : inv))
    )
  }

  const enviar = async (e) => {
    e.preventDefault()
    if (enviando) return
    if (!nombre.trim()) return setError('Completá tu nombre y apellido.')
    if (!asiste) return setError('Contanos si vas a asistir.')
    if (asiste === 'si') {
      const sinNombre = invitados.findIndex((inv, i) => i > 0 && !inv.nombre.trim())
      if (sinNombre !== -1) return setError(`Completá el nombre del invitado ${sinNombre + 1}.`)
    }
    setError('')

    // Una fila por persona: el invitado 1 es quien completa el formulario
    const textoRestriccion = (valor) =>
      RESTRICCIONES.find((r) => r.valor === valor)?.texto || 'Ninguna'

    const respuesta = {
      id: obtenerIdRespuesta(),
      nombre: nombre.trim(),
      asiste: asiste === 'si' ? 'Sí' : 'No',
      invitados:
        asiste === 'si'
          ? invitados.map((inv, i) => ({
              nombre: i === 0 ? nombre.trim() : inv.nombre.trim(),
              restriccion: textoRestriccion(inv.restriccion),
              detalle: inv.detalle.trim(),
            }))
          : [{ nombre: nombre.trim(), restriccion: '', detalle: '' }],
    }

    setEnviando(true)
    try {
      const res = await fetch(URL_PLANILLA, {
        method: 'POST',
        // text/plain evita el bloqueo de seguridad (CORS) de Google
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(respuesta),
      })
      const datos = await res.json()
      if (!datos.ok) throw new Error(datos.error || 'Error al guardar')

      setEnviado(true)
      if (asiste === 'si') setConfeti((n) => n + 1)
    } catch (err) {
      console.error(err)
      setError('No pudimos enviar tu respuesta. Revisá tu conexión e intentá de nuevo.')
    } finally {
      setEnviando(false)
    }
  }

  return (
    <section className="confirmacion">
      <div className="seccion confirmacion__contenido">
        {/* Skyline de Nueva York en línea azul */}
        <picture className="confirmacion__skyline">
          <source media="(min-width: 768px)" srcSet={skylineDesktop} />
          <img src={skylineMobile} alt="" aria-hidden="true" loading="lazy" />
        </picture>

        <div className="confirmacion__encabezado">
          <h2 className="titulo confirmacion__titulo">Confirmá tu asistencia</h2>
          <p className="confirmacion__descripcion">
            Completá el formulario para reservar tu lugar en esta noche tan especial.
          </p>
        </div>

        <div className="confirmacion__tarjeta">
        {confeti > 0 && <Confeti key={confeti} />}
        {enviado ? (
          <div className="confirmacion__gracias" role="status" ref={graciasRef}>
            <p className="titulo confirmacion__gracias-titulo">¡Gracias!</p>

            {asiste === 'no' && (
              <p className="confirmacion__gracias-texto">
                {nombre.trim()}, gracias por avisar. ¡Te vamos a extrañar!
              </p>
            )}

            {asiste === 'si' && invitados.length === 1 && (
              <p className="confirmacion__gracias-texto">
                {nombre.trim()}, tu lugar está confirmado. ¡Nos vemos el 26 de diciembre!
              </p>
            )}

            {asiste === 'si' && invitados.length > 1 && (
              <>
                <p className="confirmacion__gracias-texto">
                  Confirmaste la asistencia de <strong>{invitados.length} personas</strong>:
                </p>
                <p className="confirmacion__gracias-nombres">{listaNombres}</p>
                <p className="confirmacion__gracias-texto">¡Los esperamos el 26 de diciembre!</p>
              </>
            )}
          </div>
        ) : (
          <form className="formulario" onSubmit={enviar} noValidate>
            {/* Nombre */}
            <label className="campo">
              <span className="campo__etiqueta">Nombre y apellido</span>
              <input
                className="campo__input"
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                autoComplete="name"
                placeholder="Tu nombre completo"
              />
            </label>

            {/* ¿Asistís? */}
            <fieldset className="grupo">
              <legend className="campo__etiqueta">¿Vas a asistir?</legend>
              <div className="grupo__opciones grupo__opciones--dos">
                <label className={`opcion ${asiste === 'si' ? 'opcion--activa' : ''}`}>
                  <input
                    type="radio"
                    name="asiste"
                    value="si"
                    checked={asiste === 'si'}
                    onChange={() => elegirAsistencia('si')}
                  />
                  ¡Sí, voy!
                </label>
                <label className={`opcion ${asiste === 'no' ? 'opcion--activa' : ''}`}>
                  <input
                    type="radio"
                    name="asiste"
                    value="no"
                    checked={asiste === 'no'}
                    onChange={() => elegirAsistencia('no')}
                  />
                  No puedo
                </label>
              </div>
            </fieldset>

            {/* Solo si asiste: cantidad + restricciones por invitado */}
            {asiste === 'si' && (
              <div className="formulario__extra">
                <div className="grupo">
                  <span className="campo__etiqueta" id="cantidad-etiqueta">
                    ¿Cuántos son? (contándote)
                  </span>
                  <div className="contador" role="group" aria-labelledby="cantidad-etiqueta">
                    <button
                      type="button"
                      className="contador__boton"
                      onClick={() => cambiarCantidad(invitados.length - 1)}
                      disabled={invitados.length === 1}
                      aria-label="Restar un invitado"
                    >
                      −
                    </button>
                    <span className="contador__numero" aria-live="polite">
                      {invitados.length}
                    </span>
                    <button
                      type="button"
                      className="contador__boton"
                      onClick={() => cambiarCantidad(invitados.length + 1)}
                      disabled={invitados.length === MAX_INVITADOS}
                      aria-label="Sumar un invitado"
                    >
                      +
                    </button>
                  </div>
                </div>

                {invitados.map((invitado, i) => (
                  <fieldset className="invitado" key={i}>
                    <legend className="invitado__titulo">
                      {i === 0 ? 'Invitado 1 · Vos' : `Invitado ${i + 1}`}
                    </legend>

                    {i > 0 && (
                      <label className="campo">
                        <span className="campo__etiqueta">Nombre y apellido</span>
                        <input
                          className="campo__input"
                          type="text"
                          value={invitado.nombre}
                          onChange={(e) => actualizarInvitado(i, 'nombre', e.target.value)}
                          placeholder="Nombre del invitado"
                        />
                      </label>
                    )}

                    <div className="grupo">
                      <span className="campo__etiqueta">Restricción alimentaria</span>
                      <div className="grupo__opciones grupo__opciones--tres">
                        {RESTRICCIONES.map((r) => (
                          <label
                            key={r.valor}
                            className={`opcion opcion--chica ${
                              invitado.restriccion === r.valor ? 'opcion--activa' : ''
                            }`}
                          >
                            <input
                              type="radio"
                              name={`restriccion-${i}`}
                              value={r.valor}
                              checked={invitado.restriccion === r.valor}
                              onChange={() => {
                                actualizarInvitado(i, 'restriccion', r.valor)
                                actualizarInvitado(i, 'detalle', '')
                              }}
                            />
                            {r.texto}
                          </label>
                        ))}
                      </div>
                    </div>

                    {invitado.restriccion === 'alergia' && (
                      <label className="campo campo--aparece">
                        <span className="campo__etiqueta">¿A qué es alérgico/a?</span>
                        <input
                          className="campo__input"
                          type="text"
                          value={invitado.detalle}
                          onChange={(e) => actualizarInvitado(i, 'detalle', e.target.value)}
                          placeholder="Ej: frutos secos, mariscos…"
                        />
                      </label>
                    )}

                    {invitado.restriccion === 'otra' && (
                      <label className="campo campo--aparece">
                        <span className="campo__etiqueta">Contanos cuál</span>
                        <input
                          className="campo__input"
                          type="text"
                          value={invitado.detalle}
                          onChange={(e) => actualizarInvitado(i, 'detalle', e.target.value)}
                          placeholder="Escribí la restricción"
                        />
                      </label>
                    )}
                  </fieldset>
                ))}
              </div>
            )}

            {error && (
              <p className="formulario__error" role="alert">
                {error}
              </p>
            )}

            <button type="submit" className="formulario__enviar" disabled={enviando}>
              {enviando ? 'Enviando…' : 'Confirmar'}
            </button>
          </form>
        )}
        </div>
      </div>
    </section>
  )
}

export default Confirmacion