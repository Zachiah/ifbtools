import Paper from "@material-ui/core/Paper";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Verse from "components/Verse";
import React, { forwardRef } from "react";
import { memo } from "react";
import ReactDOM from "react-dom";
import { BibleBooks, BibleVerse } from "util/Bible";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
    },
    h2: {
      padding: 0
    }
  })
);

export default memo(forwardRef(function ViewSermon({
  title,
  content,
}: {
  title: string;
  content: string;
},ref) {
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
  const styles = useStyles();
  const finder = String.raw`\[passage (.*?)\]`;
  const finderWithoutParens = String.raw`\[passage .*?\]`;
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
            if (attrs.verse.match(/\d+-\d+/)) {
              const [, start, end] = attrs.verse.match(/(\d+)-(\d+)/)!;

              if (+end <= +start) {
                return s;
              }

              let arr: number[] = [];

              for (let i = +start; i <= +end; i++) {
                arr = [...arr, i];
              }

              verse = arr.map(
                (v) =>
                  new BibleVerse({
                    book: attrs.book as BibleBooks,
                    chapter: +attrs.chapter,
                    verse: v,
                  })
              );
            } else {
              verse = new BibleVerse({
                book: attrs.book as BibleBooks,
                chapter: +attrs.chapter,
                verse: +attrs.verse,
              });
            }
          } catch {
            console.log("invalid verse string", s, m[1], attrs2Array);
            return s;
          }

          return Array.isArray(verse) ? (
            <>
              <Paper variant="outlined" className={styles.paper}>
                <h2 className={styles.h2}>
                  {verse[0].formattedBook} {verse[0]._chapter}
                </h2>
              </Paper>
              {verse.map((ve) => (
                <Verse key={ve.id} verse={ve} active={false} />
              ))}
            </>
          ) : (
            <Verse verse={verse} active={false} fullReference />
          );
        })(item.match(finder)!)
      : item
  );
  console.log(splitAndKeep(content, finder));
  console.log(replacedContent);

  return (
    <div ref={ref as any}>
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
    </div>
  );
}));
