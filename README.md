# Web-hooks

## Configuración inicial del proyecto - Node con TypeScript - TS-Node-dev (preferido)

1 Instalar TypeScript y demás dependencias

```bash
npm i -D typescript @types/node ts-node-dev rimraf
```

2 Inicializar el archivo de configuración de TypeScript ( Se puede configurar al gusto)

```bash
npx tsc --init --outDir dist/ --rootDir src
```

3 Crear scripts para dev, build y start ([Más sobre TS-Node-dev aquí](https://www.npmjs.com/package/ts-node-dev))

```json
  "dev": "tsnd --respawn --clear src/app.ts",
  "build": "rimraf ./dist && tsc",
  "start": "npm run build && node dist/app.js"
```

## Crear Webhook de github

1 Settings - webhooks - add webhook

2 Url (https valid) ngrok - content type (application/json) - Let me select individual events - Add webhook
