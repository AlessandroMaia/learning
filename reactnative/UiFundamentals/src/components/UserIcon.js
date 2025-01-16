import Svg, {
  Circle,
  ClipPath,
  Defs,
  Ellipse,
  G,
  Path,
} from "react-native-svg";

export function UserIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={100}
      height={100}
      viewBox="0 0 100 100"
      fill="none"
      {...props}
    >
      <G fill="#000" clipPath="url(#a)">
        <Circle cx={50} cy={102} r={47} />
        <Ellipse cx={50} cy={30} rx={21} ry={20} />
      </G>
      <Defs>
        <ClipPath id="a">
          <Path fill="#fff" d="M0 0h100v100H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
