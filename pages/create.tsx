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
import Link from 'next/link';
import { useState } from 'react';
import Layout from '../components/Layout';

const Post: React.FC = () => {
  const [session, loading] = useSession();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const toast = useToast();
  const colorFlex = useColorModeValue('gray.50', 'gray.800');
  const colorBox = useColorModeValue('white', 'gray.700');

  if (loading) {
    return <div>Loading ...</div>;
  }

  if (!session) {
    return (
      <Layout>
        <Flex minH={'100vh'} align={'center'} justify={'center'} bg={colorFlex}>
          <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
            <Stack align={'center'}>
              <Heading fontSize={'4xl'}>Sign in to your account</Heading>
              <Text fontSize={'lg'} color={'gray.600'}>
                to create posts <ChakraLink color={'blue.400'}>ssss</ChakraLink>{' '}
                ✌️
              </Text>
            </Stack>
          </Stack>
        </Flex>
      </Layout>
    );
  }

  return (
    <Layout>
      <Stack spacing={8} mx={'auto'}>
        <form>
          <Stack align={'center'}>
            <Heading fontSize={'3xl'} color={'gray.800'}>
              Create new post
            </Heading>
          </Stack>
          <Box rounded={'lg'} bg={colorBox} boxShadow={'lg'} p={8}>
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
                  placeholder='Content'
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
                    leftIcon={<CheckCircleIcon />}
                    colorScheme='whatsapp'
                    variant='solid'
                    onClick={() =>
                      toast({
                        title: 'Post created.',
                        description: "We've created your post for you.",
                        status: 'info',
                        duration: 5000,
                        isClosable: true,
                      })
                    }
                  >
                    Create
                  </Button>
                  <Link href='/'>
                    <Button
                      leftIcon={<SmallCloseIcon />}
                      colorScheme='red'
                      variant='outline'
                    >
                      Cancel
                    </Button>
                  </Link>
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
