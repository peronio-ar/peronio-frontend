/* eslint-disable no-param-reassign */
// import { isTradeBetter } from 'utils/trades'
// import { formatUnits } from '@ethersproject/units'
import { BigNumber } from 'ethers'
import { mainnetTokens } from 'config/constants/tokens'
import { Currency, CurrencyAmount, Withdraw, Percent, Price, TokenAmount } from 'peronio-sdk'
import JSBI from 'jsbi'
import { useEffect, useMemo, useState } from 'react'
import { parseUnits } from 'ethers/lib/utils'
import { usePeronioContract } from './useContract'

// import useActiveWeb3React from 'hooks/useActiveWeb3React'

// import { useUserSingleHopOnly } from 'state/user/hooks'
// import { BETTER_TRADE_LESS_HOPS_THRESHOLD } from '../config/constants'
// import { wrappedCurrency } from '../utils/wrappedCurrency'

// import { useUnsupportedTokens } from './Tokens'

/**
 * Returns the best trade for the exact amount of tokens in to the given token out
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars

/**
 * Hook for Withdrawing exact IN
 * @param currencyAmountIn
 * @param currencyOut
 * @returns
 */
export function useWithdrawExactIn(currencyAmountIn?: CurrencyAmount, currencyOut?: Currency): Withdraw | null {
  const peronioContract = usePeronioContract()
  const DECIMALS = mainnetTokens.pe.decimals

  const [markup, setMarkup] = useState<Percent>()
  const [out, setOut] = useState<any>()

  // Get Markup
  useEffect(() => {
    async function fetchMarkup() {
      return new Percent(
        (await peronioContract.markupFee()).toString(),
        JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(DECIMALS + 2)),
      )
    }

    fetchMarkup().then(setMarkup)
  }, [peronioContract, DECIMALS])

  // Get Buying Price
  useEffect(() => {
    if (!currencyOut || !currencyAmountIn) {
      return
    }
    async function fetchBuyingPrice(): Promise<BigNumber> {
      const theAmount = parseUnits(currencyAmountIn.toFixed(), currencyAmountIn.currency.decimals)
      return peronioContract.quoteOut(theAmount.toNumber())
    }

    fetchBuyingPrice().then((collateralRatio) => {
      setOut(collateralRatio)
    })
  }, [peronioContract, DECIMALS, currencyOut, currencyAmountIn])

  return useMemo(() => {
    // Needs Price
    if (!currencyAmountIn || !out) {
      return null
    }
    const outAmmount  = new TokenAmount(mainnetTokens.pe, JSBI.BigInt(out))
    return new Withdraw(currencyAmountIn, outAmmount )
  }, [currencyAmountIn, out])
}

/**
 * Hook for Withdrawing exact OUT
 * @param currencyAmountOut
 * @param currencyIn
 * @returns
 */
export function useWithdrawExactOut(currencyAmountOut?: CurrencyAmount, currencyIn?: Currency): Withdraw | null {
  const peronioContract = usePeronioContract()
  const DECIMALS = mainnetTokens.pe.decimals

  const [markup, setMarkup] = useState<Percent>()
  const [price, setPrice] = useState<Price>()

  // Get Markup
  useEffect(() => {
    async function fetchMarkup() {
      return new Percent(
        (await peronioContract.markupFee()).toString(),
        JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(DECIMALS + 2)),
      )
    }

    fetchMarkup().then(setMarkup)
  }, [peronioContract, DECIMALS])

  // Get Buying Price
  useEffect(() => {
    if (!currencyIn || !currencyAmountOut) {
      return
    }
    async function fetchBuyingPrice(): Promise<BigNumber> {
      const theAmount = parseUnits(currencyAmountOut.toFixed(), currencyAmountOut.currency.decimals)
      return peronioContract.quoteOut(theAmount.toNumber())
    }

    fetchBuyingPrice()
      .then((collateralRatio) => {
        setPrice(
          new Price(
            currencyIn, // PE
            currencyAmountOut.currency,
            JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(DECIMALS)),
            collateralRatio.toString(),
          ),
        )
      })
      .catch((e) => {
        console.error(e)
      })
  }, [peronioContract, DECIMALS, currencyIn, currencyAmountOut])

  return useMemo(() => {
    // Needs Price
    if (!price || !markup || !currencyAmountOut) {
      return null
    }

    return Withdraw.exactOut(currencyAmountOut, price)
  }, [price, currencyAmountOut, markup])
}
