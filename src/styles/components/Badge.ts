const Badge = {
  baseStyle: {
    fontWeight: '700',
    borderRadius: '50px',
    textTransform: 'uppercase',
    px: 4,
    py: 0, // <--
  },

  variants: {
    completed: {
      bg: 'green.100',
      color: 'green.600',
    },
    canceled: {
      bg: 'red.100',
      color: 'red.600',
    },
    waiting: {
      bg: 'orange.100',
      color: 'orange.500',
    },
    processing: {
      bg: 'blue.100',
      color: 'blue.500',
    },
    pending: {
      bg: 'orange.100',
      color: 'orange.500',
    },
    undefined: {
      bg: 'gray.100',
      color: 'gray.500',
    },
  },
};

export default Badge;
