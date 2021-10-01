# Description

This project is a web page to manage the [sync-js](https://github.com/Dapiguabc/sync-js).

## Environment Prepare

Install `node_modules`:

```bash
npm install
```

or

```bash
yarn
```

## Provided Scripts

Scripts provided in `package.json`. It's safe to modify or add additional script:

### Set API Path
Modify the file ```config/config.ts```
```bash
  define: {
    API_ENV: 'Your Api'
  },
```

### Start project

```bash
npm start
```

### Build project

```bash
npm run build
```

### Check code style

```bash
npm run lint
```

You can also use script to auto fix some lint error:

```bash
npm run lint:fix
```

### Test code

```bash
npm test
```
