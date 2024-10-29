import { useSelector } from "react-redux";
import { selectBalance } from "../transactions/transactionsSlice";

const Balance = () => {
  const balance = useSelector(selectBalance);

  return (
    <div>
      <h2>Current Balance</h2>
      <p>{balance}</p>
    </div>
  );
};

export default Balance;
