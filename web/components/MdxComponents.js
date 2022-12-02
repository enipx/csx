import { useEffect, useRef, useState } from "react";
import { SyntaxHighlighter } from "./SyntaxHighlighter";

export const defaultClass = {
  p: 'c-secondary-600 dm-c-secondary-200 lh-lg my-4',
  strong: 'c-dark fw-500 lh-lg my-5',
  h1: 'c-dark h3 lh-lg my-5 fw-700',
  h2: 'c-dark h4 lh-lg my-5 fw-700',
  h3: 'c-dark h5 lh-lg my-5 fw-700',
  h4: 'c-dark h6 lh-lg my-5 fw-700',
  h5: 'c-dark fz-xl lh-lg my-5 fw-700',
  h6: 'c-dark lh-lg my-5 fw-700',
  a: 'fw-500 c-primary-400 dm-c-primary-200',
  code: 'my-5 pb-5 bdb-secondary-50 dm-bdb-secondary-800',
  blockquote : 'mdxBlockquote px-4 py-1 bg-danger-50 bdrs-md bdl-brand bdw-4 fw-600',
  ul: 'px-8',
  ol: '',
  li: 'fz-sm fw-500 my-4 lis-disc c-secondary-600 dm-c-secondary-200',
  table: 'my-5 mah-80 ovy-auto',
};

const setupAnchor = props => {
  const id = props.children.replace(/ /g, "_").toLowerCase();
  const text = props.children;
  const modifyProps = props
  return [modifyProps, id, text];
}

export const Text = ({ props, type, anchor }) => {
  const elRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [modifyProps, id, text] = setupAnchor(props);

  useEffect(() => {
    if (anchor) {
      elRef.current.addEventListener("mouseover", () => setHovered(true));
      elRef.current.addEventListener("mouseleave", () => setHovered(false));
    }
  }, [])

  if (anchor) return (
    <p ref={elRef} className={`${defaultClass[type]}`} id={id}>
      <a href={`#${id}`} 
        className={`trs td-none fw-500 c-secondary-300 hover-c-brand ${hovered ? 'd-inline-block mr-2' : 'd-none'}`}>
        #
      </a>
      <span>{ text }</span>
    </p>
  );

  return (
    <p className={`${defaultClass[type]}`} {...props} />
  )
}

export const components = {
  a: props => <a className={defaultClass.a} {...props}/>,

  h1: props => <Text props={props} type="h1" anchor={true} />,

  h2: props => <Text props={props} type="h2" anchor={true} />,

  h3: props => <Text props={props} type="h3" anchor={true} />,

  h4: props => <Text props={props} type="h4" anchor={true} />,

  h5: props => <Text props={props} type="h5" anchor={true} />,

  h6: props => <Text props={props} type="h6" anchor={true} />,

  p: props => <p className={defaultClass.p} {...props} />,

  strong: props => <span className={defaultClass.strong} {...props} />,

  table: props => <div className={defaultClass.table}><table className="table" {...props} /></div>,

  code: props => <div className={defaultClass.code}><SyntaxHighlighter props={props} /></div>,

  ul: props => <ul className={defaultClass.ul} {...props} />,

  ol: props => <ol className={defaultClass.ol} {...props} />,

  li: props => <li className={defaultClass.li} {...props} />,

  blockquote: props => <blockquote className={defaultClass.blockquote} {...props} />,
}

