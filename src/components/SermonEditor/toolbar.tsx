import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import BoldIcon from "@material-ui/icons/FormatBold";
import { DraftInlineStyle, EditorState } from "draft-js";

export default function Toolbar({
  currentStyle,
  onToggle,
}: {
  currentStyle: DraftInlineStyle;
  onToggle: (a: string) => any;
}) {
  const buttons = [
    {
      style: "BOLD",
      icon: <BoldIcon />,
    },
  ];

  return (
    <ButtonGroup>
      {buttons.map((button) => (
        <Button key={button.style} onClick={() => onToggle(button.style)} variant={currentStyle.has(button.style) ? undefined : 'outlined'}>
          {button.icon}
        </Button>
      ))}
    </ButtonGroup>
  );
}
