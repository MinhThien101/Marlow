import React from 'react'
import { DEMO_BRAND } from './studioBrand.js'

// The active studio brand (already adapted via buildStudioBrand). Defaults to the
// demo brand so any component rendered outside a provider still works.
const StudioBrandContext = React.createContext(DEMO_BRAND)

export function StudioBrandProvider({ brand, children }) {
  return <StudioBrandContext.Provider value={brand || DEMO_BRAND}>{children}</StudioBrandContext.Provider>
}

export function useStudioBrand() {
  return React.useContext(StudioBrandContext)
}
