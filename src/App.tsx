import React, {useEffect, useState} from 'react';
import {DocumentDuplicateIcon} from "@heroicons/react/24/outline";
import Notification from "./Notification";

function rgbToHex(rgb: string): { red: string; green: string; blue: string } {
    // remove the "rgb(" at the start and ")" at the end, and then split into components
    const parts = rgb.slice(4, -1).split(',').map(part => parseInt(part.trim()));

    if (parts.length !== 3 || parts.some(isNaN)) return {red: '', green: '', blue: ''};

    let [r, g, b] = parts;

    let red = r.toString(16);
    let green = g.toString(16);
    let blue = b.toString(16);

    if (red.length === 1)
        red = "0" + red;
    if (green.length === 1)
        green = "0" + green;
    if (blue.length === 1)
        blue = "0" + blue;

    return {red, green, blue};
}


function App() {
    const [bgColor, setBgColor] = useState<string>('#ffffff');
    const [red, setRed] = useState<number>(0);
    const [green, setGreen] = useState<number>(0);
    const [blue, setBlue] = useState<number>(0);
    const [rgb, setRgb] = useState<string>('');
    const [hex, setHex] = useState<string>('');

    const [show, setShow] = useState(false)

    useEffect(() => {

        const {red, green, blue} = rgbToHex(rgb);
        setHex(`${red}${green}${blue}`);
        setBgColor(`#${hex}`);
        setRed(parseInt(red, 16));
        setGreen(parseInt(green, 16));
        setBlue(parseInt(blue, 16));
    }, [rgb, hex]); // Add rgb as a dependency to the effect

    const handleCopy = () => {
        navigator.clipboard.writeText(hex).then(() => {
            // Show the notification
            setShow(true);

            // Hide the notification after 3 seconds
            setTimeout(() => {
                setShow(false);
            }, 3000);
        });
    };


    return (
        <div className='flex items-center justify-center flex-col min-h-screen'
             style={{backgroundColor: bgColor}}>
            <Notification show={show} setShow={setShow}/>
            <div className="rounded-lg w-96 shadow-2xl">
                <div className="rounded-tr-lg rounded-tl-lg p-6 bg-[#2d2c2c]">
                    <h1 className='text-white uppercase tracking-wider text-3xl mb-6'>converter <span
                        className='text-[#737373] text-sm'>V1</span></h1>
                    <input
                        type='text'
                        value={rgb}
                        onChange={(e) => setRgb(e.target.value)}
                        className='bg-[#383737] focus:outline-0 text-white rounded-md mb-6 px-3 py-2'/>
                    <div className='flex justify-between text-xs font-normal text-[#737373] items-center uppercase'>
                        <div className='flex flex-col'>
                            <p>r <span className='uppercase text-3xl text-white'>{red || 0}</span></p>
                        </div>
                        <div className='flex flex-col'>
                            <p>g <span className='uppercase text-3xl text-white'>{green || 0}</span></p>
                        </div>
                        <div className='flex flex-col'>
                            <p>b <span className='uppercase text-3xl text-white'>{blue || 0}</span></p>
                        </div>
                    </div>
                </div>
                <div
                    className='rounded-br-lg text-[#737373] uppercase rounded-bl-lg flex items-center justify-between bg-white p-6'>
                    <p>#<span className=' ml-1 text-3xl tracking-wider text-[#2d2c2c]'>{hex || `000000`}</span></p>
                    <button onClick={handleCopy} className='text-[#2d2c2c]'>
                        <DocumentDuplicateIcon width={20}/>
                    </button>
                </div>

            </div>
        </div>
    );
}

export default App;
