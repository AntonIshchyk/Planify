import React from 'react';
import './modal.css';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    friends: { id: string; firstName: string; lastName: string }[];
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, friends }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h3>Friends Attending</h3>
                {friends.length > 0 ? (
                    <ul>
                        {friends.map((friend) => (
                            <li key={friend.id}>
                                {friend.firstName} {friend.lastName}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No friends attending this event.</p> // Display this if no friends are in the list
                )}
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default Modal;
