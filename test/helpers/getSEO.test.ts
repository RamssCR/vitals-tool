import { describe, test, expect, vi, beforeEach } from "vitest"
import { getSEO } from "@helpers/getSEO"
import * as seoRulesModule from "@helpers/rules/seo"
import type { BrowserEnvironment } from "@@types/rules"

describe("getSEO", () => {
  const mockEnv: BrowserEnvironment = {
    location: {} as Location,
    navigator: {} as Navigator,
    window: {} as Window & typeof globalThis,
    document: {} as Document
  }

  beforeEach(() => {
    vi.restoreAllMocks()
  })

  test("should correctly calculate the score when all rules pass", async () => {
    vi.spyOn(seoRulesModule, "rules", "get").mockReturnValue([
      { label: "Rule 1", check: vi.fn().mockResolvedValue(true) },
      { label: "Rule 2", check: vi.fn().mockResolvedValue(true) }
    ])

    const result = await getSEO(mockEnv)

    expect(result.score).toBe(100)
    expect(result.details).toEqual([
      { label: "Rule 1", value: 1 },
      { label: "Rule 2", value: 1 }
    ])
  })

  test("debería calcular el puntaje correctamente cuando algunas reglas fallan", async () => {
    vi.spyOn(seoRulesModule, "rules", "get").mockReturnValue([
      { label: "Rule 1", check: vi.fn().mockResolvedValue(true) },
      { label: "Rule 2", check: vi.fn().mockResolvedValue(false) }
    ])

    const result = await getSEO(mockEnv)

    expect(result.score).toBe(50)
    expect(result.details).toEqual([
      { label: "Rule 1", value: 1 },
      { label: "Rule 2", value: 0 }
    ])
  })

  test("debería asignar 0 si una regla lanza un error", async () => {
    vi.spyOn(seoRulesModule, "rules", "get").mockReturnValue([
      { label: "Rule 1", check: vi.fn().mockResolvedValue(true) },
      { label: "Rule 2", check: vi.fn().mockRejectedValue(new Error("fail")) }
    ])

    const result = await getSEO(mockEnv)

    expect(result.details).toEqual([
      { label: "Rule 1", value: 1 },
      { label: "Rule 2", value: 0 }
    ])
  })
})
