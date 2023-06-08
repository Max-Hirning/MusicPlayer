import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const SvgComponent = (props: SvgProps) => (
	<Svg fill="none" viewBox="0 0 24 24" {...props}>
		<Path
			strokeWidth={2}
			d="m13 15-3-3 3-3"
			stroke={props.color}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</Svg>
);

export default SvgComponent;
