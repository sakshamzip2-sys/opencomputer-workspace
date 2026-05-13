import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const source = () =>
  readFileSync(
    resolve(process.cwd(), 'src/screens/chat/components/chat-composer.tsx'),
    'utf8',
  )

describe('ChatComposer context controls', () => {
  it('wires profile selection through the existing profile APIs', () => {
    const src = source()

    expect(src).toContain("fetch('/api/profiles/list')")
    expect(src).toContain("fetch('/api/profiles/activate'")
    expect(src).toContain('Activated profile')
  })

  it('surfaces workspace and reasoning controls next to the model picker', () => {
    const src = source()

    // Workspace chip — renders inline (Hermes-parity), not behind a hamburger
    expect(src).toContain("fetch('/api/workspace')")
    expect(src).toContain('workspaceContextQuery')
    expect(src).toContain('workspaceSelectMutation')
    expect(src).toMatch(/workspaceContextQuery\.data\?\.workspaces[^)]*\)\.map/)
    expect(src).toContain('SEARCH_MODAL_EVENTS.TOGGLE_FILE_EXPLORER')
    // Reasoning chip — preserved
    expect(src).toContain('Reasoning effort')
    expect(src).toContain("['medium', 'Medium']")
    expect(src).toContain("['high', 'High']")
    // Chips are NOT nested under a controls hamburger anymore
    expect(src).not.toContain('isControlsMenuOpen')
  })
})
