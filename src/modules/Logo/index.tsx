import { Link } from '@/i18n/navigation'

import { DASHBOARD } from '@/constant'

import style from './index.module.scss'

const Logo = () => {
  return (
    <Link
      href={DASHBOARD.home.url}
      className={style.block}
    >
      <span className={style.left}>Test</span>
      <span className={style.right}>Tech</span>
    </Link>
  )
}

export default Logo
