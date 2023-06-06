import * as React from "react";
import Svg, {SvgProps, Path} from "react-native-svg";

const SvgComponent = (props: SvgProps) => (
	<Svg fill="none" viewBox="0 0 24 24" {...props}>
		<Path
			strokeWidth={2}
			stroke={props.color}
			strokeLinecap="round"
			strokeLinejoin="round"
			d="m17 16-4-4 4-4m-6 8-4-4 4-4"
		/>
	</Svg>
);

export default SvgComponent;
