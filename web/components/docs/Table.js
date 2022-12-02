import React, { useEffect, useState } from 'react';
import { isObject, isArray } from '../../utils/base';
import { getSassVariable } from '../../utils/variable';
import { defaultClass } from '../MdxComponents';
import { SyntaxHighlighter } from '../SyntaxHighlighter';

export const DocsTable = (props) => {
  const [data, setData] = useState({
    keys: [],
    properties: [],
    alias: undefined
  });

  useEffect(() => {
    getSassVariable()
      .then(res => {
        const alias = {};
        const properties = isArray(props.name) && props.name.length > 0
          ? (
            {
              ...res[props.name[0]]?.[0],
              mapValue: [].concat.apply(
                [],
                props.name.map((properyName) => {
                  return res[properyName]?.[0]?.mapValue;
                }),
              )
            }
          )
          : res[props.name]?.[0];

        if ((!properties.mapValue && properties.value) || props.ignoreMapValue) {
          const restructureValue = properties.value
            ?.trim?.()
            ?.slice?.(1, -1)
            ?.replaceAll?.(
              props?.replaceValue?.value || '',
              props?.replaceValue?.newValue || ''
            )
            ?.split?.(',')
            .map(val => {
              const split = val?.trim?.()?.split(':');
              const value = split[1]?.replace?.(
                props?.replaceValue?.newValue || '',
                props?.replaceValue?.value || ''
              );

              const res = {
                name: split[0],
                value: props?.ignoreString 
                  ? value?.replace?.(/[']/g, '') 
                  : value,
              };
              return res;
            });
          properties.mapValue = restructureValue || [];
        }

        if (props?.alias?.length > 0) {
          props.alias.forEach(item => {
            alias[item] = res.keys?.[0]?.mapValue?.
              filter((key) => {
                return key.name === (item || props.keyname || props.name)
              })?.[0];
          })
        }

        const utils = {
          properties,
          keys: res.keys?.[0]?.mapValue?.
            filter((key) => {
              return key.name === (props.keyname || props.name)
            })?.[0],
          alias,
        };

        setData(utils);
      })
      .catch(error => {
        console.error('[Error]: Loading css variables ', error);
      })
  }, []);

  const TableData = (dataProps) => {
    let dataClass = `${data.keys?.value ? `${data.keys?.value?.trim?.()}-` : ''}${dataProps?.name?.trim?.()}`;

    let dataName = data.keys?.name
      ? `${data.keys?.name?.trim?.()}: `
      : '';

    const displayContent = isObject(props.content)
    ? (props.content[dataProps?.name?.trim?.()] || props.content?.text)
    : props.content;

    if (dataProps?.keyname && data.alias) {
      dataClass = 
        `${data.alias[dataProps.keyname]?.value}-${dataProps?.name?.trim?.()}`;

      dataName = dataProps.keyname;
    }

    if (!dataProps?.name && !dataProps?.value) {
      return null;
    }

    if (props.ignoreName?.includes?.(dataProps?.name)) {
      return null;
    }

    return (
      <tr>
        <td className='va-middle'>
          <kbd className="c-secondary-600 dm-c-secondary-300">
            { dataClass }
          </kbd>
        </td>

        <td className='va-middle'>
          <kbd className="c-primary-400 dm-c-primary-200">
            { !props.hidePropertyName ? dataName : '' }
            {
              dataProps?.mapValue?.[0]?.value ||
              dataProps.compiledValue ||
              dataProps.value
            }
          </kbd>
        </td>

        {
          props.content &&
          <td className='va-middle'>
            <span className={props?.content?.bgStyle}>
              <span 
                className={`${props?.hideDataClass ? '' : dataClass} ${isObject(props.content) && (props.content?.style || '')}`}
                style={props?.content?.htmlStyle}
                dangerouslySetInnerHTML={{__html: displayContent}}
              />
            </span>
          </td>
        }
      </tr>
    )
  }

  if (props?.type === 'props') {
    const code = `
    <div class="md-${data?.keys?.value}-[value]">
      .   .   .
    </div>
    `;
    const firstClass = `${data?.keys?.value ? `${data?.keys?.value}-` : ''}${data.properties?.mapValue?.[0].name}`;

    return (
      <>
        <p className={defaultClass.p}>
          This utility can also be used on targeted breakpoints, e.g. use <code>md-{firstClass}</code> to apply the <code>{firstClass}</code> only on a medium device and above.
        </p>

        <div className={defaultClass.code}>
          <SyntaxHighlighter props={{
            className: props.language || 'html',
            children: code,
          }}/>
        </div>
      </>
    )
  }

  return (
    <div>
      <p className="tt-uppercase fw-700 fz-sm lts-md c-brand">
        Reference
      </p>

      {
        props.description &&
        <p className={defaultClass.p}>
          You can use the <code>{data?.keys?.value || props.name}-[value]</code> utility <span dangerouslySetInnerHTML={{__html: props.description}}></span>.
        </p>
      }

      <p className={defaultClass.p}>
        The table below describe how the <code>{data?.keys?.name || props.name}</code> utility is applied
      </p>

      <div className={defaultClass.table}>
        <table className="table" data-size={props.size || 'sm'}>
          <thead>
            <tr>
              {
                props.head 
                ? props.head.map(item => (
                  <th key={item}>{item}</th>
                )) 
                : (
                  <>
                    <th>Name</th>
                    <th>Properties</th>
                  </>
                )
              }
            </tr>
          </thead>
          <tbody>
            {
              data.properties?.mapValue?.map((property, index) => {
                if (property && property?.mapValue?.length > 0) {
                  if (props.contentIndex) {
                    return (
                      <TableData 
                        {...(property.mapValue[props.contentIndex] || property)}
                        name={property.name}
                        key={`${property.name}-${index}`}
                      />
                    );
                  }

                  return (
                    property.mapValue.map((item, itemIndex) => (
                      <TableData 
                        {...item}
                        index={itemIndex}
                        key={`${item.name}-${itemIndex}`}
                      />
                    ))
                  );
                } else {
                  return props?.alias?.length > 0
                  ? (
                    props?.alias.map((aliasItem, aliasIndex) => (
                      <TableData 
                        keyname={aliasItem}
                        {...property}
                        key={`${property.name}-${aliasItem}-${aliasIndex}`}
                      />
                    ))  
                  )
                  : (
                    <TableData 
                      {...property}
                      key={`${property.name}-${index}`}
                    />
                  );
                }
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
};

export const PropsTable = (props) => {

  const TableHead = (props) => (
    <p className="fz-xs fw-600 tt-uppercase miw-20 c-secondary dm-secondary-300">
      { props.name }:
    </p>
  )

  const TableData = (dataProps) => {
    const style = {
      code: 'kbd mr-2',
      codeP: 'fx-center-y py-2 bdb-secondary-50 dm-bdb-secondary-800'
    };

    return (
      <div className="my-4 py-4 px-5 bdrs-md">
        <p className='my-2 fw-600 c-brand fz-lg tt-capitalize'>
          {dataProps.head}
        </p>

        {
          dataProps.types && (
            <div className={style.codeP}>
              <TableHead name="type" />
              <div className="my-2">
                {
                  dataProps.types.map((type, index) => (
                    <span className={style.code}
                      key={type + '-' + index}>
                      {type}
                    </span>
                  ))
                }
              </div>
            </div>
          )
        }
        

        {
          dataProps.default &&
          <div className={style.codeP}>
            <TableHead name="default" />
            <div className="my-2">
              <span className={style.code}>{dataProps.default}</span>
            </div>
          </div>
        }

        {
          dataProps.usage &&
          <div className={style.codeP}>
            <TableHead name="usage" />
            <div className="my-2">
              {
                dataProps.usage.map((usageItem, usageIndex) => (
                  <span className={style.code}
                    key={usageItem + '-' + usageIndex}>
                    {usageItem}
                  </span>
                ))
              }
            </div>
          </div>
        }
      </div>
    )
  }

  if (props?.data?.length > 0) {
    return (
      <div>
        {
          props.data.map((item, itemIndex) => (
            <TableData {...item}
              key={`${item?.head}-${itemIndex}`} 
            />
          ))
        }
      </div>
    )
  }
};