'use client'

import React, { Fragment } from 'react'
import { useTranslations } from 'next-intl'

import { usePathname } from '@/i18n/navigation'

import { NavigationItem, SIDEBAR_NAVIGATION } from '@/constant'

import Box from '@/components/Layout/Box'
import Heading from '@/components/Typography/Heading'
import Text from '@/components/Typography/Text'

export const findCrumbPath = (
  items: NavigationItem[],
  pathname: string,
  parents: NavigationItem[] = []
): NavigationItem[] | null => {
  for (const item of items) {
    const currentPath = [...parents, item]

    if (item.url === pathname) {
      return currentPath
    }

    if (item.children?.length) {
      const found = findCrumbPath(item.children, pathname, currentPath)
      if (found) return found
    }
  }

  return null
}

export const Breadcrumbs = () => {
  const t = useTranslations()
  const pathname = usePathname()
  const crumbs = findCrumbPath(SIDEBAR_NAVIGATION, pathname)

  if (!crumbs?.length) return null

  return (
    <Box as="nav" aria-label="Breadcrumb">
      <Heading as="h4" size="6">{t(crumbs[crumbs.length - 1]?.text)}</Heading>
      {
        crumbs.length > 1 &&
        <Box as="ul" display="flex" wrap="wrap" gap="1" align="center">
          {
            crumbs.map((el: NavigationItem, idx: number) =>
              <Fragment key={el.id}>
                <li>
                  <Text size="3" color="gray">{t(el.text)}</Text>
                </li>
                {
                  idx !== crumbs.length - 1 &&
                  <li>
                    <Text size="3" color="gray">/</Text>
                  </li>
                }
              </Fragment>
            )
          }
        </Box>
      }
    </Box>
  )
}

export default Breadcrumbs
