import Sermon from "util/Sermon";
import { ChangeEvent, useState, memo } from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import SermonEditorTopBar from "components/SermonEditorTopBar";
import { useSermon } from "state/useSermons";
import SermonTitleEditor from "components/SermonTitleEditor";
import SermonContentEditor from "./SermonContentEditor";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      marginBottom: theme.spacing(2),
    },
    wrapper: {
      padding: theme.spacing(2),
    },
  })
);

export default memo(function SermonEditor({ id }: { id: string }) {
  // We have verified in parent that it is a valid id
  const [sermon, setSermon] = useSermon(id) as [
    Sermon,
    (sermon: Sermon) => void
  ];

  const classes = useStyles();
  const [tempTitle, setTempTitle] = useState(sermon.title);

  const [tempContent, setTempContent] = useState(sermon.content);
  const [tempContentHasChange, setTempContentHasChanges] = useState(false);

  const hasChanges = tempContentHasChange || (sermon.title !== tempTitle);
  const valid = !!tempTitle;

  const save = () => {
    if (!valid) {
      return;
    }
    setSermon(
      new Sermon({
        id: id,
        title: tempTitle,
        content: tempContent,
      })
    );
    setTempContentHasChanges(false);
  };
  return (
    <>
      <SermonEditorTopBar
        sermon={sermon}
        hasChanges={hasChanges}
        onSave={save}
        valid={valid}
      />

      <div className={classes.wrapper}>
        <SermonTitleEditor
          value={tempTitle}
          onChange={setTempTitle}
          valid={valid}
        />

        <SermonContentEditor
          value={tempContent}
          onChange={() => setTempContentHasChanges(true)}
          onBlur={(v) => {
            setTempContent(v);
            console.log(v);
          }}
        />
      </div>
    </>
  );
});
