import { type SchemaTypeDefinition } from 'sanity'

import {categoryType} from './categoryType'
import { productType } from './ProductType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [categoryType, productType],
}
