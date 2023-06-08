import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const SvgComponent = (props: SvgProps) => (
	<Svg fill="none" viewBox="0 0 24 24" {...props}>
		<Path
			strokeWidth={2}
			stroke={props.color}
			strokeLinecap="round"
			strokeLinejoin="round"
			d="m9 13.5 6 3m0-9-6 3M18 21a3 3 0 1 1 0-6 3 3 0 0 1 0 6ZM6 15a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm12-6a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"
		/>
	</Svg>
);

export default SvgComponent;
