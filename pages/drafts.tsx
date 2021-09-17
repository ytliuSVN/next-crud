import React from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Layout from '../components/Layout';
import { useSession, getSession } from 'next-auth/client';
import {
  Avatar,
  Box,
  Container,
  Divider,
  Flex,
  Heading,
  HStack,
  Link,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import Router from 'next/router';
import prisma from '../lib/prisma';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return { props: { drafts: [] } };
  }

  const drafts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
    where: {
      author: { email: session.user.email },
      published: false,
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return {
    props: { drafts },
  };
};

type Props = {
  drafts: PostProps[];
};

export type PostProps = {
  id: number;
  title: string;
  author: {
    name: string;
    email: string;
  } | null;
  content: string;
  published: boolean;
  createdAt: Date;
};

interface ReviewerProps {
  date: Date;
  name: string;
}

export const Reviewer: React.FC<ReviewerProps> = (props) => {
  const [session, loading] = useSession();
  if (loading) {
    return <div>Loading ...</div>;
  }

  return (
    <HStack marginTop='2' spacing='2' display='flex' alignItems='center'>
      <Avatar
        src={session?.user.image}
        size='sm'
        mr={1}
      />
      <Text fontWeight='medium'>{props.name}</Text>
      <Text>—</Text>
      <Text>{props.date.toLocaleDateString()}</Text>
    </HStack>
  );
};

const Drafts: React.FC<Props> = (props) => {
  const [session, loading] = useSession();

  if (!session) {
    return (
      <Layout>
        <Flex
          minH={'100vh'}
          align={'center'}
          justify={'center'}
          bg={useColorModeValue('gray.50', 'gray.800')}
        >
          <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
            <Stack align={'center'}>
              <Heading fontSize={'4xl'}>Sign in to your account</Heading>
              <Text fontSize={'lg'} color={'gray.600'}>
                to see drafts <Link color={'blue.400'}></Link>
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
        <title>List of Drafts</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>

      <Container maxW='container.xl' py={12}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          <Stack spacing={4}>
            <Text
              textTransform={'uppercase'}
              color={'blue.400'}
              fontWeight={600}
              fontSize={'sm'}
              bg={useColorModeValue('blue.50', 'blue.900')}
              p={2}
              alignSelf={'flex-start'}
              rounded={'md'}
            >
              {props.drafts.length !== 0 ? 'My Drafts' : 'No Drafts'}
            </Text>
          </Stack>
        </SimpleGrid>
      </Container>

      {props.drafts.map((post) => (
        <Container key={post.id} maxW='container.xl'>
          <Box
            marginTop={{ base: '1', sm: '5' }}
            display='flex'
            flexDirection={{ base: 'column', sm: 'row' }}
            justifyContent='space-between'
          >
            <Box
              display='flex'
              flex='1'
              flexDirection='column'
              justifyContent='center'
              marginTop={{ base: '3', sm: '0' }}
            >
              <Heading marginTop='1'>
                <Link
                  onClick={() => Router.push('/post/[pid]', `/post/${post.id}`)}
                  textDecoration='none'
                  _hover={{
                    background: 'white',
                    color: 'purple.500',
                  }}
                >
                  {post.title}
                </Link>
              </Heading>
              <Text
                as='p'
                marginTop='2'
                color={useColorModeValue('gray.700', 'gray.200')}
                fontSize='lg'
              >
                {post.content}
              </Text>
              <Reviewer name={post.author.name} date={post.createdAt} />
            </Box>
          </Box>
          <Divider marginTop='5' />
        </Container>
      ))}
    </Layout>
  );
};

export default Drafts;
