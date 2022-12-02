import Highlight, { defaultProps } from "prism-react-renderer";
import CopyToClipboard from "./CopyToClipboard";
import theme from "./SyntaxHighlighterTheme";
import parse from 'html-react-parser';

export const SyntaxHighlighter = ({ props }) => {
  let lang = props.className || 'language-css';
  lang = lang.split('-');
  lang = lang.length > 1 ? lang[1] : lang[0];

  let hasPreview = false;
  let previewCode;
  let previewClass = {
    rose: 'bg-danger-50',
    default: 'bg-secondary-50 dm-bg-secondary-900 dm-bd-secondary-800 dm-bdb-secondary-900'
  }

  const code = props.children.replace(
    /<template\s+(?:class="([^"]*)"\s+)?preview(?:\s+class="([^"]*)")?>(.*?)<\/template>/is,
    (contentP, cls1, cls2, content) => {
      hasPreview = true;
      previewCode = content;
      return ''
    }
  ).trim();

  return (
    <div className="my-5">
      {
        hasPreview &&
          <div className={`p-6 bdrsx-xl whs-normal ${previewClass[props.metastring || 'default']}`}>
            { parse(`${previewCode}`) }
          </div>
      }
      <Highlight 
        {...defaultProps} 
        theme={theme} 
        code={code} 
        language={lang}>

        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre 
            className={`pos-relative fw-500 fz-sm p-4 ovx-auto ${hasPreview ? 'bdrsy-xl' : 'bdrs-xl'} ${className}`} 
            style={style}>

            <CopyToClipboard 
              value={code} 
              style="c-secondary-200 hover-c-white pos-top-right mt-4 mr-4" size="xs" 
              />
            {
              tokens.map((line, i) => (
                <div {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => (
                    <span {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))
            }
          </pre>
        )}

      </Highlight>
    </div>  
  )
}
