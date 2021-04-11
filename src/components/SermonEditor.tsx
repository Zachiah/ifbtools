import Sermon from "util/Sermon";
import MDEditor, { commands, ICommand } from "@uiw/react-md-editor";
import { ChangeEvent, ChangeEventHandler, useEffect, useRef, useState, memo, ReactElement, FunctionComponent, ReactNode } from "react";
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import SermonEditorTopBar from "components/SermonEditorTopBar";
import { useSermon } from "state/useSermons";
import SermonTitleEditor from "components/SermonTitleEditor";
import Verse from "./Verse";
import bible from "util/Bible";



const sermonTitleCommand: ICommand = {
    name: 'Sermon Title',
    icon: (
        <p>The light of the world is Jesus</p>
    )
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        title: {
            marginBottom: theme.spacing(2)
        },
        wrapper: {
            padding: theme.spacing(2)
        }
    }),
);

const renderers: {inlineCode: FunctionComponent} = {
    inlineCode: ({children: _children}: {children?: ReactNode}) => {
        const children = _children +"";
        const match = children.match(/(.+?) (\d+):(\d+)/)
        if (match) {
            try {
            return (<Verse fullReference active={false} verse={bible.books[match[1]].getChapter(+match[2]).getVerse(+match[3])}/>)
            }
            catch {
                return <>{children}</>
            }
        }
        else {
            return <>{children}</>;
        }
    }
};

export default memo(function SermonEditor({ id }: { id: string }) {

    // We have verified in parent that it is a valid id
    const [sermon, setSermon] = useSermon(id) as [Sermon, (sermon: Sermon) => void];


    const classes = useStyles();
    const [tempTitle, setTempTitle] = useState(sermon.title);
    const [tempContent, setTempContent] = useState(sermon.content);

    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTempTitle(e.target.value);
    }

    const hasChanges = !(
        sermon.title === tempTitle &&
        sermon.content === tempContent
    )

    const valid = !!tempTitle

    const save = () => {
        if (!valid) {
            return
        }
        setSermon(new Sermon({ id: id, title: tempTitle, content: tempContent }))
    }
    return (
        <>
            <SermonEditorTopBar
                sermon={sermon}
                hasChanges={hasChanges}
                onSave={save}
                valid={valid}
            />

            <div className={classes.wrapper}>
                <SermonTitleEditor value={tempTitle} onChange={setTempTitle} valid={valid}/>
                <MDEditor
                    value={tempContent}
                    onChange={(v) => setTempContent(v + "")}
                    preview="edit"
                    previewOptions={{renderers}}
                    commands={[
                        sermonTitleCommand,
                        commands.bold,
                        commands.italic,
                        commands.hr,
                        commands.title,
                        commands.divider,
                        commands.quote,
                        commands.image,
                        commands.divider,
                        commands.checkedListCommand,
                        commands.orderedListCommand,
                        commands.unorderedListCommand,
                        commands.codePreview,
                        commands.codeLive,
                        commands.codeEdit,
                        
                    ]}
                    height={400}
                />

            </div>
        </>
    )
});