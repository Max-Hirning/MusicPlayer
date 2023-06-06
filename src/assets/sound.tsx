import * as React from "react";
import Svg, {SvgProps, Path} from "react-native-svg";

const SvgComponent = (props: SvgProps) => (
	<Svg fill="none" viewBox="0 0 24 24" {...props}>
		<Path
			strokeWidth={1.5}
			stroke={props.color}
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M3 11v2m3-5v8m3-6v4m3-7v10m3-13v16m3-11v6m3-4v2"
		/>
	</Svg>
);

export default SvgComponent;
