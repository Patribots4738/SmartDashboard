import * as React from "react";

const fetch = require("node-fetch");

interface CameraProps {
	url: string;
	maxheight?: boolean;
}
interface CameraState {
	setUrl: string;
}

export default class Camera extends React.Component<CameraProps, CameraState> {
	public static defaultProps = {maxheight: false} as CameraProps;
	constructor(props: CameraProps) {
		super(props);
		this.state = {
			setUrl: this.props.url
		}
		this.pollServer();
	}
	pollServer() {
		fetch(this.props.url).then((res: any) => {
			if (res) {
				if (Number(res.headers.get("content-length")) < 100) {
					this.reloadStream();
				}
			} else {
				this.reloadStream();
			}
			setTimeout(this.pollServer.bind(this), 500);
		}).catch((e: unknown) => {
			this.reloadStream();
			setTimeout(this.pollServer.bind(this), 500);
		});
		
	}
	reloadStream() {
		this.setState({setUrl: "https://dummyimage.com/240x160/000/fff.png"});
		this.setState({setUrl: this.props.url});;
	}
	public render() {
		return <img className="camera" src={this.state.setUrl} style={{
			width: this.props.maxheight ? "auto" : "100%",
			height: this.props.maxheight ? "100%" : "auto"
		}} onError={this.reloadStream.bind(this)}></img>;
	}
}
