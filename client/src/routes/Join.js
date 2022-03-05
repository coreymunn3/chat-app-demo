import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Flex,
  Stack,
  Input,
  FormControl,
  FormErrorMessage,
  Button,
  Heading,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useChat } from '../contexts/ChatContext';

const CustomInput = React.forwardRef((props, ref) => (
  <Input ref={ref} {...props} focusBorderColor='teal.400' />
));

const Join = () => {
  const navigate = useNavigate();
  const { setChatState } = useChat();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      user: '',
      room: '',
    },
  });

  console.log(errors);

  const onSubmit = (data) => {
    // console.log('Submitted', data);
    setChatState(data);
    navigate(`/chat?user=${data.user}&room=${data.room}`);
  };

  return (
    <Flex
      h='100vh'
      direction='column'
      justifyContent='center'
      alignItems='center'
      bgGradient='radial(white 50% , teal.200)'
    >
      <Box w='400px'>
        <Heading as='h1' size='4xl' mb={4}>
          Chat.
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4}>
            <FormControl isInvalid={errors?.user}>
              <CustomInput
                {...register('user', { required: 'Your Name is Required' })}
                placeholder='Your User Name'
                variant='flushed'
              />
              {errors.user && (
                <FormErrorMessage>{errors?.user.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={errors?.room}>
              <CustomInput
                {...register('room', {
                  required: 'You Must Enter a Room Name',
                })}
                placeholder='Room to Join'
                variant='flushed'
              />
              {errors.room && (
                <FormErrorMessage>{errors.room.message}</FormErrorMessage>
              )}
            </FormControl>
            <Button type='submit' colorScheme='teal'>
              Let's Chat
            </Button>
          </Stack>
        </form>
      </Box>
    </Flex>
  );
};

export default Join;
