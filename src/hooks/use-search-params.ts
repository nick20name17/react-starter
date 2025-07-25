import { parseAsJson, useQueryStates } from 'nuqs'
import z from 'zod'

import { DEFAULT_LIMIT } from '@/constants/api'

export const NumberParamSchema = z.number().int().nonnegative().optional().catch(undefined)
export const SearchSchema = z.union([z.string(), z.number()]).optional().catch(undefined)

export const useSearchParams = () => {
  return useQueryStates({
    offset: parseAsJson(NumberParamSchema.parse).withDefault(0),
    limit: parseAsJson(NumberParamSchema.parse).withDefault(DEFAULT_LIMIT),
    search: parseAsJson(SearchSchema.parse).withDefault('')
  })
}
