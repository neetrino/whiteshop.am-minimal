'use client'

import { memo, useMemo } from 'react'
import { Product } from '@/types'
import ProductCard from './ProductCard'

interface VirtualizedProductGridProps {
  products: Product[]
  onAddToCart: (product: Product) => void
  variant?: 'default' | 'compact'
  itemsPerRow?: number
}

const VirtualizedProductGrid = memo(({ 
  products, 
  onAddToCart, 
  variant = 'default',
  itemsPerRow = 4 
}: VirtualizedProductGridProps) => {
  // Разбиваем продукты на строки для виртуализации
  const productRows = useMemo(() => {
    const rows: Product[][] = []
    for (let i = 0; i < products.length; i += itemsPerRow) {
      rows.push(products.slice(i, i + itemsPerRow))
    }
    return rows
  }, [products, itemsPerRow])

  return (
    <div className="space-y-6">
      {productRows.map((row, rowIndex) => (
        <div 
          key={rowIndex}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {row.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              variant={variant}
            />
          ))}
          {/* Заполняем пустые ячейки для выравнивания */}
          {row.length < itemsPerRow && 
            Array.from({ length: itemsPerRow - row.length }).map((_, index) => (
              <div key={`empty-${rowIndex}-${index}`} className="hidden xl:block" />
            ))
          }
        </div>
      ))}
    </div>
  )
})

VirtualizedProductGrid.displayName = 'VirtualizedProductGrid'

export default VirtualizedProductGrid
