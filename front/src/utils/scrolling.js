export const handleHeightChange = (ref) => {
  return () => {
    if (ref.current) {
      ref.current.style.height = calcHeight(ref)
    }
  }
}

const calcHeight = (ref) => {
  let fromDivToTop = ref.current.getBoundingClientRect().top
  return `calc(98vh - ${fromDivToTop}px)`
}

// export const handleTopChange = (ref) => {
//   return () => {
//     if (ref.current) {
//       console.log(ref.current.style)
//       let fromDivToTop = ref.current.getBoundingClientRect().top
//       if (fromDivToTop !== 333) {
//         ref.current.style.top = calcTop(fromDivToTop, ref)
//       }
//     }
//   }
// }
//
// const calcTop = (fromDivToTop, ref) => {
//
//   return `${fromDivToTop}px`
// }
