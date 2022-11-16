import React, { forwardRef, ForwardRefRenderFunction, useState } from 'react';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  Flex,
  Box,
} from '@chakra-ui/react';
import { FieldError } from 'react-hook-form';
import { Icon } from '@iconify/react';
// import { FieldError } from 'react-hook-form';

interface IInputProps extends ChakraInputProps {
  name: string;
  iconColor?: string;
  labelColor?: string;
  bgHover?: string;
  bgFocus?: string;
  bgPlaceholder?: string;
  label?: string;
  error?: any;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, IInputProps> = (
  {
    name,
    as,
    iconColor,
    labelColor,
    bgHover,
    bgFocus,
    bgPlaceholder,
    label,
    error = null,
    ...rest
  },
  ref
) => {
  const [visible, setVisible] = useState(false);
  return (
    <Box pos="relative">
      <FormControl isInvalid={!!error}>
        {!!label && (
          <FormLabel htmlFor={name} color={labelColor}>
            {label}
          </FormLabel>
        )}
        <ChakraInput
          pr={rest.type === 'password' ? '35px' : ''}
          name={name}
          id={name}
          fontSize="14px"
          variant="filled"
          _hover={{
            bg: bgHover,
          }}
          _focus={{
            bg: bgFocus,
          }}
          _placeholder={{
            color: bgPlaceholder,
          }}
          ref={ref}
          {...rest}
          type={
            rest.type === 'password'
              ? visible
                ? 'text'
                : 'password'
              : rest.type
          }
        />
        {rest.type === 'password' && (
          <Flex
            position="absolute"
            right="10px"
            top={error ? '53%' : label ? '60%' : '35%'}
            mb="25px"
          >
            <Icon
              width="20px"
              cursor="pointer"
              color={iconColor || '#444'}
              onClick={() => setVisible((previous) => !previous)}
              icon={
                visible ? 'ant-design:eye-invisible-outlined' : 'akar-icons:eye'
              }
            />
          </Flex>
        )}
        {!!error && (
          <FormErrorMessage mb="10px">{error.message}</FormErrorMessage>
        )}
      </FormControl>
    </Box>
  );
};

export const Input = forwardRef(InputBase);
