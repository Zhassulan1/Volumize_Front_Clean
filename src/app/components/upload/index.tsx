"use client";

import './upload.css';
import React, { useState } from 'react';
import Viewer from '../ui/viewer';
import Progress from '../ui/progres';
import TimeCounter from '../ui/timer';

const BACKEND_URL = 'http://13.49.145.207:8000';

export default function UploadSection() {
  const [file, setFile] = useState<File>();
  const [objURL, setObjURL] = useState('');
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [isProcessed, setIsProcessed] = useState(false);
  const [loading, setLoading] = useState(false);

  const debugURL = "https://volumize-bucket.s3.amazonaws.com/userobj_2495554_1720093439.683805_tmp1ec1_z5e.obj";

  const onDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      const selectedFile = event.dataTransfer.files[0];
      setFile(selectedFile);
      setImageURL(URL.createObjectURL(selectedFile));
      event.dataTransfer.clearData();
    }
  };

  const onDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
      setImageURL(URL.createObjectURL(selectedFile));
    }
  };

  const onRemoveImage = () => {
    setFile(undefined);
    setImageURL(null);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const debug = false;
    if (debug) {
      setObjURL(debugURL);
      return;
    }
    if (!file) {
      return;
    }

    try {
      setLoading(true);
      const data = new FormData();
      data.set('image', file);

      const processRes = await fetch(`${BACKEND_URL}/process`, {
        method: 'POST',
        body: data
      });

      if (!processRes.ok) {
        throw new Error(await processRes.text());
      }

      const processResult = await processRes.json();
      if (processRes.ok) {
        console.log('File URL:', processResult.image_url);
        setIsProcessed(true);
      } else {
        console.error('Upload failed:', processResult.error);
      }

      const modelData = {
        image_url: processResult.image_url
      };

      const res = await fetch(`${BACKEND_URL}/make_3d`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(modelData)
      });

      if (!res.ok) {
        throw new Error(await res.text());
      }

      const modelResult = await res.json();
      if (res.ok) {
        console.log('Model URL:', modelResult.model_url);
        setObjURL(modelResult.model_url);
        setLoading(false);
      } else {
        console.error('Upload failed:', modelResult.error);
      }

    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <>
      <div className='flex flex-row items-center m-auto justify-center align-middle'>
        <div className='w-1/3 p-5'>
          <form onSubmit={onSubmit} className='flex flex-col m-auto'>
            {imageURL ? (
              <div className="relative flex flex-col items-center justify-center">
                <img src={imageURL} alt="Thumbnail" className="w-64 h-64 object-cover rounded-lg" />
                <button 
                  type="button" 
                  className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" 
                  data-modal-toggle="deleteModal"
                  onClick={onRemoveImage}
                >
                  <svg 
                    aria-hidden="true" 
                    className="w-5 h-5" 
                    fill="currentColor" 
                    viewBox="0 0 20 20" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      fill-rule="evenodd" 
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" 
                      clip-rule="evenodd"
                    >
                    </path>
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              
            ) : (
              <div className="flex items-center justify-center w-full m-15">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  onDrop={onDrop}
                  onDragOver={onDragOver}
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    name="image"
                    multiple
                    onChange={onFileChange}
                    className="hidden"
                  />
                </label>
              </div>
            )}

            <button
              type="submit"
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none hover:ring-blue-300 dark:hover:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 my-11"
            >
              Upload
            </button>
          </form>
        </div>

        {loading && 
          <div>
            <Progress isProcessed={isProcessed} />
            <TimeCounter />
          </div>
        }

        {(objURL && !loading) &&
          <div className='h-64 flex flex-col my-auto'>
            <Viewer url={objURL} rotate={[0, 0, 0]} />

            <a
              type="submit"
              href={objURL}
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none hover:ring-blue-300 dark:hover:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 my-1"
            >
              Download
            </a>
          </div>
        }
      </div>
    </>
  );
}
