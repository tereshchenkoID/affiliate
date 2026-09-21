'use client'

import { useTranslations } from 'next-intl'

import { Link } from '@/i18n/navigation'

import { SIDEBAR_NAVIGATION } from '@/constant'

import Icon from '@/components/Overlay/Icon'
import Separator from '@/components/Overlay/Separator'

import style from './index.module.scss'

import { useMenuStore } from '@/store/menu'

const Section = () => {
  const t = useTranslations()
  const isOpen = useMenuStore((state) => state.isOpen)
  const toggleMenu = useMenuStore((state) => state.toggleMenu)

  return (
    <header className={style.block}>
      <nav className={style.menu}>
        {
          isOpen &&
          <>
            <div
              className={style.link}
              onClick={toggleMenu}
            >
              <Icon
                name={'text-align-justify'}
                size={20}
              />
              <span>{t('notification.expand_sidebar')}</span>
            </div>
            <Separator customColor="currentColor" style={{ opacity: 0.5 }} />
          </>
        }
        {
          SIDEBAR_NAVIGATION.map((el, idx) =>
            <Link
              key={el.id}
              href={{
                pathname: el.url
              }}
              className={style.link}
            >
              <Icon
                name={el.icon}
                size={20}
              />
              <span>{t(el.text)}</span>
            </Link>
          )
        }
      </nav>
    </header>
  )
}

export default Section
