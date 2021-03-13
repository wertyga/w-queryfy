const getConvertedType = (value: string): string | number | boolean => {
  const isNumber = Number.isNaN(Number(value));
  const isBoolean = value === 'true' || value === 'false';

  if (isNumber) return Number(value);
  if (isBoolean) return value === 'true';
  return value;
};

export const queryStringify = (
  queryObj: Record<string, string | number>
): string => {
  return Object.entries(queryObj).reduce((acc, [key, value]) => {
    if (!value) return acc;

    const queryString = `${key}=${value}`;
    if (!acc) return queryString;
    return `${acc}&${queryString}`;
  }, '');
};

export const queryParse = (
  queryString: string
): Record<string, string | number | boolean> | undefined => {
  return queryString
    .replace(/^\?/, '')
    .split('&')
    .map(str => {
      const [key, value] = str.split('=');
      const isNullableKey =
        key === 'undefined' || key === 'null' || key === 'NaN' || !key;
      const isNullableValue =
        value === 'undefined' || value === 'null' || value === 'NaN' || !value;
      if (isNullableKey || isNullableValue) return undefined;
      return { [key]: getConvertedType(value) };
    })
    .filter(item => !!item)
    .reduce((acc, queryObj) => ({ ...acc, ...queryObj }), {});
};
