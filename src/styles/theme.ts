import { extendTheme } from '@chakra-ui/react';
import Badge from './components/Badge';
import colors from './foundations/colors';
import { Dict } from '@chakra-ui/utils';

export const theme = extendTheme({
  colors,
  components: {
    Badge,
  },
  styles: {
    global: (props: Dict<any>) => ({
      body: {
        overflowX: 'hidden',
      },
    }),
  },
});
