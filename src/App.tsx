import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [char, setChar] = useState(false);
  const [password, setPassword] = useState("");

  const btnRef = useRef<HTMLButtonElement>(null!);

  const passwordGenerator = useCallback(() => {
    let pass: string = "";
    let str: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (number) str += "0123456789";
    if (char) str += "!@#$%^&*";

    for (let i = 1; i <= length; i++) {
      const ch: string = str.charAt(Math.floor(Math.random() * str.length));
      pass += ch;
    }

    setPassword(pass);

  }, [length, number, char, setPassword]);

  const copyPassword = () => {
    btnRef.current.textContent = "Copied!";
    btnRef.current.style.backgroundColor = "green";

    setTimeout(() => {
      btnRef.current.textContent = "Copy";
      btnRef.current.style.backgroundColor = "#3b82f6";
    }, 1000);

    window.navigator.clipboard.writeText(password);
  };

  useEffect(() => {
    passwordGenerator();
  }, [length, number, char, passwordGenerator]);

  return (
    <>
      <div className='w-full h-screen bg-black sm:p-10'>
        <div className='bg-gray-800 max-w-lg min-w-fit mx-auto p-5 rounded-xl'>
          <h1 className='text-red-500 text-center text-3xl shrink-0'>Password Generator</h1>

          <div className='flex justify-center sm:p-5 py-5'>
            <input
              type="text"
              value={password}
              placeholder='Password'
              className='rounded px-2 py-1 w-full mr-2 font-semibold outline-none'
              readOnly
            />
            <button
              className='bg-blue-500 text-white px-4 py-1 rounded'
              onClick={copyPassword}
              ref={btnRef}
            >Copy</button>
          </div>

          <div className='text-orange-400 sm:flex sm:justify-evenly'>
            <div className='flex gap-2'>
              <input
                type="range"
                min={6}
                max={16}
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
              />
              <label>Length: {length}</label>
            </div>

            <div className='flex items-center gap-1'>
              <input
                type="checkbox"
                onChange={() => setNumber((prev) => !prev)}
              />
              <label>Numbers</label>
            </div>

            <div className='flex items-center gap-1'>
              <input
                type="checkbox"
                onChange={() => setChar((prev) => !prev)}
              />
              <label>Characters</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
