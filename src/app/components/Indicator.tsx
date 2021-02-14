import * as React from "react";
import NetworkTables from "./NetworkTables";

interface IndicatorProps {
	ntTableKey: string;
	units: string;
	title: string;
}
interface IndicatorState {
	value: any;
}

export default class Indicator extends React.Component<IndicatorProps, IndicatorState>{
	constructor(props: IndicatorProps) {
		super(props);
		this.state = {
			value: "\u2588"
		};
		NetworkTables.addKeyListener(this.props.ntTableKey, this.updateDisplay, true);
	}
	private updateDisplay(key: string, value: string, isNew: boolean) {
		console.log(`Receiving ${key} with value: ${value}`);
		this.setState({value: value});
	}
	public render() {
		return <div className="circleContainer">
			<div className="circleIndicator">
				<span className="gradient">{this.state.value + this.props.units}</span>
			</div>
			<div className="circleTitle gradient">{this.props.title}</div>
		</div>;
	}
}