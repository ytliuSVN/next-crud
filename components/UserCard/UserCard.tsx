import styles from './UserCard.module.css';
import { ViewOffIcon, ViewIcon } from '@chakra-ui/icons';

type objWithName = {
  _id: string;
  name: string;
  completed: boolean;
};

interface IProps {
  account: objWithName;
  accounts: objWithName[];
  setAccounts: React.Dispatch<React.SetStateAction<objWithName[]>>;
}

function UserCard({ account, accounts, setAccounts }: IProps) {
  return (
    <div
      className={styles['UserCard']}
      onClick={() => {
        let newHabits = accounts.map((updatedHabit) => {
          if (updatedHabit._id === account._id) {
            return {
              ...account,
              completed: !account.completed,
            };
          } else return updatedHabit;
        });
        setAccounts(newHabits);
      }}
    >
      <div className={styles['UserCard__completion-container']}>
        {account.completed ? <ViewOffIcon /> : <ViewIcon />}
      </div>
      <div className={styles['UserCard__habit-container']}>{account.name}</div>
    </div>
  );
}

export default UserCard;
