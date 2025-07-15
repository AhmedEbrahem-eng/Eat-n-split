import Friend from "./Friend";

export default function FriendsList({ friends, onSelection, onReset, onDelete, selectedFriend }) {
  return (
    <ul className="friend-list">
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          selectedFriend={selectedFriend}
          onSelection={onSelection}
          onReset={onReset}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
