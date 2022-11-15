import { message } from 'ant-design-vue';
export * from './auth'

/**
 * 获取uuid
 */
export function getUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    return (c === 'x' ? (Math.random() * 16 | 0) : ('r&0x3' | '0x8')).toString(16)
  })
}


/**
 * 生成随机字符串
 * @param len 长度
 * @param radix 随机字符串的范围
 * @returns {string}
 */
export const randomStr: (len?: number, radix?: number) => string = (len = 8, radix = 16) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  const value = [];
  let i = 0;
  radix = radix || chars.length;

  if (len) {
    // Compact form
    for (i = 0; i < len; i++) value[i] = chars[0 | (Math.random() * radix)];
  } else {
    // rfc4122, version 4 form
    let r;

    // rfc4122 requires these characters
    /* eslint-disable-next-line */
    value[8] = value[13] = value[18] = value[23] = '-';
    value[14] = '4';

    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!value[i]) {
        r = 0 | (Math.random() * 16);
        value[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r];
      }
    }
  }

  return value.join('');
};
/**
 * 拉平数组
 * @param {any[]} arr 数据源
 * @param {string} children 包含子集的字段名称
 * @returns {any[]}
 */
export const flatArray: <T = any>(arr: T[], children?: string) => T[] = (
  arr = [],
  children = 'children',
) => {
  return arr.reduce((pre: any[], cur: any) => {
    if (cur[children]) {
      pre.push(...flatArray(cur[children]));
      pre.push({ ...cur, [children]: undefined });
    } else {
      pre.push(cur);
    }
    return pre;
  }, []);
};

/**
 * 将后台接口返回错误信息转为antd form错误信息格式（含原value）
 * @param {Object} errors 后台返回的错误信息
 * @param {Object} values 当前表单值
 */
export const formatResultToAntdFormErrorFields = (errors: any, values: any) => {
  if (Object.prototype.toString.call(errors) !== '[object Object]') {
    return {}
  }
  const keys = Object.keys(errors);
  return keys.reduce((pre, cur) => {
    pre[cur] = {
      value: values[cur],
      errors: [new Error(errors[cur])]
    }
    return pre;
  }, {} as any)
}

/**
 * form表单校验长度通用方法，整合统一文案
 * @param {number} min 最小值
 * @param {number} max 最大值
 * @returns 
 */
export const formRulesMinMax = (min: number, max: number) => ({ min, max, message: `长度无效, 请限制在 ${min} ~ ${max} 有效字以内` })

/**
 * 上传接口大小限制通用方法
 * @param {File} file 文件对象
 * @param {number} limit 上传限制 mb
 * @returns {boolean}
 */
export const uploadSizeLimit = (file: File, limit = 10) => {
  const { size } = file;
  if (size > limit * 1024 * 1024) {
    message.error(`文件大小不能超过${limit}M`);
    return Promise.reject(false);
  } else {
    return true;
  }
}

/**
* 上传接口文件限制通用方法（后缀）
* @param {File} file 文件对象
* @param {string} accept 文件格式限制
* @returns {boolean}
*/
export const uploadSuffixLimit = (file: File, accept: string) => {
  const { name } = file;
  /* 取出文件后缀 */
  const suffix = name.split('.').pop();
  /* 取出限制后缀列表 */
  const _accept = accept ? accept.split(',').map(item => item.replace(/\./g, '')) : [];
  if (accept && _accept.indexOf(suffix as string) === -1) {
    message.error(`文件仅支持${accept}格式`);
    return Promise.reject(false);
  } else {
    return true;
  }
}

/**
 * 数组分割
 * @param {any[]} arr 数据源
 * @param {number} chunk 分割数量
 * @returns 
 */
export const splitArray = (arr: Array<any>, chunk = 4) => {
  const result = [];
  for (var i = 0, j = arr.length; i < j; i += chunk) {
    result.push(arr.slice(i, i + chunk))
  }
  return result;
}
/**
 * 
 * @param {any[]} list 数据源
 * @param {string} key list每条数据中对应map的的key
 * @param {string} value map对应value的key，不传则为整个对象
 * @returns {object}
 */
export const listToMap = (list: Array<any>, key = 'id', value = undefined) => {
  let obj: objString = {};
  list.forEach(item => {
    obj[item[key]] = value ? item[value] : item;
  })
  return obj;
}

export const encode = (str: string | number) => {
  if (typeof str === 'string' || typeof str === 'number') {
    return btoa(unescape(encodeURIComponent(str)))
  } else {
    return str
  }
}

/**
 * 将数组格式转换成antd大多数组件的格式 {label: string, value: string, children: own[]}[]
 */
export const formatListToAntdList: (list: any[], label?: string, value?: string, children?: string) => any[] = (list, label = 'name', value, children = 'children') => {
  return list.map(item => ({
    ...item,
    label: item[label],
    value: value ? item[value] : JSON.stringify(item),
    children: item[children] ? formatListToAntdList(item[children], label, value, children) : undefined,
  }))
}