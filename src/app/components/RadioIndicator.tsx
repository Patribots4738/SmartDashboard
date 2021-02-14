import * as React from "react";
import NetworkTables from "./NetworkTables";

interface RIndicatorProps {
	ntTableKey: string;
	values: string[];
}
interface RIndicatorState {
	active: number;
}

export default class RadioIndicator extends React.Component<RIndicatorProps, RIndicatorState>{
	constructor(props: RIndicatorProps) {
		super(props);
		this.state = {
			active: 0
		};
		NetworkTables.addKeyListener(this.props.ntTableKey, this.changeActive, true);
	}
	private changeActive(key: string, value: string, isNew: boolean) {
		console.log(`Receiving ${key} with value: ${value}`);
		this.setState({active: this.props.values.indexOf(value)});
	}
	public render() {
		return <div className="radioDisplay">{
			...this.props.values.map(s => {
				return <div className={`radioButton ${s === this.props.values[this.state.active] ? "selected" : ""}`} key={s}>{s}</div>;
			})
		}</div>
	}
}