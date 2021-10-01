import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
} from '@chakra-ui/react';

type objWithName = {
  _id: string;
  name: string;
  completed: boolean;
};

interface IProps {
  accounts: objWithName[];
  setAccounts: React.Dispatch<React.SetStateAction<objWithName[]>>;
}

function AddModal({ accounts, setAccounts }: IProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [name, setUsername] = useState('');

  const initialRef = React.useRef();
  const finalRef = React.useRef();

  const handleAdd = async () => {
    if (name) {
      setAccounts([
        ...accounts,
        {
          _id: uuid(),
          name,
          completed: false,
        },
      ]);
      setUsername('');
      onClose();
    }
  };

  return (
    <>
      <Button onClick={onOpen}>Add</Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input
                ref={initialRef}
                placeholder='Username'
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                value={name}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleAdd}>
              Save Changes
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddModal;
