"use client"

import { useActionState } from "react"
import { generateToken } from "@/app/actions/users"

type State = { token: string | null }

export default function TokenSection({ currentToken }: { currentToken: string | null }) {
  const [state, formAction] = useActionState(
    async (_prev: State, _formData: FormData) => {
      const result = await generateToken()
      return { token: result.token }
    },
    { token: currentToken } satisfies State,
  )

  return (
    <div data-testid="api-token-section" className="bg-surface border border-border rounded-xl p-6 mt-6">
      <h2 className="text-lg font-semibold mb-4">API Token</h2>

      {state.token ? (
        <div data-testid="token-display" className="bg-neutral-950 border border-border rounded-lg px-4 py-3 font-mono text-sm text-emerald-400 break-all select-all">
          <span data-testid="api-token">{state.token}</span>
        </div>
      ) : (
        <p data-testid="no-token-message" className="text-neutral-500 text-sm">No API token generated yet.</p>
      )}

      <form action={formAction} className="mt-4">
        <button
          type="submit"
          data-testid="generate-token-button"
          className="cursor-pointer px-4 py-2 border border-border hover:border-emerald-500/50 text-neutral-300 hover:text-emerald-400 font-semibold rounded-lg transition-colors text-sm"
        >
          {state.token ? "Regenerate token" : "Generate token"}
        </button>
      </form>
    </div>
  )
}
