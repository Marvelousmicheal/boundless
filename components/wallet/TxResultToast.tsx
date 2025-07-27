"use client"

import React from 'react'
import { CheckCircle, XCircle, ExternalLink, Copy } from 'lucide-react'
import { Button } from '../ui/button'
import { useWalletStore } from '@/hooks/use-wallet'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

interface TxResultToastProps {
  hash: string
  success: boolean
  message?: string
  onClose?: () => void
}

const TxResultToast: React.FC<TxResultToastProps> = ({
  hash,
  success,
  message,
  onClose
}) => {
  const { network } = useWalletStore()

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(hash)
      toast.success('Transaction hash copied to clipboard')
    } catch (error) {
      console.error('Failed to copy hash', error)
      toast.error('Failed to copy hash')
    }
  }

  const getExplorerUrl = () => {
    return network === 'testnet' 
      ? `https://testnet.stellarexpert.io/tx/${hash}`
      : `https://stellar.expert/explorer/public/tx/${hash}`
  }

  const formatHash = (txHash: string) => {
    return `${txHash.slice(0, 8)}...${txHash.slice(-8)}`
  }

  return (
    <div className={cn(
      'flex items-start gap-3 p-4 rounded-lg border',
      success 
        ? 'bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-800' 
        : 'bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-800'
    )}>
      <div className="flex-shrink-0">
        {success ? (
          <CheckCircle className="w-5 h-5 text-green-500" />
        ) : (
          <XCircle className="w-5 h-5 text-red-500" />
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-2">
          <h4 className={cn(
            'text-sm font-medium',
            success ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'
          )}>
            {success ? 'Transaction Successful' : 'Transaction Failed'}
          </h4>
          {onClose && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-6 w-6 p-0 text-gray-500 hover:text-gray-700"
            >
              ×
            </Button>
          )}
        </div>
        
        {message && (
          <p className={cn(
            'text-sm mb-2',
            success ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'
          )}>
            {message}
          </p>
        )}
        
        <div className="flex items-center gap-2">
          <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
            {formatHash(hash)}
          </code>
          
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={copyToClipboard}
              className="h-6 w-6 p-0 text-gray-500 hover:text-gray-700"
              title="Copy hash"
            >
              <Copy className="w-3 h-3" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="h-6 w-6 p-0 text-gray-500 hover:text-gray-700"
              title="View on StellarExpert"
            >
              <a 
                href={getExplorerUrl()} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <ExternalLink className="w-3 h-3" />
              </a>
            </Button>
          </div>
        </div>
        
        <div className="mt-2 text-xs text-gray-500">
          Network: {network === 'testnet' ? 'Testnet' : 'Public'}
        </div>
      </div>
    </div>
  )
}

export default TxResultToast 
