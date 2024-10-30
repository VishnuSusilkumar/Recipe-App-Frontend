import React from "react";

interface ProfileProps {
  name: string;
  email: string;
  avatar?: string;
  onLogout: () => void;
}

const quotes = [
  "Cooking is like love. It should be entered into with abandon or not at all. - Harriet Van Horne",
  "Let food be thy medicine and medicine be thy food. - Hippocrates",
  "The secret ingredient is always love.",
  "Good food is all the sweeter when shared with good friends. - Anonymous",
  "Cooking is an art, but all art requires knowing something about the techniques and materials. - Nathan Myhrvold",
];

const ProfileComponent: React.FC<ProfileProps> = ({
  name,
  email,
  avatar,
  onLogout,
}) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8 w-full max-w-full mx-auto text-left">
      {" "}
      {avatar && (
        <img
          src={avatar}
          alt={`${name}'s avatar`}
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mx-auto mb-4"
        />
      )}
      <h2 className="text-xl sm:text-2xl font-bold text-gray-700 mb-2 text-center">
        Profile
        <span className="ml-2 text-xs text-green-500 bg-green-100 rounded-full px-2 py-1">
          Verified
        </span>
      </h2>
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-gray-600 text-sm sm:text-base font-medium mb-1"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          readOnly
          className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-gray-600 text-sm sm:text-base font-medium mb-1"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          readOnly
          className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
        />
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Inspiration
        </h3>
        <ul className="list-disc list-inside text-gray-600 text-sm sm:text-base">
          {quotes.map((quote, index) => (
            <li key={index} className="mb-1 italic">
              "{quote}"
            </li>
          ))}
        </ul>
      </div>
      <button
        onClick={onLogout}
        className="mt-4 bg-red-600 text-white py-2 px-3 rounded-lg w-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        Log Out
      </button>
    </div>
  );
};

export default ProfileComponent;
