import * as React from "react"
import Component from "./fancy-component"

export abstract class IComponent<
  T, 
  P extends IComponent.Props<T>,
  S extends IComponent.State>
  extends Component<P, S> {

  constructor(props: P) {
    super(props)

    this.prettyValue = this.prettyValue.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onFocus = this.onFocus.bind(this)
    this.onBlur = this.onBlur.bind(this)
    this.onKeyUp = this.onKeyUp.bind(this)
    this.getClassName = this.getClassName.bind(this)
  }

  protected prettyValue(): string {
    return this.decorator(String(this.state.value))
  }

  protected onFocus(e: React.SyntheticEvent<HTMLInputElement>) {
    const next: IComponent.State = Object.assign({}, this.state)
    next.isActive = true
    this.setState(next)
  }
  protected onBlur(e: React.SyntheticEvent<HTMLInputElement>) {
    const next: IComponent.State = Object.assign({}, this.state)
    next.isActive = false
    this.setState(next)
  }

  protected getClassName(): string {
    return 'form-control'
      + (this.state.isValid
        ? ' form-control-valid'
        : ' form-control-invalid')
      + (this.state.isActive
        ? ' form-control-active'
        : ' form-control-inactive')
  }

  public render() {
    const [placeholder, value] = this.state.isTouched
      ? [undefined, this.state.isActive
        ? this.state.value
        : this.prettyValue()]
      : [String(this.state.value), undefined]
    return <div className="form-group">
      <label htmlFor="inputEmail3" 
        className="col-sm-12 control-label number-shower">
        {this.props.label}
      </label>
      <div className="col-sm-12">
        <input type="text" 
          className={this.getClassName()}
          placeholder={placeholder}
          onChange={this.onChange}
          value={value}
          onBlur={this.onBlur}
          onKeyUp={this.onKeyUp}
          onFocus={this.onFocus} />
      </div>
    </div>
  }

  protected abstract onChange(e: React.ChangeEvent<HTMLInputElement>): void
  protected abstract onKeyUp(e: React.KeyboardEvent<HTMLInputElement>): void
}
export module IComponent {
  export type FancyType = Component.FancyType
  export interface Props<T>
    extends Component.Props {
      onChange: (value: T) => void
    }
  export interface State 
    extends Component.State {
    
    isActive: boolean,
    isTouched: boolean,
    isValid: boolean,
    value: string
  }
}

export default IComponent