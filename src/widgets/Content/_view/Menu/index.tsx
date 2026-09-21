import React, { startTransition, useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'

import { usePathname } from '@/i18n/navigation'

import { NavigationItem, SIDEBAR_NAVIGATION } from '@/constant'

import Action from '@/components/Form/Action'
import Box from '@/components/Layout/Box'
import Icon from '@/components/Overlay/Icon'
import Heading from '@/components/Typography/Heading'
import Text from '@/components/Typography/Text'
import Tooltip from '@/components/Typography/Tooltip'

import style from './index.module.scss'

import { useMenuStore } from '@/store/menu'

const Menu = () => {
  const t = useTranslations()
  const pathname = usePathname()
  const rootSegment = pathname.split('/')[1]
  const active = SIDEBAR_NAVIGATION.find(
    (item) => item.id === rootSegment || item.url === `/${rootSegment}`
  )

  const navigation = active?.children

  const isOpen = useMenuStore((state) => state.isOpen)
  const toggleMenu = useMenuStore((state) => state.toggleMenu)
  const [open, setOpen] = useState<string | null>(
    () => navigation?.[0]?.id ?? null
  )

  useEffect(() => {
    startTransition(() => {
      setOpen(active?.children?.[0]?.id ?? null)
    })
  }, [active, navigation])

  const handleToggle = (e: React.SyntheticEvent, id: string) => {
    e.preventDefault()
    setOpen((prev) => (prev === id ? null : id))
  }

  if (!navigation?.length || isOpen) return null

  return (
    <div className={style.block}>
      <Box
        display="flex"
        justify="between"
        gap="1"
        py="1"
        pl="2"
      >
        {
          active &&
          <Heading as="h6" size="4">
            {t(active.text)}
          </Heading>
        }
        <Tooltip content={t('notification.collapse_sidebar')}>
          <Action
            size="1"
            color="muted"
            square
            onClick={toggleMenu}
          >
            <Icon name="chevrons-left" size="16" />
          </Action>
        </Tooltip>
      </Box>
      {
        navigation.map((el, _) =>
        <details
          key={el.id}
          name={active?.text?.toLowerCase()}
          open={open === el.id}
          className={style.wrapper}
        >
          <Box
            as="summary"
            display="flex"
            justify="between"
            gap="1"
            py="2"
            pl="2"
            pr="1"
            className={style.summary}
            onClick={(e) => handleToggle(e, el.id)}
          >
            <Text
              as="p"
              size="2"
              weight="bold"
              color="gray"
              transform="uppercase"
            >
              {t(el.text)}
            </Text>
            <Icon name="chevron-down" size="16" className={style.arrow} />
          </Box>
          <div className={style.dropdown}>
            <Box
              as="ul"
              display="grid"
              gap="half"
              mb="half"
              className={style.list}
            >
              {
                el.children
                  ?
                    el.children?.map((link: NavigationItem, _: number ) => {
                      const isActive = pathname === link.url || pathname.endsWith(link.url ?? '')

                      return (
                        <Box
                          key={link.id}
                          as="li"
                        >
                          <Action
                            to={link.url}
                            size="2"
                            color={isActive ? 'primary' : 'transparent'}
                            active={isActive}
                            justify="start"
                            full={true}
                          >
                            {t(link.text)}
                          </Action>
                        </Box>
                      )
                    })
                  :
                    <Box
                      key={el.id}
                      as="li"
                    >
                      <Action
                        to={el.url}
                        size="2"
                        color="transparent"
                        justify="start"
                        full={true}
                      >
                        {t(el.text)}
                      </Action>
                    </Box>
              }
            </Box>
          </div>
        </details>
      )}
    </div>
  )
}

export default Menu
