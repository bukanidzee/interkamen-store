export const orderButtonsCases = {
  'current': {
    'true': [
    ],
    'false': [
      'process'
    ]
  },
  'processing': {
    'true': [
      'transport',
      'drop'
    ],
    'false': [
      'drop'
    ]
  },
  'transporting': {
    'true': [
      'recollect',
      'close'
    ],
    'false': [
    ]
  },
  'closed': {
    'true': [
    ],
    'false': [
    ]
  },
  'dropped': {
    'true': [
      'reinstate'
    ],
    'false': [
    ]
  }
}
