import * as React from 'react';
import { useEffect } from 'react';
import Clock from '../../components/Clock/Clock.jsx';

export default function Display() {
  useEffect(() => {
    const player = document.getElementById('youtube-video');

    const onVideoEnd = () => {
      player.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'playVideo' }), '*');
    };

    player.addEventListener('ended', onVideoEnd);

    return () => {
      player.removeEventListener('ended', onVideoEnd);
    };
  }, []);

  return (
    <div className='flex flex-col min-h-screen bg-[#f4c03a]'>
      <header className='bg-[#2f3185] text-white text-[40px] mb-5'>
        <div className='container mx-auto py-2 flex justify-between items-center'>
          <h1>Informasi Antrian</h1>
          <Clock />
        </div>
      </header>

      <main className='flex-grow container mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
          <div className='flex flex-col gap-4'>
            <div className='bg-[#2f3185] text-white min-h-[200px] md:min-h-[250px] w-full flex justify-center items-center'>
              <h1 className='text-7xl font-bold'>Antrian Informasi</h1>
            </div>
            <div className='bg-[#2f3185] text-white min-h-[200px] md:min-h-[250px] w-full flex flex-col justify-center items-center gap-2'>
              <h1 className='text-4xl font-bold'>NOMER ANTRIAN</h1>
              <p className='text-7xl font-bold'>A12</p>
            </div>
          </div>
          <div className='col-span-1 md:col-span-1 md:row-span-2 bg-[#2f3185] min-h-[200px] md:min-h-[515px]'>
            <iframe
              id='youtube-video'
              width='100%'
              height='100%'
              src='https://www.youtube.com/embed/JGnEMmXjGsE?si=75W9UqZNDdvNFMZG&autoplay=1'
              title='YouTube video player'
              frameBorder='0'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              referrerPolicy='strict-origin-when-cross-origin'
              allowFullScreen
            ></iframe>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
          <div className='bg-[#2f3185] text-white min-h-[150px] md:min-h-[200px] flex flex-col justify-center items-center gap-2'>
            <h1 className='text-4xl font-bold'>Antrian Informasi</h1>
            <p className='text-7xl font-bold'>A12</p>
          </div>
          <div className='bg-[#2f3185] text-white min-h-[150px] md:min-h-[200px] flex flex-col justify-center items-center gap-2'>
            <h1 className='text-4xl font-bold'>Antrian Kasir</h1>
            <p className='text-7xl font-bold'>A12</p>
          </div>
        </div>
      </main>

      <footer className='bg-[#2f3185] text-white py-5 mt-auto'>
        <div className='container mx-auto flex justify-between items-center'>
          <h1>Antrian Perpustakaan</h1>
        </div>
      </footer>
    </div>
  );
}
