import Verse from "components/Verse";
import React from "react";
import { memo } from "react";
import ReactDOM from "react-dom";
import { BibleBooks, BibleVerse } from "util/Bible";

export default memo(function ViewSermon({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  const splitAndKeep = function (
    str: string,
    separator: string,
    method: "seperate" | "infront" | "behind" = "seperate"
  ) {
    let _str;
    if (method === "seperate") {
      _str = str.split(new RegExp(`(${separator})`, "g"));
    } else if (method === "infront") {
      _str = str.split(new RegExp(`(?=${separator})`, "g"));
    } else if (method === "behind") {
      _str = str.split(new RegExp(`(.*?${separator})`, "g"));
    }
    _str = (_str as string[]).filter(function (el) {
      return el !== "";
    });
    return _str;
  };

  const finder = String.raw`\[passage (.*?)\]`;
  const finderWithoutParens = String.raw`\[passage .*?\]`
  let replacedContent = splitAndKeep(content, finderWithoutParens).map((item) =>
    item.match(finder)
      ? ((m) => {
          const s = m[0];
          const attrs2Array = m[1]
            .split(/ /)
            .map((i: string) => i.split("=")) as [[string, string]];

          let verse;
          try {
            const attrs = Object.fromEntries(
              attrs2Array.map((i: [string, string]) => [
                i[0],
                i[1].replaceAll('"', ""),
              ])
            );
            verse = new BibleVerse({
              book: attrs.book as BibleBooks,
              chapter: +attrs.chapter,
              verse: +attrs.verse,
            });
          } catch {
            console.log("invalid verse string", s, m[1], attrs2Array);
            return s;
          }

          return <Verse verse={verse} active={false} fullReference />;
        })(item.match(finder)!)
      : item
  );
console.log(splitAndKeep(content,finder))
  console.log(replacedContent);

  return (
    <>
      <h1>{title}</h1>
      {replacedContent.map((replacedContentItem, i) => (
        <React.Fragment key={i}>
          {typeof replacedContentItem !== "string" ? (
            replacedContentItem
          ) : (
            <div dangerouslySetInnerHTML={{ __html: replacedContentItem }} />
          )}
        </React.Fragment>
      ))}
    </>
  );
});
