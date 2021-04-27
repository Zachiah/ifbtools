import { useParams } from "react-router";
import { useSermon } from "state/useSermons";
import SermonEditor from "components/SermonEditor/SermonEditor";
import "styles/md-editor-styles.css"



export default function Index() {
    const { id } = useParams<{ id: string }>();
    const [sermon, setSermon] = useSermon(id);

    
    return (
        <>
            {sermon ?
                <SermonEditor id={sermon.id} />
                :
                <p>That sermon doesn't exist</p>
            }
        </>
    )
}