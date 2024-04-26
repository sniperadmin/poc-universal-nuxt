import * as ruleSpecs from '~/utils/allRules'

export function useRules() {
  /**
   * @method handleRules
   * This takes the string values of the passed 'rules' prop
   * and returns the corresponding reserved functions stored in ~/utils/allRules.ts
   * ---
   * This is engineered for 4 reasons:
   * 1. To ensure having singularity for common validation rules all over the software
   * 2. To avoid multiple imports for the same rules in every parent component
   * 3. To isolate the rules as a business logic for unit testing and benchmarking
   * 4. To easily maintain the rules from ~/utils/allRules.ts file
   * ---
   * @returns Array<Function>
   */
  // const finalRules: any = []
  const handleRules = (rules: Array<string>) => {
    const finalRules = rules.map((ruleName: string) => {
      // @ts-ignore
      const func = (val: string) => ruleSpecs[ruleName](val, `auth.form.validation.${ruleName}`)
      return func
    })
    // console.log('final rules should be => ', finalRules)
    return finalRules
  }

  return { handleRules }
}
