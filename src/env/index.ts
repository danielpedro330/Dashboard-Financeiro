import z from "zod";

const _envschema = z.object({
    NODE_ENV: z.enum(['dev', 'test', 'production']).default("production"),
    PORT: z.coerce.number().default(3333)
})

const _env = _envschema.safeParse(process.env)
if (_env.success === false) {
    console.error('❌Invalid environment variable')

    throw new Error("❌Invalid environment variable")
}

export const env = _env.data