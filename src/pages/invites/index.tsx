import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiBell } from 'react-icons/fi';
import Hamster from '../../icons/Hamster.tsx';
import Settings from '../../icons/Settings.tsx';
import Friends from '../../icons/Friends.tsx';
import Coins from '../../icons/Coins.tsx';
import { fetchMultipleFiles } from '../../data/api.tsx';
import { Invite } from '../invites/invite';

import Post from "../../icons/Post.tsx";
import Status from "../../icons/Status.tsx";
import Upload from "../../icons/Upload.tsx";

const Invites = ({ telegramUsername }: { telegramUsername: string }) => {
  const [files, setFiles] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const getFiles = async () => {
      try {
        const data = await fetchMultipleFiles(telegramUsername);
        console.log('Fetched files:', data);
        setFiles(data);
      } catch (err) {
        setError('Failed to fetch files');
        console.error('Fetch error:', err);
      }
    };

    if (telegramUsername) {
      getFiles();
    }
  }, [telegramUsername]);

  return (
      <>
        <div className="bg-black flex justify-center">
          <div className="w-full bg-black text-white h-screen font-bold flex flex-col max-w-xl">
            {/* Top Section */}
            <div className="px-4 z-10">
              <div className="flex items-center space-x-2 pt-4">
                <div className="p-1 rounded-lg bg-[#1d2025]">
                  <Hamster size={24} className="text-[#d4d4d4]"/>
                </div>
                <div>
                  <p className="text-sm">Nikandr (CEO)</p>
                </div>
              </div>

              <div className="flex items-center justify-between space-x-4 mt-4 relative">
                <button onClick={() => setShowNotifications(!showNotifications)}>
                  <FiBell size={20} className="text-white"/>
                </button>
                {showNotifications && (
                    <div
                        className="absolute top-10 right-0 w-64 bg-[#1c1f24] border border-[#43433b] rounded-lg p-4 text-white z-50">
                      <h3 className="font-bold text-lg mb-2">Notifications</h3>
                      <ul>
                        <li className="bg-[#272a2f] rounded-lg p-2 mb-2">
                          No new notifications
                        </li>
                      </ul>
                    </div>
                )}
                <Settings className="text-white"/>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-grow mt-4 bg-[#0000FF] rounded-t-[48px] relative top-glow z-0">
              <div className="absolute top-[2px] left-0 right-0 bottom-0 bg-[#1d2025] rounded-t-[46px]">
                <div className="px-4 mt-6">
                  <div className="bg-[#272a2f] rounded-lg px-4 py-2 w-full relative">
                    {error && <p>{error}</p>}
                    <div className="overflow-y-scroll max-h-[500px]">
                      {files.slice(-5).reverse().map((file, index) => (
                          <Invite
                              key={index}
                              name={file.name}
                              value={file.value}
                              checked={file.checked}
                              condition={file.condition}
                              make={file.make}
                              model={file.model}
                              year={file.year}
                              price={file.price}
                              imageUrl={`http://localhost:5000/${file.files[0]?.filePath}`}
                          />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            {/* Footer */}
            <div
                className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-[calc(100%-2rem)] max-w-xl bg-[#E1F0F5] flex justify-around items-center z-50 rounded-t-3xl py-3 shadow-2xl drop-shadow-lg transition-all duration-300"
            >
              {/* Wallet */}
              <div className="text-center text-black w-1/5 hover:text-blue-700 transition-colors duration-300">
                <Link to="/upload">
                  <div className="flex flex-col items-center space-y-1">
                    <Upload className="w-7 h-7 mx-auto"/>
                    <p className="mt-1 text-sm font-bold">Upload</p>
                  </div>
                </Link>
              </div>

              {/* Swap */}
              <div className="text-center text-gray-400 w-1/5 hover:text-blue-700 transition-colors duration-300">
                <Link to="/invites">
                  <div className="flex flex-col items-center space-y-1">
                    <Status className="w-7 h-7 mx-auto"/>
                    <p className="mt-1 text-sm font-bold">Status</p>
                  </div>
                </Link>
              </div>

              {/* Center Highlighted Icon */}
              <Link to="/stats">
                <div className="relative -top-8 flex justify-center items-center mx-4">
                  <div
                      className="absolute bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-full shadow-2xl z-10 border-[4px] border-gray-900 transition-transform transform hover:scale-110 duration-300">
                    <Friends className="w-7 h-7 mx-auto size-24 text-black"/>
                  </div>
                </div>
              </Link>

              {/* Apps */}
              <div className="text-center text-gray-400 w-1/5 hover:text-blue-700 transition-colors duration-300">
                <Link to="/post">
                  <div className="flex flex-col items-center space-y-1">
                    <Post className="w-7 h-7 mx-auto"/>
                    <p className="mt-1 text-sm font-bold">Post</p>
                  </div>
                </Link>
              </div>

              <div className="text-center text-gray-400 w-1/5 hover:text-blue-700 transition-colors duration-300">
                <Link to="/payment">
                  <div className="flex flex-col items-center space-y-1">
                    <Coins className="w-7 h-7 mx-auto"/>
                    <p className="mt-1 text-sm font-bold">Payment</p>
                  </div>
                </Link>
              </div>
            </div>


          </div>
        </div>
      </>
  );
};

export default Invites;
