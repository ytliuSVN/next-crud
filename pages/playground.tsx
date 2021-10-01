import Head from 'next/head';
import React, { useState } from 'react';
import Modal from '../components/Modal/Modal';
import Card from '../components/UserCard/UserCard';

type IState = {
  _id: string;
  name: string;
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

      {accounts.map((account, idx) => {
        return (
          <Card
            key={`account-${idx}`}
            account={account}
            setAccounts={setAccounts}
            accounts={accounts}
          />
        );
      })}
    </>
  );
};

export default Playground;
