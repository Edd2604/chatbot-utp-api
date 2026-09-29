# Chatbot UTP · API

El cerebro del asistente. Recibe la pregunta del alumno, arma el contexto con
los documentos cargados, llama a Gemini y devuelve la respuesta por streaming
mientras deja registro de todo lo que pasó.

Monolito modular en NestJS. Lo consume el
[frontend](https://github.com/Edd2604/chatbot-utp-frontend).

- Prefijo `api/v1` · Documentación Swagger en `/doc`

## Módulos

```
src/modules/
├── auth/           Sesión y roles
├── users/
├── conversations/  Hilos de chat
├── chat/           Entrada de mensajes
├── documents/      La base de conocimiento (PDF)
├── topics/         Temas sobre los que puede hablar
├── orchestrators/  ⬅ el motor
├── runs/           Cada llamada al modelo, registrada
├── monitoring/     Qué ocurre en vivo
├── logger/         Bitácora de cambios
└── events/
```

## El orquestador

`orchestrators/gemini-chat-runner` es donde ocurre todo. Su servicio coordina
seis piezas a la vez: el cliente de Gemini, los documentos, las conversaciones,
el registro de ejecuciones, Pusher y el bus de eventos.

El flujo de una pregunta:

1. Recupera el historial de la conversación y lo convierte al formato del modelo
   (`mapRunsToHistory`)
2. Extrae el contexto de los documentos cargados (`extractDocumentsContext`)
3. Lo junta con la instrucción del sistema, que **acota el alcance**: responder
   solo sobre la UTP —carreras, sedes, costos, admisión, becas, servicios— y
   admitir que no sabe antes que inventar
4. Llama a Gemini y emite la respuesta por streaming
5. Guarda la ejecución, pase lo que pase

El prompt vive en `prompts/instructions.const.ts`, fuera del código que lo usa:
ajustar el comportamiento del asistente no obliga a tocar la lógica.

## Dos registros, para dos preguntas distintas

### `Run` — ¿qué hizo el modelo?

Cada llamada a Gemini queda guardada, salga bien o mal:

```prisma
model Run {
  is_run_successful Boolean
  model_llm         String
  latency           Decimal  @db.Decimal(10, 6)
  tokens            Int
  input             String   @db.Text
  output            String   @db.Text
  error             String?  @db.Text
  conversation_id   String
}
```

Latencia con seis decimales, conteo de tokens, entrada, salida y el error si lo
hubo. Con eso se puede responder qué preguntan los alumnos, cuánto tarda el
modelo, cuánto cuesta y qué se rompió. Un chatbot sin esta tabla es una caja
negra.

### `Log` — ¿qué tocó una persona?

```prisma
model Log {
  user_id   String
  action    Action  // CREATE · UPDATE · DELETE
  entity    Entity  // User · Document · Topic
  entity_id String
  details   Json?
}
```

`details` guarda el antes y el después, y es lo que el panel pinta como diff.
Importa porque editar un documento cambia lo que el modelo le responde a un
alumno: hace falta saber quién lo cambió y qué cambió exactamente.

## Stack

NestJS · TypeScript · Prisma · PostgreSQL · `@google/generative-ai` ·
JWT · Swagger · class-validator y class-transformer · Joi ·
Cloudinary (documentos) · Pusher (tiempo real) · `partial-json-parser` (para ir
leyendo la respuesta del modelo mientras llega) · date-fns-tz

## Cómo levantarlo

```bash
npm install
npx prisma migrate dev
npm run start:dev
```

Necesita un `.env` con la base de datos, la clave de Gemini, las credenciales
de Cloudinary y de Pusher, y los secretos de JWT. Se valida con Joi al
arrancar: si falta alguna, el proceso no levanta.

---

