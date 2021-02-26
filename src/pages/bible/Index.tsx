import { useEffect } from "react";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import lastPages from "util/LastPages";

export default function Index() {
    const [redirectTo, setRedirectTo] = useState<null | string>(null);

    useEffect(() => {
        setRedirectTo( lastPages.bible || '/bible/genesis/1')
    },[])
    return (<>{redirectTo && <Redirect to={redirectTo} />}</>)
}