import * as React from "react"
import FancyDecorator, { Decorator } from "./fancy-decorator"
import FancyParser, { Parser } from "./fancy-parse"

export class Component<
  P extends Component.Props, 
  S extends Component.State> 
  extends React.Component<P, S> {

  protected decorator: Decorator
  protected parser: Parser

  constructor(props: P) {
    super(props)
    this.decorator = FancyDecorator.forType(this.props.fType)
    this.parser = FancyParser.forType(this.props.fType)

    this.prettyValue = this.prettyValue.bind(this)
    this.getClassName = this.getClassName.bind(this)
  }

  protected prettyValue(): string {
    return this.decorator(String(this.props.defaultValue))
  }

  protected getClassName(): string {
    return 'number-shower'
  }

  render() {
    return <div className="form-group">
      <label htmlFor="inputEmail3" 
        className="col-sm-12 control-label number-shower">
        {this.props.label}
      </label>
      <div className="col-sm-12">
        <span className={this.getClassName()}>
          {this.prettyValue()}
        </span>
      </div>
    </div>
  }
}
export module Component {
  export type FancyType = 'email' | 'text' | 'password' | 'number' | 'percent' 
  | 'money' | 'minutes' | 'hours'
  export interface Props {
    fType: FancyType,
    defaultValue: string,
    label: string
  }
  export interface State {}  
}

export default Component