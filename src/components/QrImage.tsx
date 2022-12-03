import React from 'react';

import Image from 'react-bootstrap/Image';

type Props = {
  qrData: string;
  fullWidth?: boolean;
};

const QrImage = ({ qrData, fullWidth }: Props) => {
  const className = fullWidth ? 'w-100' : '';
  return <Image fluid src={qrData} className={className} />;
};

export default QrImage;
