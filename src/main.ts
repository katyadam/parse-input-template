import * as core from '@actions/core'
import { wait } from './wait'

const OPENED = "<"
const CLOSED = ">"
/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const rawTemplates: string = core.getInput("templates")
    const rawVars: string = core.getInput("vars")

    // Debug logs are only output if the `ACTIONS_STEP_DEBUG` secret is true
    core.debug(`Templates: ${rawTemplates}`)
    core.debug(`Vars: ${rawVars}`)

    const outputs = getOutputs(rawTemplates, rawVars)
    core.setOutput("replacements", JSON.stringify(outputs))
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

function getOutputs(rawTemplates: string, rawVars: string): string[] {
  const templates: string[] = JSON.parse(rawTemplates)
  const vars: { [key: string]: string } = JSON.parse(rawVars)


  return templates.map((template) => parse(template, vars))
}

function parse(template: string, vars: { [key: string]: string }): string {
  let stack: string[] = []
  let res: string = ""
  for (const c of template) {
    if (c == OPENED) {
      res += stack.join("")
      stack = []
      continue
    } else if (c == CLOSED) {
      res += vars[stack.join("")]
      stack = []
      continue
    }
    stack.push(c)
  }
  return res
}
