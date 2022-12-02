import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

const mdxBaseDir = join(process.cwd(), "mdx/docs/");
const mdxExt = ".mdx";

export const getAllMdxFiles = () => {
  let res = [], folders = [];
  const data = fs.readdirSync(mdxBaseDir);

  data.forEach(name => {
    if (name.includes(mdxExt)) {
      res.push({name, folder: ''})
    } else {
      folders.push(name);
    }
  });

  folders.forEach(folder => {
    const path = join(mdxBaseDir, folder);
    const pathFiles = fs.readdirSync(path);

    pathFiles.forEach(name => {
      if (name.includes(mdxExt)) {
        res.push({name, folder})
      }
    })
  });

  return res;
};

export const getAllMdx = (fields = []) => {
  const res = getAllMdxFiles();

  const files = res
    .map((file) => (
      {
        ...getMdxFile(file, fields),
        folder: file.folder
      }
    ));

  return files;
}

export const getMdxFile = (file, fields = []) => {
  let folder = '';
  
  if (file.folder) {
    folder = file.folder
  } else {
    let name = file.name;
    if (!name.includes(mdxExt)) {
      name = name + mdxExt
    }
    const res = getAllMdxFiles().filter(data => data.name === name);
    folder = res[0].folder;
  }
  const mdxName = file.name.replace(/\.mdx$/, "");
  const mdxPath = join(mdxBaseDir, folder ,`${mdxName}.mdx`);
  const mdxContent = fs.readFileSync(mdxPath, "utf8");
  const { data, content } = matter(mdxContent);
  const items = {};

  if (fields && fields.length > 0) {
    fields.forEach((field) => {
      if (field === "name") {
        items[field] = mdxName
      }
      if (field === "content") {
        items[field] = content
      }

      if (data[field]) {
        items[field] = data[field]
      }
    })
  }

  return items
}

export const importAll = r => {
  return r.keys().map(fileName => {
    return {
      fileName,
      module: r(fileName)
    }
  })
}

export const createPageLink = (files, base = 'docs') => {
  return importAll(files).reduce((acc, cur) => {
    let slug = cur.fileName.substr(2).replace(/\.mdx$/, '');
    let category = base.split('/')[1];
    return {
      ...acc,
      [slug]: { 
        ...cur.module.default,
        href: `/docs/${slug}`,
        title: slug,
        category: category ? category : "documentation",
      },
    }
  }, {})
}

const valueExistInArr = (arr, val) => {
  const res = arr ? arr.includes(val) : false;
  return res;
}

export const getArrSearchResult = ({search, value, all}) => {
  let res = "", prev = "", next = "";
  let resObj = {
    documentation: {},
    utilities: {},
    components: {}
  }
  let resKeyArr = [];
  
  const arrFlatten = Object.entries(search).map(res => res[1]);
  const arrFlattenKey = arrFlatten.map(res => Object.keys(res));

  const lValue = value.toLowerCase();

  if (value) {
    arrFlattenKey.forEach((sec, index) => {
      sec.forEach((key, keyIndex) => {
        const lKey = key.toLowerCase();

        arrFlatten[index][key].forEach((cur, curIndex) => {

          const lCurTitle = cur ? cur.title.toLowerCase() : '';

          if (!all && cur && cur.title == value) {
            // Single Result
            const conLength = arrFlatten[index][key].length - 1;
            res = key;
            
            // Next
            if (curIndex < conLength) {
              next = curIndex + 1;
              next = arrFlatten[index][key][next];
            } else {
              next = curIndex;
              const summary = {
                type: arrFlatten[index][key],
                typeIndex: index,
                typeLength: arrFlattenKey[index].length - 1,
                name: key,
                nameIndex: arrFlattenKey[index].indexOf(key),
              };

              if (summary.nameIndex === summary.typeLength) {
                const secType = arrFlattenKey[arrFlattenKey.length - 1];

                if (
                  secType.indexOf(summary.name) === summary.typeLength 
                  && index === summary.typeIndex
                ) {
                  next = "";
                } else {
                  const cat = arrFlatten[index + 1][
                    arrFlattenKey[index + 1][0]
                  ];
                  next = cat[0];  
                }
                
              } else {
                const cat = arrFlattenKey[index][summary.nameIndex + 1];
                next = arrFlatten[index][cat][0];
              }
            }

            // Prev
            if (curIndex > 0) {
              prev = curIndex - 1;
              prev = arrFlatten[index][key][prev];
            } else {
              prev = curIndex;
              const summary = {
                type: arrFlatten[index][key],
                typeIndex: index,
                typeLength: arrFlattenKey[index].length - 1,
                name: key,
                nameIndex: arrFlattenKey[index].indexOf(key),
              };

              if (summary.nameIndex > 0) {
                const cat = arrFlattenKey[index][summary.nameIndex - 1];
                const catLength = arrFlatten[index][cat].length;
                prev = arrFlatten[index][cat][catLength - 1];
              } else {

                if (arrFlattenKey[0].indexOf(summary.name) === 0 && index === 0) {
                  prev = "";
                } else {
                  const cat = arrFlatten[index - 1][
                    arrFlattenKey[index - 1][arrFlattenKey[index - 1].length - 1]
                  ];
                  const catLength = cat.length - 1;
                  prev = cat[catLength];
                }

              }
            }
            
            return;

          } else if (
              (all && cur && lCurTitle.includes(lValue)) || 
              (all && cur && lKey.includes(value.toLowerCase()))
            ) {
            // Multiple Result
            const keyObj = resObj[cur.category];

            if (keyObj[key] && !valueExistInArr(keyObj[key], cur.title)) {
              keyObj[key].push(cur);
              resKeyArr.push(key);

            } else if (keyObj[key] === undefined) {
              keyObj[key] = [cur];
              resKeyArr.push(key);

            } else {
              keyObj[key] = [];
              resKeyArr.push(key);
            }
          }
        })

      })
    })
  }

  return all 
          ? {
            nav: resObj,
            toggle: resKeyArr
          } 
          : {
            res,
            prev,
            next,
          };
}

export const copyToClipboard = val => {
  if (val) {
    const el = document.createElement("textarea");
    el.value = val;
    el.setAttribute("readonly", "");
    el.style.position = "absolute";
    el.style.left = "-9999px";
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  }
}

export const isObject = (val) => (
  typeof val === 'object' &&
  !Array.isArray(val) &&
  val !== null
)

export const isArray = (val) => Array.isArray(val);