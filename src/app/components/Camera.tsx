import * as React from "react";

interface CameraProps {
	url: string;
	maxheight?: boolean;
}
interface CameraState {

}

export default class Camera extends React.Component<CameraProps, CameraState> {
	public static defaultProps = {maxheight: false} as CameraProps;
	constructor(props: CameraProps) {
		super(props);
	}
	public render() {
		return <img className="camera" src={this.props.url} style={{
			width: this.props.maxheight ? "auto" : "100%",
			height: this.props.maxheight ? "100%" : "auto"
		}}></img>;
	}
}
