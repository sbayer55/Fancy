import Component from "./fancy-component"
import FancyParse from "./fancy-parse"

export type Decorator = (s: string) => string

export module FancyDecorator {
const NumberDecorator: Decorator = (s: string): string => {
  const parser = FancyParse.forType('number')
  const value: number = parser(s);

  if (value) return '' + Math.round(value)
  else       return
}

const Hour: Decorator = (s: string): string => {
  const parser = FancyParse.forType('hours')
  const value: number = Math.round(parser(s))

  if (value)
    return value.toLocaleString() + (value == 1 ? ' hour' : ' hours')
  else
    return
}

const Minute: Decorator = (s: string): string => {
  const parser = FancyParse.forType('minutes')
  const value: number = Math.round(parser(s))

  if (value)
    return value.toLocaleString()
      + (value == 1 ? ' minute' : ' minutes')
  else
    return
}

const Money: Decorator = (s: string): string => {
  const parser = FancyParse.forType('money')
  const value: number = parser(s);

  if (value) {
    return '$ ' + value.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
  }
  else       return
}

const Percent: Decorator = (s: string): string => {
  const parser = FancyParse.forType('percent')
  const value: number = parser(s);

  if (value) return Math.round(value * 100) + ' %'
  else       return
}

export function forType(t: Component.FancyType): Decorator {
  switch (t) {
    case 'email':
    case 'text':
    case 'password': throw new Error('No fancy parser for type ' + t)
    case 'number':   return NumberDecorator
    case 'money':    return Money
    case 'minutes':  return Minute
    case 'hours':    return Hour
    case 'percent':  return Percent
  }
}
}

export default FancyDecorator