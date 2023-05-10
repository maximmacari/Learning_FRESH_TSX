import { Handlers, PageProps } from "$fresh/server.ts";

export interface User {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string;
  company: null;
  blog: string;
  location: string;
  email: null;
  hireable: null;
  bio: null;
  twitter_username: null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: Date;
  updated_at: Date;
}

export const handler: Handlers<User | null> = {
  async GET(_, ctx) {
    const { username } = ctx.params;
    const resp = await fetch(`https://api.github.com/users/${username}`);
    if (resp.status === 404) {
      return ctx.render(null);
    }
    const user: User = await resp.json();
    return ctx.render(user);
  },
};
// CUSTOM RESPONSE
/* export const handler: Handlers<User | null> = {
    async GET(_, ctx) {
      const { username } = ctx.params;
      const resp = await fetch(`https://api.github.com/users/${username}`);
      if (resp.status === 404) {
        return ctx.render(null);
      }
      const user: User = await resp.json();
      return ctx.render(user);
    },
  }; */

// RENDERED RESPONSE
export default function Page({ data }: PageProps<User | null>) {
  if (!data) {
    return <h1>User not found</h1>;
  }

  return (
    <div class="p-6">
      <h1 class="text-xl font-bold mb-4">User Profile</h1>
      <div class="flex flex-wrap -mx-2">
        <div class="w-full md:w-1/2 px-2">
          <div class="mb-4">
            <span class="font-bold mr-2">Name:</span>
            <span class="text-gray-700">{data.name}</span>
          </div>
          <div class="mb-4">
            <span class="font-bold mr-2">Username:</span>
            <span class="text-gray-700">{data.login}</span>
          </div>
          <div class="mb-4">
            <span class="font-bold mr-2">Location:</span>
            <span class="text-gray-700">{data.location}</span>
          </div>
          <div class="mb-4">
            <span class="font-bold mr-2">Company:</span>
            <span class="text-gray-700">{data.company}</span>
          </div>
        </div>
        <div class="w-full md:w-1/2 px-2">
          <div class="mb-4">
            <span class="font-bold mr-2">Followers:</span>
            <span class="text-gray-700">{data.followers}</span>
          </div>
          <div class="mb-4">
            <span class="font-bold mr-2">Following:</span>
            <span class="text-gray-700">{data.following}</span>
          </div>
          <div class="mb-4">
            <span class="font-bold mr-2">Public Repos:</span>
            <span class="text-gray-700">{data.public_repos}</span>
          </div>
          <div class="mb-4">
            <span class="font-bold mr-2">Created At:</span>
            <span class="text-gray-700">{data.created_at}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
