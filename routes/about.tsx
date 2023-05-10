import { PageProps } from "$fresh/server.ts";
import { Handlers } from "$fresh/server.ts";

/* // RENDERED RESPONSE
export const handler: Handlers = {
    async GET(req, ctx) {
        const resp = await ctx.render();
        resp.headers.set("X-Custom-Header", "Hello");
        return resp;
    }
} */

// CUSTOM RESPONSE 
export const handler: Handlers = {
    GET(req) {
        const uuid = crypto.randomUUID();
        return new Response(JSON.stringify(uuid), {
            headers: { "Content-Type": "application/json" },
        });
    }
}

export default function About() {
    return (
      <main>
        <h1>About</h1>
        <p>This is the about page.</p>
      </main>
    );
  }