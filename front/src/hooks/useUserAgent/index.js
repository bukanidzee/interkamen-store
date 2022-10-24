import {useMediaQuery} from 'react-responsive'
import breakpoints from './breakpoints';

export const useUserAgent = () => {
  const isSidebarVisible = useMediaQuery({minWidth: breakpoints.sidebarVisible})
  const isNavbarExpanded = useMediaQuery({minWidth: breakpoints.navbarExpanded})
  const isBigHeadImg = useMediaQuery({minWidth: breakpoints.bigHeadImg})
  const isProductCardBig = useMediaQuery({minWidth: breakpoints.productCardBig})
  const isProductCardMedium = useMediaQuery({minWidth: breakpoints.productCardMedium})
  const isProductCardSmall = useMediaQuery({minWidth: breakpoints.productCardSmall})
  const isTabsBig = useMediaQuery({minWidth: breakpoints.tabsBig})
  const isOrdersWide = useMediaQuery({minWidth: breakpoints.ordersWide})

  return {...breakpoints,
          isSidebarVisible,
          isNavbarExpanded,
          isBigHeadImg,
          isProductCardBig,
          isProductCardMedium,
          isProductCardSmall,
          isTabsBig,
          isOrdersWide}
}
