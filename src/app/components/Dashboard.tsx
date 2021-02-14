import * as React from "react";
import Camera from "./Camera";
import Column from "./Column";
import Indicator from "./Indicator";
import RadioIndicator from "./RadioIndicator";
import NetworkTables from "./NetworkTables";

interface DashProps {

}
interface DashState {

}

export default class Dashboard extends React.Component<DashProps, DashState> {
	constructor(props: DashProps) {
		super(props);
	}
	public render() {
		return <>
			<Column>
				<Camera url="https://dummyimage.com/320x240/000/fff.png&text=Ball+Camera"/*"http://10.47.38.46:5800/stream.mjpg"*/></Camera>
				<RadioIndicator ntTableKey="driveMode" values={["Torque", "Speed"]}></RadioIndicator>
			</Column>
			<Column>
				<Camera url="https://dummyimage.com/240x160/000/fff.png&text=Driver+Camera"/*"http://10.47.38.109:1181/stream.mjpg"*/ maxheight={true}></Camera>
			</Column>
			<Column>
				<Camera url="https://dummyimage.com/320x240/000/fff.png&text=Shooter+Camera"/*"http://10.47.38.42:5800/stream.mjpg"*/></Camera>
				<div className="indicatorBox">
					<Indicator title="Angle from target" units={"\xB0"} ntTableKey="angleFromTarget"></Indicator>
					<Indicator title="Is Aligned" units="" ntTableKey="aligned"></Indicator>
				</div>
				<div className="indicatorBox">
					<Indicator title="Distance from target" units="ft" ntTableKey="distFromTarget"></Indicator>
				</div>
			</Column>
		</>;
	}
}

setInterval(function() {
	console.log("Aligned is equal to:" + NetworkTables.getValue("/SmartDashboard/aligned"));
}, 500);