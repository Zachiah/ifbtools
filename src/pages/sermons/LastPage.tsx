import { useEffect } from "react";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import lastPages from "util/LastPages";

export default function LastPage() {
  const [redirectTo, setRedirectTo] = useState<null | string>(null);

  useEffect(() => {
    setRedirectTo(lastPages.sermons || "/sermons/");
  }, []);
  return <>{redirectTo && <Redirect to={redirectTo} />}</>;
}
