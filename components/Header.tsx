import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Stack,
  useColorModeValue,
  AvatarBadge,
} from '@chakra-ui/react';
import { signOut, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  ChatIcon,
  CopyIcon,
  LockIcon,
  PlusSquareIcon,
  UnlockIcon,
} from '@chakra-ui/icons';

const Header: React.FC = () => {
  const [session, loading] = useSession();
  const router = useRouter();
  const bg = useColorModeValue('gray.200', 'gray.900');

  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  if (loading) {
    return <div>Loading ...</div>;
  }

  return (
    <>
      <Box bg={bg} px={8}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <HStack spacing={8} alignItems={'center'}>
            <Link href='/'>
              <Button
                id='reviews'
                size={'sm'}
                isActive={isActive('/')}
                leftIcon={<ChatIcon />}
                colorScheme='purple'
                variant='solid'
              >
                Reviews
              </Button>
            </Link>
            {session ? (
              <>
                <Link href='/drafts'>
                  <Button
                    id='drafts'
                    size={'sm'}
                    isActive={isActive('/drafts')}
                    leftIcon={<CopyIcon />}
                    colorScheme='purple'
                    variant='solid'
                  >
                    Drafts
                  </Button>
                </Link>
                <Link href='/create'>
                  <Button
                    id='newFeedback'
                    size={'sm'}
                    isActive={isActive('/create')}
                    leftIcon={<PlusSquareIcon />}
                    colorScheme='purple'
                    variant='outline'
                  >
                    New feedback
                  </Button>
                </Link>
              </>
            ) : null}
          </HStack>
          {session ? (
            <Flex alignItems={'center'}>
              <Button
                id='logout'
                onClick={() => signOut()}
                leftIcon={<LockIcon />}
                display={{ base: 'none', md: 'inline-flex' }}
                size={'sm'}
                colorScheme='purple'
                fontWeight={600}
                mr={4}
              >
                Logout
              </Button>
              <Avatar src={session.user.image} size='sm'>
                <AvatarBadge boxSize='1em' bg='green.500' />
              </Avatar>
            </Flex>
          ) : (
            <Stack
              flex={{ base: 1, md: 0 }}
              justify={'flex-end'}
              direction={'row'}
              spacing={6}
            >
              <Link href='/api/auth/signin'>
                <Button
                  id='signIn'
                  leftIcon={<UnlockIcon />}
                  display={{ base: 'none', md: 'inline-flex' }}
                  size={'sm'}
                  colorScheme='purple'
                  fontWeight={600}
                >
                  Sign In
                </Button>
              </Link>
            </Stack>
          )}
        </Flex>
      </Box>
    </>
  );
};

export default Header;
