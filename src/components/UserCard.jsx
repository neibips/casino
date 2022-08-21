import React from "react";

const UserCard = ({ won, lost }) => {
  return (
    <div className="user-card">
      <h5 className="ChakraPetch text-center">Rooster</h5>
      <div className="w-100 user-card-gray-box mt-3 mb-3">
          hello world
      </div>
      <button
        className={`ChakraPetch ${
          (won && "doubled_btn") || (lost && "rugged_btn")
        } py-3 border-0 fw-bold border-0 w-100`}
      >
        WON 0.28 SOL
      </button>
    </div>
  );
};

export default UserCard;
