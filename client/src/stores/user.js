import { authClient } from '../lib/auth.js'

export const session = authClient.useSession()
