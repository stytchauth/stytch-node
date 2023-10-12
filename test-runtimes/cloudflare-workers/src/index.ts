import * as stytch from 'stytch';

const client = new stytch.Client({
	// Find these values at https://stytch.com/dashboard/api-keys
	// These ones will trigger a well-known erorr message
	project_id: 'project-live-c60c0abe-c25a-4472-a9ed-320c6667d317',
	secret: 'secret-live-80JASucyk7z_G8Z-7dVwZVGXL5NT_qGAQ2I=',
});

/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export interface Env {
	// Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
	// MY_KV_NAMESPACE: KVNamespace;
	//
	// Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
	// MY_DURABLE_OBJECT: DurableObjectNamespace;
	//
	// Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
	// MY_BUCKET: R2Bucket;
	//
	// Example binding to a Service. Learn more at https://developers.cloudflare.com/workers/runtime-apis/service-bindings/
	// MY_SERVICE: Fetcher;
	//
	// Example binding to a Queue. Learn more at https://developers.cloudflare.com/queues/javascript-apis/
	// MY_QUEUE: Queue;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const authenticateResponse = await client.sessions
			.authenticate({
				session_token: 'WJtR5BCy38Szd5AfoDpf0iqFKEt4EE5JhjlWUY7l3FtY',
			})
			.catch((err) => err);
		return new Response(JSON.stringify(authenticateResponse));
	},
};
