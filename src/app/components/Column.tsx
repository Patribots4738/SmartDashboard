import * as React from "react";

interface ColumnProps {}
interface ColumnState {

}

export default class Column extends React.Component<ColumnProps, ColumnState>{
	constructor(props: ColumnProps) {
		super(props);
	}
	public render() {
		return <div className="column">
			{this.props.children}
		</div>;
	}
}