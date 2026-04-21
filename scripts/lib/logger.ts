import chalk from "chalk"
import type { ImportReport } from "../types.js"

type LoggerState = {
  warnings: string[]
  errors: { message: string; stack?: string }[]
}

const state: LoggerState = {
  warnings: [],
  errors: [],
}

export const logger = {
  info(msg: string): void {
    console.log(chalk.cyan(msg))
  },
  success(msg: string): void {
    console.log(chalk.green(`✔ ${msg}`))
  },
  warn(msg: string): void {
    console.log(chalk.yellow(`⚠ ${msg}`))
    state.warnings.push(msg)
  },
  error(msg: string, err?: unknown): void {
    console.log(chalk.red(`✖ ${msg}`))
    if (err instanceof Error) {
      console.log(chalk.red(err.stack ?? err.message))
      state.errors.push({ message: msg, stack: err.stack })
    } else if (err !== undefined) {
      const detail = typeof err === "string" ? err : JSON.stringify(err)
      console.log(chalk.red(detail))
      state.errors.push({ message: `${msg} :: ${detail}` })
    } else {
      state.errors.push({ message: msg })
    }
  },
  step(n: number, total: number, msg: string): void {
    console.log(chalk.bold.white(`[${n}/${total}]`) + " " + msg)
  },
  plain(msg: string): void {
    console.log(msg)
  },
  getWarnings(): string[] {
    return [...state.warnings]
  },
  getErrors(): { message: string; stack?: string }[] {
    return [...state.errors]
  },
  resetState(): void {
    state.warnings.length = 0
    state.errors.length = 0
  },
}

export type { ImportReport }
