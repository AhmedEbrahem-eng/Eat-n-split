import { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import "./styles.css";
import Button from "./components/Button";
import ExpenseStats from "./components/ExpenseStats";
import FriendsList from "./components/FriendsList";
import FormAddFriend from "./components/FormAddFriend";
import FormSplitBill from "./components/FormSplitBill";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

async function showConfirmDialog(title, text) {
  const result = await Swal.fire({
    title,
    text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#0ca678',
    cancelButtonColor: '#e03131',
    confirmButtonText: 'Yes',
    cancelButtonText: 'Cancel',
    background: '#fff',
    borderRadius: '16px',
  });
  return result.isConfirmed;
}

export default function App() {
  const [friends, setFriends] = useState(() => {
    const saved = localStorage.getItem("friends");
    return saved ? JSON.parse(saved) : initialFriends;
  });
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  useEffect(() => {
    localStorage.setItem("friends", JSON.stringify(friends));
  }, [friends]);

  function handleShowAddFriend() {
    setShowAddFriend((show) => !show);
  }

  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  }

  function handleSelection(friend) {
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
    setShowAddFriend(false);
  }

  function handleSplitBill(value) {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
    setSelectedFriend(null);
  }

  async function handleResetFriend(friendId) {
    const friend = friends.find(f => f.id === friendId);
    const confirmed = await showConfirmDialog(
      'Reset Balance?',
      `Are you sure you want to reset ${friend.name}'s balance to zero?`
    );
    if (confirmed) {
      setFriends((friends) =>
        friends.map((friend) =>
          friend.id === friendId ? { ...friend, balance: 0 } : friend
        )
      );
      Swal.fire({
        title: 'Success!',
        text: `${friend.name}'s balance has been reset to zero`,
        icon: 'success',
        confirmButtonColor: '#0ca678',
        timer: 2000,
      });
    }
  }

  async function handleResetAll() {
    const confirmed = await showConfirmDialog(
      'Reset All Balances?',
      'Are you sure you want to reset all balances to zero?'
    );
    if (confirmed) {
      setFriends((friends) =>
        friends.map((friend) => ({ ...friend, balance: 0 }))
      );
      Swal.fire({
        title: 'Success!',
        text: 'All balances have been reset to zero',
        icon: 'success',
        confirmButtonColor: '#0ca678',
        timer: 2000,
      });
    }
  }

  async function handleClearList() {
    const confirmed = await showConfirmDialog(
      'Clear Friends List?',
      'Are you sure you want to remove all friends? This action cannot be undone.'
    );
    if (confirmed) {
      setFriends([]);
      Swal.fire({
        title: 'List Cleared!',
        text: 'All friends have been removed',
        icon: 'success',
        confirmButtonColor: '#0ca678',
        timer: 2000,
      });
    }
  }

  async function handleDeleteFriend(friendId) {
    const friend = friends.find(f => f.id === friendId);
    const confirmed = await showConfirmDialog(
      'Delete Friend?',
      `Are you sure you want to remove ${friend.name} from your friends list?`
    );
    if (confirmed) {
      setFriends(friends => friends.filter(f => f.id !== friendId));
      if (selectedFriend?.id === friendId) {
        setSelectedFriend(null);
      }
      Swal.fire({
        title: 'Friend Removed!',
        text: `${friend.name} has been removed from your friends list`,
        icon: 'success',
        confirmButtonColor: '#0ca678',
        timer: 2000,
      });
    }
  }

  return (
    <div className="app">
      <div className="sidebar">
        <h1>💰 Split expenses</h1>
        <ExpenseStats friends={friends} />
        <div className="list-header">
          <h2>Friends</h2>
          <div className="button-group">
            {friends.length > 0 && (
              <Button onClick={handleClearList} className="danger">
                Clear List
              </Button>
            )}
            {friends.some(friend => friend.balance !== 0) && (
              <Button onClick={handleResetAll} className="secondary">
                Reset All
              </Button>
            )}
          </div>
        </div>
        <FriendsList
          friends={friends}
          selectedFriend={selectedFriend}
          onSelection={handleSelection}
          onReset={handleResetFriend}
          onDelete={handleDeleteFriend}
        />
        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? "Close" : "Add friend"}
        </Button>
      </div>
      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          onSplitBill={handleSplitBill}
          key={selectedFriend.id}
        />
      )}
    </div>
  );
}
