#

- app/providers.js
```
'use client'
 
import { ThemeProvider } from 'acme-theme'
import { AuthProvider } from 'acme-auth'
 
export function Providers({ children }) {
  return (
    <ThemeProvider>
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  )
}
```



- app/layout.js
```
import { Providers } from './providers'
 
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
```