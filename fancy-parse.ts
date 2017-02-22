import Component from "./fancy-component"

export type Parser = (s: string) => number

export module FancyParse {
const NumberParse: Parser = (s: string): number => {
  const hasMultipleNumbers = /[0-9,.]+[A-Za-z\s][0-9]/.test(s)
  if (hasMultipleNumbers) return
  
  const hasMultiplePeriods = s.split('.').length > 2
  if (hasMultiplePeriods) return

  const onlyNumeric = s.replace(/[^0-9\.]/ig, '')
  const result = parseFloat(onlyNumeric) || 0.0

  return result
}

const Percent: Parser = (s: string): number => {
  const number = NumberParse(s)

  if (number) return number / 100
  else        return
}

export function forType(t: Component.FancyType): Parser {
  switch (t) {
    case 'email':
    case 'text':
    case 'password':
      throw new Error('No fancy parser for type ' + t)
    case 'number':
    case 'money':
    case 'minutes':
    case 'hours':
      return NumberParse
    case 'percent':
      return Percent
  }
}
}

export default FancyParse