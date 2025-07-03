'use client'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import { ThemeSelect } from '@/components/theme-select'
import { ClusterButton, WalletButton } from '@/components/solana/solana-provider'

export function AppHeader({ links = [] }: { links: { label: string; path: string }[] }) {
  const pathname = usePathname()
  const [showMenu, setShowMenu] = useState(false)

  function isActive(path: string) {
    return path === '/' ? pathname === '/' : pathname.startsWith(path)
  }

  return (
    <header className="relative z-50 px-4 py-2 bg-neutral-100 dark:bg-neutral-900 dark:text-neutral-400">
      <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-4 max-w-full">
        {/* Adding a logo */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 flex-shrink max-w-full">
          <Link href="/" className="flex items-center gap-1 sm:gap-2 hover:opacity-80 flex-shrink max-w-full truncate">
            <div className="h-8 w-8 rounded bg-primary dark:bg-transparent flex items-center justify-center flex-shrink-0">
              <img src="/third-time-icon-tiny-white.png" alt="Third Time Logo" className="h-5 w-5" />
            </div>
            <span className="text-lg sm:text-xl font-bold text-primary whitespace-nowrap truncate">Portfolio Dashboard</span>
          </Link>
          <div className="hidden md:flex items-center flex-wrap">
            <ul className="flex flex-wrap gap-2 sm:gap-4 items-center">
              {links.map(({ label, path }) => (
                <li key={path}>
                  <Link
                    className={`hover:text-neutral-500 dark:hover:text-white ${isActive(path) ? 'text-neutral-500 dark:text-white' : ''}`}
                    href={path}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Menu button on mobile */}
        <Button variant="ghost" size="icon" className="md:hidden flex-shrink-0" onClick={() => setShowMenu(!showMenu)}>
          {showMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>

        {/* Wallet and controls */}
        <div className="flex items-center gap-4">
          <WalletButton size="sm" />
          <ClusterButton size="sm" />
          <ThemeSelect />
        </div>

        {/* Mobile menu */}
        {showMenu && (
          <div className="md:hidden fixed inset-x-0 top-[52px] bottom-0 bg-neutral-100/95 dark:bg-neutral-900/95 backdrop-blur-sm z-50">
            <div className="flex flex-col p-4 gap-4 border-t dark:border-neutral-800">
              <ul className="flex flex-col gap-4">
                {links.map(({ label, path }) => (
                  <li key={path}>
                    <Link
                      className={`hover:text-neutral-500 dark:hover:text-white block text-lg py-2  ${isActive(path) ? 'text-neutral-500 dark:text-white' : ''} `}
                      href={path}
                      onClick={() => setShowMenu(false)}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-4">
                <WalletButton />
                <ClusterButton />
                <ThemeSelect />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
