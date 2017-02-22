import Component from "./fancy-component"

interface Props extends Component.Props {
}
interface State extends Component.State {
}

export class FancyDisplay 
  extends Component<Props, State> {
}

export default FancyDisplay