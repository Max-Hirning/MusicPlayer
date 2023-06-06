import * as React from "react";
import Svg, {SvgProps, G, Path} from "react-native-svg";

const SvgComponent = (props: SvgProps) => (
	<Svg fill="none" viewBox="0 0 24 24" {...props}>
		<G
			strokeWidth={2}
			stroke={props.color}
			strokeLinecap="round"
			strokeLinejoin="round">
			<Path d="M14 6.5v11c0 .465 0 .697.038.89a2 2 0 0 0 1.572 1.571c.193.039.425.039.89.039s.697 0 .89-.039a2 2 0 0 0 1.571-1.57c.039-.194.039-.426.039-.891v-11c0-.465 0-.697-.039-.89a2 2 0 0 0-1.57-1.572C17.196 4 16.964 4 16.5 4s-.697 0-.89.038a2 2 0 0 0-1.572 1.572C14 5.803 14 6.035 14 6.5ZM5 6.5v11c0 .465 0 .697.038.89a2 2 0 0 0 1.572 1.571c.193.039.425.039.89.039s.697 0 .89-.039a2 2 0 0 0 1.571-1.57c.039-.194.039-.426.039-.891v-11c0-.465 0-.697-.039-.89a2 2 0 0 0-1.57-1.572C8.196 4 7.964 4 7.5 4s-.697 0-.89.038A2 2 0 0 0 5.038 5.61C5 5.803 5 6.035 5 6.5Z" />
		</G>
	</Svg>
);

export default SvgComponent;
