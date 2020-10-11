import { Application, Router, send } from "https://deno.land/x/oak/mod.ts";

import { renderFile } from "https://deno.land/x/dejs@0.8.0/mod.ts";

const router = new Router();

const app = new Application();

router.get("/", async (ctx) => {
  ctx.response.body = await renderFile(`${Deno.cwd()}/view/index.ejs`, {
    title: "Hello Yuanfang",
    author: "yuanfang",
    github: "https://github.com/iyuanfang/deno-ejs",
  });
});

app.use(router.routes());

app.use(async (ctx) => {
  await send(ctx, ctx.request.url.pathname, {
    root: `${Deno.cwd()}`,
  });
});

const port: number = Number(Deno.env.get("PORT")) || 80;

app.listen({ port });
