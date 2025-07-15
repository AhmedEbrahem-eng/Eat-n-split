import Button from "./Button";

export default function Friend({ friend, onSelection, onReset, onDelete, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend.id;

  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name} />
      <div className="friend-info">
        <h3>{friend.name}</h3>
        {friend.balance < 0 && (
          <p className="red">
            You owe {friend.name} {Math.abs(friend.balance)}€
          </p>
        )}
        {friend.balance > 0 && (
          <p className="green">
            {friend.name} owes you {Math.abs(friend.balance)}€
          </p>
        )}
        {friend.balance === 0 && <p>You and {friend.name} are even</p>}
      </div>
      <div className="button-group">
        <Button onClick={() => onSelection(friend)}>
          {isSelected ? "Close" : "Select"}
        </Button>
        {friend.balance !== 0 && (
          <Button onClick={() => onReset(friend.id)} className="secondary">
            Reset
          </Button>
        )}
        <Button onClick={() => onDelete(friend.id)} className="danger">
          Delete
        </Button>
      </div>
    </li>
  );
}
