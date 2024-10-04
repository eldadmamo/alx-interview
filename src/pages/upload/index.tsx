import React, {useState} from 'react'

import WebApp from "@twa-dev/sdk";
import { Link } from 'react-router-dom';

import Hamster from "../../icons/Hamster.tsx";
import Settings from "../../icons/Settings.tsx";

import Friends from "../../icons/Friends.tsx";
import Coins from "../../icons/Coins.tsx";
import CarCondition from "../../components/CarCondition.tsx";
import CarModelDropdown from "../../components/CarModelDropdown.tsx";
import CarYear from "../../components/CarYear.tsx";
import Color from "../../components/Color.tsx";
import EngineWork from "../../components/Engine.tsx";
import FuelType from "../../components/FuelType.tsx";
import Transmission from "../../components/Transmission.tsx";
import {multipleFilesUpload} from "../../data/api.tsx";
import {toast,Toaster} from 'react-hot-toast';
import watermarkImg from '../../images/Hulemekina.png';

import Status from "../../icons/Status.tsx";
import Post from "../../icons/Post.tsx";
import Upload from "../../icons/Upload.tsx";



function Uploads() {
  const usering = WebApp.initDataUnsafe.user;
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [multipleFiles, setMultipleFiles] = useState<File[]>([]);
  const [price, setPrice] = useState('');
  const [carplate, setCarplate] = useState('');
  const [condition, setCondition]  = useState('');
  const [fuel, setFuel] = useState('');
  const [engine, setEngine] = useState('');
  const [transmission, setTransmission] = useState('');
  const [color, setColor] = useState('');
  const [milage, setMilage] = useState('');
  const [checked, setChecked] = useState(false);


  const MultipleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles && selectedFiles.length > 10) {
      alert("You can only upload a maximum of 10 files.");
      return;
    }
    setMultipleFiles(selectedFiles ? Array.from(selectedFiles) : []);
  }



  const addWatermark = (file: File, filename: string) => {
    return new Promise<{ blob: Blob; uniqueFilename: string }>((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        if (typeof e.target?.result === "string") {
          const img = new Image();
          img.src = e.target.result;
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (ctx) {
              canvas.width = img.width;
              canvas.height = img.height;
              ctx.drawImage(img, 0, 0);

              // Load watermark
              const watermark = new Image();
              watermark.src = watermarkImg;
              watermark.onload = () => {
                const scale = 0.3; // Scale watermark size
                const watermarkWidth = watermark.width * scale;
                const watermarkHeight = watermark.height * scale;

                // Generate random coordinates for the watermark
                const x = Math.random() * (canvas.width - watermarkWidth);
                const y = Math.random() * (canvas.height - watermarkHeight);

                ctx.drawImage(watermark, x, y, watermarkWidth, watermarkHeight);
                canvas.toBlob((blob) => {
                  const uniqueFilename = `${filename}_${Date.now()}.jpg`;
                  resolve({ blob: blob!, uniqueFilename });
                }, 'image/jpeg', 0.95);
              };
            }
          };
        }
      };
    });
  };

  const UploadMultipleFile = async () => {
    if (!make || !model || !year || !price || !condition || !fuel || !engine || !transmission || !color) {
      toast.error("Please fill out all required fields."); // Display error toast instead of alert
      return;
    }

    const formData = new FormData();
    formData.append('make', make);
    formData.append('model', model);
    formData.append('year', year);
    formData.append('price', price);
    formData.append('condition', condition);
    formData.append('carplate', carplate);
    formData.append('fuel', fuel);
    formData.append('engine', engine);
    formData.append('transmission', transmission);
    formData.append('color', color);
    formData.append('milage', milage);

    const telegramUsername = usering?.username || 'unknown';
    const telegramId = usering?.id ? String(usering.id) : 'unknown';
    formData.append('telegram_id', telegramId);
    formData.append('telegram_username', telegramUsername);
    formData.append('checked', String(checked));

    const watermarkedFiles = [];
    for (let i = 0; i < multipleFiles.length; i++) {
      const file = multipleFiles[i];
      const { blob, uniqueFilename } = await addWatermark(file, file.name);
      watermarkedFiles.push({ blob, uniqueFilename });
    }

    watermarkedFiles.forEach(({ blob, uniqueFilename }) => {
      formData.append('files', blob, uniqueFilename);
    });

    try {
      await multipleFilesUpload(formData);
      toast.success('Upload successful! Please wait for the review.');
      // Clear all fields
      setMake('');
      setModel('');
      setYear('');
      setPrice('');
      setCarplate('');
      setCondition('');
      setFuel('');
      setEngine('');
      setTransmission('');
      setColor('');
      setMilage('');
      setMultipleFiles([]);
      setChecked(false);
    } catch (error) {
      toast.error('Upload failed. Please try again.');
    }
  };



  return (
      <>

        <div className="bg-black flex justify-center">
          <div className="w-full bg-black text-white h-screen font-bold flex flex-col max-w-xl">
            <div className="px-4 z-10">
              <div className="flex items-center space-x-2 pt-4">
                <div className="p-1 rounded-lg bg-[#1d2025]">
                  <Hamster size={24} className="text-[#d4d4d4]"/>
                </div>
                <div>
                  <p className="text-sm">{usering?.first_name}</p>
                  <p className="text-sm">{usering?.id}</p>
                </div>
              </div>
              <div className="flex items-center justify-between space-x-4 mt-1">
                <div className="flex items-center w-1/3">
                  <div className="w-full">


                  </div>
                </div>
                <div
                    className="border-2 border-[#43433b] rounded-full px-4 py-[2px] bg-[#43433b]/[0.6] max-w-64">

                  <div className="bg-[#43433b] mx-2"></div>
                  <Settings className="text-white"/>
                </div>
              </div>
            </div>

            <div
                className="flex-grow mt-12 bg-gradient-to-b from-[#0000FF] to-[#000000] rounded-t-[48px] relative top-glow z-0">

              <div
                  className="absolute top-[2px] left-0 right-0 bottom-0 bg-[#1d2025] rounded-t-[46px] h-[500px] overflow-y-auto">
                <div className="px-4 mt-6 flex justify-between gap-2">
                  <div className="bg-[#272a2f] rounded-lg px-4 py-2 w-full relative">
                    <div className="dot"></div>
                    <img src={watermarkImg} alt="Daily Combo" className="mx-auto w-20 h-20"/>
                    <p className="text-[50px] text-center text-white mt-1">Hulemekina</p>

                  </div>
                </div>

                <div
                    className=" border-gray-300  p-6 mx-auto rounded-lg shadow-lg transition hover:shadow-xl">
                  <div className="">
                    <div>
                      <div className="form-container">
                        <CarCondition setCondition={setCondition}/>
                        <div>
                          <CarModelDropdown
                              selectedMake={make}
                              setSelectedMake={setMake}
                              selectedModel={model}
                              setSelectedModel={setModel}
                          />
                        </div>
                        <div>
                          <CarYear selectedYear={year} setSelectedYear={setYear}/>
                        </div>
                        <div>
                          <label className="block text-lg font-semibold text-gray-700 mb-2">Price*:</label>
                          <input
                              required
                              type="text"
                              value={price}
                              className="border border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 block w-full p-3 rounded-lg text-gray-700 transition-colors duration-300 ease-in-out"
                              onChange={(e) => {
                                const inputmilage = e.target.value;
                                const formattedmilage = inputmilage.replace(/\D/g, "");
                                const numbermilageCommas = formattedmilage.replace(
                                    /\B(?=(\d{3})+(?!\d))/g,
                                    ","
                                );
                                setPrice(numbermilageCommas);
                              }}
                          />
                        </div>
                        <div>
                          <label className="block text-lg font-semibold text-gray-700 mb-2">Plate
                            Number(optional):</label>
                          <input
                              type="String"
                              value={carplate}
                              className="border border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 block w-full p-3 rounded-lg text-gray-700 transition-colors duration-300 ease-in-out"
                              onChange={(e) => {
                                setCarplate(e.target.value);
                              }}
                          />
                        </div>
                        <div>
                          <label className="block text-lg font-semibold text-gray-700 mb-2">Milage(optional):</label>
                          <input
                              type="text"
                              value={milage}
                              className="border border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 block w-full p-3 rounded-lg text-gray-700 transition-colors duration-300 ease-in-out"
                              onChange={(e) => {
                                const inputmilage = e.target.value;
                                const formattedmilage = inputmilage.replace(/\D/g, "");
                                const numbermilageCommas = formattedmilage.replace(
                                    /\B(?=(\d{3})+(?!\d))/g,
                                    ","
                                );
                                setMilage(numbermilageCommas);
                              }}
                          />
                        </div>


                        <Color selectedColor={color} setSelectedColor={setColor}/>
                        <FuelType selectedFuel={fuel} setSelectedFuel={setFuel}/>
                        <EngineWork selectedEngine={engine} setSelectedEngine={setEngine}/>
                        <Transmission
                            selectedTransmission={transmission}
                            setSelectedTransmission={setTransmission}
                        />
                      </div>
                      <div className="">
                        <label className="block text-lg font-semibold text-gray-700 mb-2">Upload Photos</label>
                        <input
                            type="file"
                            onChange={(e) => MultipleFileChange(e)}
                            className="border border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 block w-full p-3 rounded-lg text-gray-700 transition-colors duration-300 ease-in-out"
                            multiple
                        />
                      </div>
                      <div className="px-4 mt-6">
                        <button
                            type="button"
                            className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full"
                            onClick={() => UploadMultipleFile()}
                        >
                          Upload
                        </button>
                      </div>
                      <div>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>


          </div>

          {/* Bottom fixed div */}
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
                  <Friends className="w-7 h-7 mx-auto size-24"/>
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
        <Toaster/>
      </>
  )
}

export default Uploads;
