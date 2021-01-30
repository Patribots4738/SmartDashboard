import * as React from "react";

interface CameraProps {
	url: string
}
interface CameraState {

}

export default class Camera extends React.Component<CameraProps, CameraState> {
	constructor(props: CameraProps) {
		super(props);
	}
	public render() {
		return <div className="camera" style={{background: `url(${this.props.url})`}}></div>;
	}
}
