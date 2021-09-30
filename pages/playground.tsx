import Head from 'next/head';
import React, { useState } from 'react';
import Modal from '../components/Modal/Modal';

type IState = {
  _id: string;
  habit: string;
  completed: boolean;
}[];

const Playground: React.FC = () => {
  const [accounts, setAccounts] = useState<IState>([]);
  // console.log(accounts, 'accounts');

  return (
    <>
      <Head>
        <title>Cypress Playground</title>
      </Head>
      <Modal accounts={accounts} setAccounts={setAccounts} />
    </>
  );
};

export default Playground;
