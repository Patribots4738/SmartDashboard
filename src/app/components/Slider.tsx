import * as React from "react";
import NetworkTable from "./NetworkTables";

interface SliderProps {
	min: number;
	max: number;
	initial: number;
	step: number;
	title: string;
	ntTableKey?: string;
}
interface SliderState {
	value: number;
}

export default class Slider extends React.Component<SliderProps, SliderState> {
	constructor(props: SliderProps) {
		super(props);
		this.state = {
			value: this.props.initial
		}
	}
	changedValue(e: React.FormEvent<HTMLInputElement>) {
		let value = Number((e.target as HTMLInputElement).value);
		if (this.props.ntTableKey) {
			NetworkTable.putValue(this.props.ntTableKey, value);
		}
		this.setState({value: value});
	}
	render() {
		return <div className="slider">
			<div className="sliderTitle">{this.props.title}</div>
			<div className="flexRow">
				<input type="range" min={this.props.min} max={this.props.max} step={this.props.step} onInput={this.changedValue.bind(this)} value={
					this.props.initial === this.state.value ? this.props.initial : this.state.value
				}></input>
				<div className="sliderValue">{this.state.value}</div>
			</div>
		</div>
	}
}