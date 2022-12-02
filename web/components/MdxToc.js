const setupToc = source => {
  const regex = /(mdx\("h2"(.*?))\)/g;

  if (source.match(regex)) {
    return source.match(regex).map((content) => {
      let text = '', link = '';
      text = content.match(/\"(.*?)\"/g);
      text = text && text[text.length - 1].replace(/"/g, "");
      link = text.replace(/ /g, "_").toLowerCase()

      return {
        text,
        link: `#${link}`,
      };
    });
  }

  return [];
}

const MdxToc = ({ source, style, css }) => {

  const content = setupToc(source.compiledSource);

  if (content.length > 0) return (
    <div className={`w-0 xl-w-44 ov-hidden ${style}`} style={css}>
      <div className="bg-light py-6 px-4 bdrs-md bd-secondary-100 dm-bd-secondary-800">
        <p className="my-4 fz-xs fw-600 tt-uppercase c-secondary-800 dm-c-secondary-100">
          Table of Content
        </p>
        <ul>
          {
            content && content.map(con => (
              <li key={con.link}>
                <a className="fz-sm fw-500 td-none d-block my-3 tt-capitialize c-secondary-500 dm-c-secondary-300" href={con.link}>{con.text}</a>
              </li>
            ))
          }
        </ul>
      </div>
        
    </div>
  )

  return null;
}

export default MdxToc
