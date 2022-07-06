import React from 'react'
import { useLocation } from 'react-router'
import { Menu as UikitMenu } from 'peronio-uikit'
import { languageList } from 'config/localization/languages'
import { useTranslation } from 'contexts/Localization'
// import PhishingWarningBanner from 'components/PhishingWarningBanner'
import useTheme from 'hooks/useTheme'
// import { usePhishingBannerManager } from 'state/user/hooks'
import { usePePriceArs, usePePriceUsd } from 'hooks/useBUSDPrice'
import useARSPrice from 'hooks/useARSPrice'
import config from './config/config'
import UserMenu from './UserMenu'
import GlobalSettings from './GlobalSettings'
import { getActiveMenuItem, getActiveSubMenuItem } from './utils'
import { footerLinks } from './config/footerConfig'

const Menu = (props) => {
  const { isDark, toggleTheme } = useTheme()
  const pesosBlueAvg = useARSPrice()
  const pePriceArs = usePePriceArs()
  const pePriceUsdc = usePePriceUsd()
  const { currentLanguage, setLanguage, t } = useTranslation()
  const { pathname } = useLocation()
  // const [showPhishingWarningBanner] = usePhishingBannerManager()

  const activeMenuItem = getActiveMenuItem({ menuConfig: config(t), pathname })
  const activeSubMenuItem = getActiveSubMenuItem({ menuItem: activeMenuItem, pathname })

  return (
    <UikitMenu
      userMenu={<UserMenu />}
      globalMenu={<GlobalSettings />}
      // banner={showPhishingWarningBanner && <PhishingWarningBanner />}
      isDark={isDark}
      toggleTheme={toggleTheme}
      currentLang={currentLanguage.code}
      langs={languageList}
      setLang={setLanguage}
      cakePriceUsd={pePriceArs}
      links={config(t)}
      subLinks={activeMenuItem?.hideSubNav ? [] : activeMenuItem?.items}
      footerLinks={footerLinks(t)}
      activeItem={activeMenuItem?.href}
      activeSubItem={activeSubMenuItem?.href}
      contentTooltip={
        <>
          {pesosBlueAvg && <div>1 PESO = ${(1 / pesosBlueAvg).toFixed(5)} USDC</div>}
          {pePriceArs && <div>1 PE = ${pePriceArs.toFixed(4)} ARS</div>}
          {pePriceUsdc && <div>1 PE = ${pePriceUsdc.toFixed(5)} USDC</div>}
        </>
      }
      {...props}
    />
  )
}

export default Menu
