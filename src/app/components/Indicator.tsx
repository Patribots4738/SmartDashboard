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
			value: null
		};
		NetworkTables.addKeyListener(this.props.ntTableKey, this.updateDisplay, true);
	}
	private updateDisplay(key: string, value: string, isNew: boolean) {
		this.setState({value: value});
	}
	public render() {
		return <div className="circularIndicator">
			<span>{this.state.value + this.props.units}</span>
		</div>;
	}
}