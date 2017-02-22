import IComponent from "./fancy-icomponent"
import Parser from "./fancy-parse"

interface Props extends IComponent.Props<number> {
}
interface State extends IComponent.State {
}

export class FancyNumber 
  extends IComponent<number, Props, State> {

  constructor(props: Props) {
    super(props)

    this.state = {
      isActive: false,
      isTouched: false,
      isValid: true,
      value: props.defaultValue
    }
  }

  protected onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const next: State = Object.assign({}, this.state)
    const raw: string = e.target.value
    const value = this.parser(raw)

    next.isActive = true
    next.isTouched = true
      next.value = raw

    if (value)
      this.props.onChange(value)
    
    next.isValid = /^\d*\.?\d*$/.test(raw)

    this.setState(next)
  }
  protected onKeyUp(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!this.state.isValid)
      return

    let factor = 1
    if (e.shiftKey)
      factor = 10
    else if (e.ctrlKey)
      factor = 100

    const increment = factor

    let next: State = Object.assign({}, this.state)
    const value = Parser.forType('number')(next.value)
    // const value = this.parser(next.value)
    next.isActive = true
    next.isTouched = true

    if (e.key == 'ArrowUp')
      next.value = String(value + increment)
    if (e.key == 'ArrowDown')
      next.value = String(value - increment)

    this.props.onChange(value)
    this.setState(next)
  }
}






/*

class NumberHolder extends React.Component<
  NumberHolderProps, NumberHolderState> {

  constructor(props: NumberHolderProps) {
    super(props)
    this.state = {
      value: '' + props.value,
      isValid: true
    }

    this.onKeyUp = this.onKeyUp.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onBlur = this.onBlur.bind(this)
  }
  onKeyUp(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!this.state.isValid)
      return

    let increment = this.props.inputType == 'percent' ? 0.01 : 1.0

    if (e.shiftKey)
      increment = increment * 10

    let next: NumberHolderState = Object.assign({}, this.state)

    switch (e.key) {
      case 'ArrowUp':
        this.props.onValue(this.props.value + increment)
        break
      case 'ArrowDown':
        this.props.onValue(this.props.value - increment)
        break
    }
    
  }
  onChange(e: React.ChangeEvent<HTMLInputElement>) {

    const value = e.target.value
    let validator: Validator = numberValidator

    switch(this.props.inputType) {
      case 'email':
      case 'text':
      case 'password':
        // string validator?
      case 'minutes':
      case 'hours':
      case 'number':
        validator = numberValidator
        break
      case 'percent':
        validator = percent
        break
      case 'money':
        validator = money
        break
    }

    const isValid = validator.isValid(value)

    if (isValid) {
      this.props.onValue(validator.value(value))
    }

    let next: NumberHolderState = Object.assign({}, this.state)
    next.value = e.target.value
    next.isValid = isValid
    this.setState(next)
  }
  onBlur(e: React.SyntheticEvent<HTMLInputElement>) {
    if (!this.state.isValid)
      return

    // Maybe do something here to format input:
  }
  render() {
    // let prefix = ''
    // let suffix = ''
    // let value = undefined
    // if (typeof this.props.value === 'number' && !isNaN(this.props.value))
    //   value = this.props.value

    // if (typeof value === 'undefined' || isNaN(value))
    //   value = 0
    // switch (this.props.inputType) {
    //   case 'minutes':
    //     suffix = ' minute(s)'
    //     value = '' + Math.round(this.props.value)
    //     break
    //   case 'hours':
    //     suffix = ' hour(s)'
    //     value = '' + Math.round(this.props.value)
    //     break
    //   case 'number':
    //     value = '' + Math.round(this.props.value)
    //     break
    //   case 'percent':
    //     suffix = ' %'
    //     value = (this.props.value * 100).toFixed(0)
    //     break
    //   case 'money':
    //     prefix = '$ '
    //     value = this.props.value.toFixed(2)
    //     break
    // }
    // value = prefix + value + suffix

    return <div className="form-group">
      <label htmlFor="inputEmail3" 
        className="col-sm-12 control-label">
        {this.props.label}
      </label>
      <div className="col-sm-12">
        <input type="text" 
          className={'form-control'
            + (this.state.isValid
              ? ' form-control-valid'
              : ' form-control-invalid')}
          placeholder={this.props.placeholder}
          onChange={this.onChange}
          value={this.state.value}
          onBlur={this.onBlur}
          onKeyUp={this.onKeyUp} />
      </div>
    </div>
  }
}*/