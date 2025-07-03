'use client'

import { useState, useEffect } from 'react'
import { useWalletUi } from '@wallet-ui/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// interface PortfolioData {
//   balance: number
//   tokens: TokenInfo[]
//   totalValue: number
// }

interface TokenInfo {
  mint: string
  amount: string
  decimals: number
  symbol?: string
}

export function PortfolioDashboard() {
  const { account, cluster } = useWalletUi()
  const [balance, setBalance] = useState<number>(0)
  const [tokens, setTokens] = useState<TokenInfo[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    if (account) {
      fetchPortfolioData()
    }
  }, [account])

  const fetchPortfolioData = async () => {
    if (!account) return

    setIsLoading(true)
    setError('')

    try {
      const mockData = {
        balance: 2500000000,
        tokens: [
          { mint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', amount: '1000000', decimals: 6, symbol: 'USDC' },
          { mint: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB', amount: '500000000', decimals: 6, symbol: 'USDT' },
        ],
      }

      setBalance(mockData.balance)
      setTokens(mockData.tokens)
    } catch (err) {
      console.error(err)
      setError('Failed to fetch portfolio data.')
    } finally {
      setIsLoading(false)
    }
  }

  const calculateTotalValue = () => {
    return tokens.reduce((total, token) => {
      const tokenValue = parseFloat(token.amount)
      return total + tokenValue
    }, 0)
  }

  // const formatBalance = (balance: number) => {
  //   return balance.toFixed(2)
  // }

  if (!account) {
    return (
      <div className="p-4 max-w-xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-center">
          Portfolio Dashboard - Please Connect Wallet
        </h1>
        <div className="bg-yellow-200 p-6 rounded border-4 border-yellow-500">
          <p className="text-xl font-semibold text-center text-black dark:text-black">
            ⚠️ WALLET CONNECTION REQUIRED - Please connect your Solana wallet to view your cryptocurrency portfolio
          </p>
        </div>
      </div>
    )
  }

  return (
    <section className="py-8 md:py-12 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-10 text-center whitespace-normal">
          My Portfolio Dashboard for Cryptocurrency Assets
        </h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          <Card className="w-full flex flex-col justify-between overflow-hidden">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-center md:text-left">SOL Balance Information</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-center text-center md:text-left">
              {isLoading ? (
                <div className="text-lg">Loading your balance...</div>
              ) : (
                <>
                  <p className="text-3xl sm:text-4xl font-bold whitespace-normal">{balance.toFixed(2)} SOL</p>
                  <p className="text-sm text-gray-400 mt-2 whitespace-nowrap">Current Network: {cluster.label}</p>
                </>
              )}
            </CardContent>
          </Card>

          <Card className="w-full flex flex-col overflow-hidden">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-center md:text-left">Token Holdings & Assets</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 space-y-3">
              {tokens.length === 0 ? (
                <p className="text-lg text-center">No tokens found</p>
              ) : (
                tokens.map((token, index) => (
                  <div key={index} className="flex flex-col gap-1 border-b pb-2">
                    <div className="flex justify-between items-center w-full">
                      <span className="text-lg font-medium">{token.symbol || 'Unknown'}</span>
                      <span className="text-lg font-mono whitespace-nowrap">{token.amount} tokens</span>
                    </div>
                    <p className="text-sm text-gray-600 font-mono break-all w-full">{token.mint}</p>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          <Card className="w-full flex flex-col justify-between overflow-hidden">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-center md:text-left">Total Portfolio Value</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-center text-center md:text-left">
              <p className="text-3xl sm:text-4xl font-bold break-words text-balance">
                ${calculateTotalValue().toFixed(2)} USD
              </p>
              <Button
                onClick={fetchPortfolioData}
                disabled={isLoading}
                className="mt-6 w-full text-lg py-4 whitespace-nowrap"
              >
                Refresh Portfolio Data
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
