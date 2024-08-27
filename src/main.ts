import * as core from '@actions/core'
import { wait } from './wait'

const brackets = ["<", ">"]
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

    // core.setOutput('time', new Date().toTimeString())
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

function getOutputs(rawTemplates: string, rawVars: string): string[] {
  const templates: string[] = JSON.parse(rawTemplates)
  const vars: { [key: string]: string } = JSON.parse(rawVars)

  templates.forEach((template) => {

  })

  return [""]
}

function sub(template: string, vars: { [key: string]: string }): string {
  let stack: string[] = []
  let load: boolean = false
  for (const c of template) {
    if (brackets.includes(c)) {
      load = !load
      continue
    }


  }
  return ""
}