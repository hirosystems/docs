import { AnnotationHandler, InnerLine } from "codehike/code";

export const lineNumbers: AnnotationHandler = {
  name: "line-numbers",
  Line: (props) => {
    const width = props.totalLines.toString().length + 1;
    return (
      <>
        <span
          style={{ minWidth: `${width}ch` }}
          className="text-right text-code-line-number select-none mr-1"
        >
          {props.lineNumber}
        </span>
        <InnerLine merge={props} />
      </>
    );
  },
};
