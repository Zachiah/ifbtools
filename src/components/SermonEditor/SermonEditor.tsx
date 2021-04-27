import Sermon from "util/Sermon";
import { ChangeEvent, useState, memo } from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import SermonEditorTopBar from "components/SermonEditorTopBar";
import { useSermon } from "state/useSermons";
import SermonTitleEditor from "components/SermonTitleEditor";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {
  Toolbar,
  Editor,
  EditorProvider,
  useEditorState,
  ChangeHandler,
} from "@aeaton/react-prosemirror";
import plugins from "./plugins";
import schema from "./schema";
import toolbar from "./toolbar";
import "./SermonEditor.scss";

import { createHTMLTransformer } from "@aeaton/prosemirror-transformers";
import { Store, useStore } from "state/Store";
import Dialog from "@material-ui/core/Dialog";
import { BibleVerse } from "util/Bible";
import { EditorState, Transaction } from "prosemirror-state";
import SelectChapterDialog from "components/SelectChapterDialog";

const transformer = createHTMLTransformer(schema);

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
  const [newVerseReference,setNewVerseReference] = useState("");
  const [tempTitle, setTempTitle] = useState(sermon.title);
  const [tempContent, setTempContent] = useState(
    sermon.content || "<div></div>"
  );
  const [open, setOpen] = useState(false);
  const [verseToInsert, setVerseToInsert] = useState<BibleVerse | null>(null);
  const [verseInsertCB, setVerseInsertCB] = useState<
    null | ((v: BibleVerse) => any)
  >(null);

  const closeDialog = () => setOpen(false);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTempTitle(e.target.value);
  };

  const hasChanges = !(
    sermon.title === tempTitle && sermon.content === tempContent
  );

  const valid = !!tempTitle;

  const save = () => {
    if (!valid) {
      return;
    }
    setSermon(new Sermon({ id: id, title: tempTitle, content: tempContent }));
  };

  console.log(open);
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

        <div className="SermonEditor-content-editor-wrapper">
          <EditorProvider
            doc={transformer.parse(sermon.content || "<div></div>")}
            plugins={plugins}
          >
            <Toolbar toolbar={toolbar} />
            <Editor />
            <ChangeHandler
              handleChange={(v) => {
                console.log(v);
                setTempContent(v);
              }}
              transformer={transformer}
            />
          </EditorProvider>
        </div>
      </div> 
    </>
  );
});
