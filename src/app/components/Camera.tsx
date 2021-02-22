import * as React from "react";

const fetch = require("node-fetch");

interface CameraProps {
	url: string;
	maxheight?: boolean;
}
interface CameraState {
	setUrl: string;
	loaded: boolean;
}

export default class Camera extends React.Component<CameraProps, CameraState> {
	public static defaultProps = {maxheight: false} as CameraProps;
	constructor(props: CameraProps) {
		super(props);
		this.state = {
			setUrl: this.props.url,
			loaded: false
		}
		this.pollServer();
	}
	async pollServer() {
		try {
			await fetch(this.props.url);
			if (!this.state.loaded) {
				throw "Please reload the image";
			}
		} catch (e: unknown) {
			this.setState({loaded: false});
			this.tryImageReload();
		};
		setTimeout(this.pollServer.bind(this), 500);
	}
	private tryImageReload(e?: string) {
		if (!this.state.loaded) {
			console.log("Trying to reload image", this.props.url);
			this.setState({setUrl:""});
			this.setState({setUrl: this.props.url});
		}
	}
	public render() {
		return <img className="camera" src={this.state.setUrl} style={{
			width: this.props.maxheight ? "auto" : "100%",
			height: this.props.maxheight ? "100%" : "auto"
		}} onError={this.tryImageReload.bind(this)} onLoad={(()=>{this.setState({loaded: true})}).bind(this)}></img>;
	}
}
