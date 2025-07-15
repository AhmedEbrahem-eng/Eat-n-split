export default function ExpenseStats({ friends }) {
  const totalOwed = friends.reduce((sum, friend) => 
    friend.balance > 0 ? sum + friend.balance : sum, 0
  );
  const totalOwe = friends.reduce((sum, friend) => 
    friend.balance < 0 ? sum + Math.abs(friend.balance) : sum, 0
  );
  const netBalance = totalOwed - totalOwe;

  return (
    <div className="stats">
      <div className="stat-card">
        <h3>🤑 Total Owed to You</h3>
        <p className="stat-value green">€{totalOwed}</p>
      </div>
      <div className="stat-card">
        <h3>💸 Total You Owe</h3>
        <p className="stat-value red">€{totalOwe}</p>
      </div>
      <div className="stat-card">
        <h3>💰 Net Balance</h3>
        <p className={`stat-value ${netBalance >= 0 ? "green" : "red"}`}>
          €{netBalance}
        </p>
      </div>
    </div>
  );
}
