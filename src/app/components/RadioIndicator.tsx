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
		NetworkTables.listenFor(this.props.ntTableKey, this.changeActive.bind(this));
	}
	private changeActive(key: string, value: string, isNew: boolean) {
		this.setState({active: this.props.values.indexOf(value)});
	}
	public render() {
		return <div className="radioDisplay">{
			...this.props.values.map(s => {
				return <div className={`radioButton${s === this.props.values[this.state.active] ? " selected gradient" : ""}`} key={s}>{s}</div>;
			})
		}</div>
	}
}