import {useMediaQuery} from 'react-responsive'
import breakpoints from './breakpoints';

export const useUserAgent = () => {
  const isSidebarVisible = useMediaQuery({minWidth: breakpoints.sidebarVisible})
  const isNavbarExpanded = useMediaQuery({minWidth: breakpoints.navbarExpanded})
  const isBigHeadImg = useMediaQuery({minWidth: breakpoints.bigHeadImg})
  const isProductCardMultiple = useMediaQuery({minWidth:breakpoints.productCardMultiple})
  const isProductCardBig = useMediaQuery({minWidth: breakpoints.productCardBig})
  const isProductCardMedium = useMediaQuery({minWidth: breakpoints.productCardMedium})
  const isProductCardSmall = useMediaQuery({minWidth: breakpoints.productCardSmall})
  const isTabsBig = useMediaQuery({minWidth: breakpoints.tabsBig})

  return {...breakpoints,
          isSidebarVisible,
          isNavbarExpanded,
          isBigHeadImg,
          isProductCardMultiple,
          isProductCardBig,
          isProductCardMedium,
          isProductCardSmall,
          isTabsBig}
}
