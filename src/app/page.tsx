'use client'

import Viewer from "./components/ui/viewer";

export default function App() {
  return (
    <>
      <div className="bg-gradient-to-br from-gray-900 to-black">
        <div className="text-gray-300 container mx-auto p-8 overflow-hidden md:rounded-lg md:p-10 lg:p-12">
            <p className="font-sans text-4xl font-bold text-gray-200 max-w-5xl lg:text-7xl lg:pr-24 md:text-6xl">
                Spend less time shaping and more time creating
            </p>
            <div className="h-10"></div>
            <p className="max-w-2xl font-serif text-xl text-gray-400 md:text-2xl">
              From photo to 3D in a couple of minutes
            </p>

            <div className="h-32 md:h-40"></div>

            <div className="grid gap-8 md:grid-cols-2">
              <div className="flex flex-col justify-center">
                <p
                  className="self-start inline font-sans text-xl font-medium text-transparent bg-clip-text bg-gradient-to-br from-green-400 to-green-600">
                  Simple and easy
                </p>
                <h2 className="text-4xl font-bold">Made for 3D  artists and designers</h2>
                <div className="h-6"></div>
                <div className="grid grid-cols-2 gap-4 pt-8 border-t border-gray-800"></div>

                <div className="grid gap-8 md:grid-cols-3">
                  <div className="flex flex-col justify-center md:col-span-2">
                    <p className="font-serif text-xl text-gray-400 md:pr-10">
                      Create a 3D model from photos or text for free and speed up your work many times over. 
                      The app uses advanced machine learning models to bring your vision to life in an instant.
                    </p>
                  </div>
                </div>
              </div>
                <div>
                    <div className="-mr-24 rounded-lg md:rounded-l-full md:w-auto bg-gradient-to-br from-gray-900 to-black h-96 content-center flex items-center">
                      <Viewer url="https://volumize-bucket.s3.amazonaws.com/robot_demo.obj" rotate={[0.00, 0.01, 0.00]}></Viewer>
                    </div>
                </div>
            </div>

            <div className="h-32 md:h-40"></div>

            <div className="grid gap-4 md:grid-cols-3">
                <div className="flex-col p-8 py-16 rounded-lg shadow-2xl md:p-12 bg-gradient-to-br from-gray-900 to-black">
                    <p
                        className="flex items-center justify-center text-4xl font-semibold text-green-400 bg-green-800 rounded-full shadow-lg w-14 h-14">
                        1
                    </p>
                    <div className="h-6"></div>
                    <p className="font-serif text-3xl">We build models with quality in mind</p>
                </div>
                <div className="flex-col p-8 py-16 rounded-lg shadow-2xl md:p-12 bg-gradient-to-b from-gray-900 to-black">
                    <p
                        className="flex items-center justify-center text-4xl font-semibold text-indigo-400 bg-indigo-800 rounded-full shadow-lg w-14 h-14">
                        2
                    </p>
                    <div className="h-6"></div>
                    <p className="font-serif text-3xl">
                        Models are created super fast
                    </p>
                </div>
                <div className="flex-col p-8 py-16 rounded-lg shadow-2xl md:p-12 bg-gradient-to-bl from-gray-900 to-black">
                    <p
                        className="flex items-center justify-center text-4xl font-semibold text-teal-400 bg-teal-800 rounded-full shadow-lg w-14 h-14">
                        3
                    </p>
                    <div className="h-6"></div>
                    <p className="font-serif text-3xl">We made it simple and easy to use</p>
                </div>
            </div>

           
          </div>
      </div>
    </>
  );
}


