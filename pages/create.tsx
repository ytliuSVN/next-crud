import {
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  Input,
  Link as ChakraLink,
  Stack,
  Text,
  Textarea,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { CheckCircleIcon, SmallCloseIcon } from '@chakra-ui/icons';
import { useSession } from 'next-auth/client';
import Head from 'next/head';
import Router from 'next/router';
import { useState, SyntheticEvent } from 'react';
import Layout from '../components/Layout';

const Post: React.FC = () => {
  const [session, loading] = useSession();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const toast = useToast();

  if (loading) {
    return <div>Loading ...</div>;
  }

  const submitData = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { title, content };
      await fetch(`http://localhost:3000/api/post`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      await Router.push('/drafts');
    } catch (error) {
      console.log(error);
    }
  };

  if (!session) {
    return (
      <Layout>
        <Flex minH={'100vh'} align={'center'} justify={'center'}>
          <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
            <Stack align={'center'}>
              <Heading fontSize={'4xl'}>Sign in to your account</Heading>
              <Text fontSize={'lg'} color={'gray.600'}>
                to create posts <ChakraLink color={'blue.400'}></ChakraLink>
              </Text>
            </Stack>
          </Stack>
        </Flex>
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <title>Create Feedback</title>
      </Head>

      <Stack spacing={8} m={4}>
        <form onSubmit={submitData}>
          <Box
            rounded={'md'}
            boxShadow={'outline'}
            p={8}
            m={4}
            color={'gray.600'}
          >
            <Stack spacing={4}>
              <FormControl id='title'>
                <Input
                  autoFocus
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder='Title'
                  type='text'
                  value={title}
                />
              </FormControl>
              <FormControl id='description'>
                <Textarea
                  cols={50}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder='Evaluation of Objectives'
                  rows={8}
                  value={content}
                />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}
                ></Stack>
                <Stack direction='row' spacing={4}>
                  <Button
                    disabled={!content || !title}
                    type='submit'
                    data-cy='submit'
                    leftIcon={<CheckCircleIcon />}
                    colorScheme='whatsapp'
                    variant='solid'
                    onClick={() =>
                      toast({
                        title: 'Feedback created.',
                        description: "We've created your feedback for you.",
                        status: 'info',
                        duration: 5000,
                        isClosable: true,
                      })
                    }
                  >
                    Create
                  </Button>
                  <Button
                    leftIcon={<SmallCloseIcon />}
                    colorScheme='red'
                    variant='outline'
                    onClick={() => {
                      setTitle('');
                      setContent('');
                    }}
                  >
                    Cancel
                  </Button>
                </Stack>
              </Stack>
            </Stack>
          </Box>
        </form>
      </Stack>
    </Layout>
  );
};

export default Post;
