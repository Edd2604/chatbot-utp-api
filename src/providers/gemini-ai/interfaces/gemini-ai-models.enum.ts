/**
 * Modelos de Gemini que usa el proyecto.
 *
 * Los cuatro que había aquí —gemini-2.0-flash, 2.0-flash-lite, 1.5-flash y
 * 1.5-flash-8b— fueron retirados por Google y ya no figuran en el listado de
 * la API, así que toda llamada moría con un 404 aunque la clave fuese válida.
 *
 * La migración no es tan simple como poner la versión siguiente. Probando
 * contra la API con una clave recién creada:
 *
 *   gemini-2.5-flash       404 «no longer available to new users»
 *   gemini-2.5-flash-lite  404, lo mismo
 *   gemini-3.x-flash       503, saturados
 *   gemini-3.5-flash-lite  responde
 *   gemini-flash-latest    responde
 *
 * De ahí la mezcla: para conversar se usa el alias, que es lo más capaz a lo
 * que llega una clave nueva, y para las tareas cortas una versión explícita.
 *
 * El alias tiene un coste que conviene tener presente: Google lo reapunta a
 * otro modelo cuando quiere, y con él cambian latencia y consumo de tokens
 * —justo lo que mide el módulo de monitoreo—. Si algún día la cuenta tiene
 * acceso a un flash completo con número de versión, es mejor fijarlo aquí.
 */
export enum GeminiModels {
  /** Conversación: sostiene el chat y lee los documentos del tópico. */
  GEMINI_FLASH = 'gemini-flash-latest',
  /** Tareas cortas y baratas: títulos de conversación y resúmenes. */
  GEMINI_FLASH_LITE = 'gemini-3.5-flash-lite',
}
