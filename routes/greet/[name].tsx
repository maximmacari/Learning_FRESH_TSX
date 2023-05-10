import { PageProps } from "$fresh/server.ts";

export default function About(props: PageProps) {
    return (
      <main>
        <h1>Greet Page</h1>
        <p>Hello {props.params.name}</p>
      </main>
    );
  }