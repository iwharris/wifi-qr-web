import React from 'react';
import { Button } from 'react-bootstrap';

import { FaEye } from 'react-icons/fa';

type Props = {
  qrString: string;
};

const QrStringHideable = ({ qrString }: Props) => {
  const [isShown, setShown] = React.useState(false);

  if (!qrString) {
    return null;
  } else {
    return (
      <div className="">
        <Button className="btn btn-link d-inline" onClick={() => setShown(!isShown)}>
          <FaEye />
        </Button>
        <p style={{ width: '100%' }} className="d-inline font-monospace bg-light overflow-scroll">
          {isShown ? qrString : 'Click to see raw string...'}
        </p>
      </div>
    );
  }
};

export default QrStringHideable;
