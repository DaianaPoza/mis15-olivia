import { useState } from 'react'
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

const invitadoVacio = () => ({ nombre: '', restriccion: 'ninguna', detalle: '' })

function Confirmacion() {
  const [nombre, setNombre] = useState('')
  const [asiste, setAsiste] = useState(null) // null | 'si' | 'no'
  const [invitados, setInvitados] = useState([invitadoVacio()])
  const [error, setError] = useState('')
  const [enviado, setEnviado] = useState(false)
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

  const enviar = (e) => {
    e.preventDefault()
    if (!nombre.trim()) return setError('Completá tu nombre y apellido.')
    if (!asiste) return setError('Contanos si vas a asistir.')
    setError('')

    // Estos son los datos que después vamos a mandar a Google Sheets
    const respuesta = {
      nombre: nombre.trim(),
      asiste,
      cantidad: asiste === 'si' ? invitados.length : 0,
      invitados: asiste === 'si' ? invitados : [],
    }
    console.log('Respuesta del formulario:', respuesta)

    setEnviado(true)
    if (asiste === 'si') setConfeti((n) => n + 1)
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
          <div className="confirmacion__gracias" role="status">
            <p className="titulo confirmacion__gracias-titulo">¡Gracias!</p>
            <p className="confirmacion__gracias-texto">
              {asiste === 'si'
                ? `${nombre.trim()}, tu lugar está confirmado. ¡Nos vemos el 26 de diciembre!`
                : `${nombre.trim()}, gracias por avisar. ¡Te vamos a extrañar!`}
            </p>
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

            <button type="submit" className="formulario__enviar">
              Confirmar
            </button>
          </form>
        )}
        </div>
      </div>
    </section>
  )
}

export default Confirmacion