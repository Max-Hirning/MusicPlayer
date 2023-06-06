import * as React from "react";
import Svg, {SvgProps, Path} from "react-native-svg";

const SvgComponent = (props: SvgProps) => (
	<Svg fill="none" viewBox="0 0 24 24" {...props}>
		<Path
			strokeWidth={2}
			stroke={props.color}
			strokeLinecap="round"
			strokeLinejoin="round"
			d="m15 15 6 6m-11-4a7 7 0 1 1 0-14 7 7 0 0 1 0 14Z"
		/>
	</Svg>
);

export default SvgComponent;
