import React, { useState } from 'react';
import { Typography } from '@material-tailwind/react';

export function SimpleFooter() {
  const [footerHeight, setFooterHeight] = useState('20px');
  const [isFooterHidden, setIsFooterHidden] = useState(false);

  const handleFooterHeightChange = (newHeight) => {
    setFooterHeight(newHeight);
    setIsFooterHidden(newHeight === '0px' || newHeight === '10px'); // Set isFooterHidden to true when the height is 0px or 10px
  };

  return (
    <footer
      className={`flex flex-col items-center justify-center gap-y-6 border-t border-blue-gray-50 py-6 text-center md:flex-row md:justify-between ${
        isFooterHidden ? 'hidden' : ''
      }`}
      style={{ paddingTop: footerHeight, paddingBottom: footerHeight }}
    >
      <div className="flex flex-col items-center gap-y-2">
        <Typography color="blue-gray" className="font-normal">
          &copy; 2023 Masnstay
        </Typography>
        <div className="flex items-center gap-x-2">
          <img
            src="../src/assets/masnstay.jpg"
            alt="Logo"
            className="h-16 w-16 mr-2 "
          />
          <Typography color="blue-gray" className="text-sm">
            Masnstay
          </Typography>
        </div>
      </div>

      <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
        <li>
          <Typography
            as="a"
            href="#"
            color="blue-gray"
            className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
          >
            About Us
          </Typography>
          <Typography>MasnStay adalah aplikasi pemesanan hotel.</Typography>
        </li>

        <li>
          <Typography
            as="a"
            href="#"
            color="blue-gray"
            className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
          >
            Contact Us
          </Typography>
          <Typography>
            Jl. Asia Afrika No.133-137, Kebon Pisang, Sumurbandung, Bandung
            City, West Java
          </Typography>
          <Typography>082219308866</Typography>
          <Typography>masn40208@gmail.com</Typography>
        </li>
      </ul>

      <div className="flex gap-4">
        <button
          onClick={() => handleFooterHeightChange('10px')}
          className="px-4 py-2 text-sm font-medium text-black bg-yellow-500 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring focus:border-yellow-300"
        >
          Chat Admin
        </button>
        <button
          onClick={() => handleFooterHeightChange('0px')}
          className="px-4 py-2 text-sm font-medium text-black bg-yellow-500 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring focus:border-yellow-300"
        >
          Closed
        </button>
      </div>
    </footer>
  );
}
