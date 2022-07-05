/* eslint-disable tsdoc/syntax */
/* eslint-disable no-undef */
const fs = require('fs');
const path = require('path');
const express = require('express');
const isProd = process.env.NODE_ENV === 'production';

/**
 * Create Express Server
 */
async function createServer(root = process.cwd()) {
  const resolve = p => path.resolve(__dirname, p);

  const indexProd = isProd
    ? fs.readFileSync(resolve('dist/client/index.html'), 'utf-8')
    : '';
  const manifest = isProd
    ? // @ts-ignore
      () => import('./dist/client/ssr-manifest.json')
    : {};

  /** @type {import('express').Express} */
  const app = express();

  /** @type {import('vite').ViteDevServer} */
  let vite;
  if (!isProd) {
    vite = await require('vite').createServer({
      root,
      logLevel: isProd ? 'error' : 'info',
      server: {
        middlewareMode: 'ssr',
        watch: {
          // During tests we edit the files too fast and sometimes chokidar
          // misses change events, so enforce polling for consistency
          usePolling: true,
          interval: 100,
        },
      },
    });
    // use vite's connect instance as middleware
    app.use(vite.middlewares);
  } else {
    app.use(
      require('serve-static')(resolve('dist/client'), {
        index: false,
      })
    );
  }

  app.use('*', async (req, res) => {
    try {
      const url = req.originalUrl;

      let template;
      let render;
      if (!isProd) {
        // always read fresh template in dev
        template = fs.readFileSync(resolve('index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        render = (await vite.ssrLoadModule('/src/entry-server.js')).render;
      } else {
        template = indexProd;
        // @ts-ignore
        render = require('./dist/server/entry-server.js').render;
      }

      const html = await render(url, manifest, template);

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e) {
      vite && vite.ssrFixStacktrace(e);
      console.log(e.stack);
      res.status(500).end(e.stack);
    }
  });

  return { app, vite };
}

createServer().then(({ app }) =>
  app.listen(3000, () => {
    console.log('⚡Launch SSR: http://localhost:3000');
  })
);

// for test use
exports.createServer = createServer;
