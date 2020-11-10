import { parse, ParsedQs } from 'qs'

/**
 * 获取 search 参数
 *
 * @export
 * @returns {Record<string, any>} 参数
 */
export function getSearchParams<T extends ParsedQs = Record<string, any>>(): T {
  const { search, hash } = location
  const searchParamsFromLocation = parse(search, {
    ignoreQueryPrefix: true,
  })

  const hashSearch = hash.split('?').pop() as string

  const searchParamsFromHash = parse(hashSearch, {
    ignoreQueryPrefix: true,
  })

  const searchParams = {
    ...searchParamsFromLocation,
    ...searchParamsFromHash,
  } as T

  return searchParams
}
