import Sermon from "util/Sermon";
import { ChangeEvent, useState, memo, useEffect } from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import SermonEditorTopBar from "components/SermonEditor/SermonEditorTopBar";
import { useSermon } from "state/useSermons";
import SermonTitleEditor from "components/SermonTitleEditor";
import SermonContentEditor from "./SermonContentEditor";
import ViewSermon from "./ViewSermon";
import { Prompt } from "react-router";

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
  const [view, setView] = useState<boolean>(() =>
    new URL(window.location.href).searchParams.get("view") ? true : false
  );

  const hasChanges = tempContentHasChange || sermon.title !== tempTitle;
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

  useEffect(() => {
    const fn = (e: { preventDefault: () => void; }) => {
      if (hasChanges) {
        return "You have unsaved changes, are you sure you would like to leave?";
        e.preventDefault();
      }
    };
    console.log("adding listener")
    window.onbeforeunload =  fn;

    return () => void(window.onbeforeunload = null);
  });
  return (
    <>
      <Prompt
        when={hasChanges}
        message="You have unsaved changes, are you sure you would like to leave?"
      />
      <SermonEditorTopBar
        sermon={sermon}
        hasChanges={hasChanges}
        onSave={save}
        valid={valid}
        onView={() => setView(!view)}
        view={view}
      />

      <div className={classes.wrapper}>
        {view ? (
          <>
            <ViewSermon content={tempContent} title={tempTitle} />
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
    </>
  );
});
