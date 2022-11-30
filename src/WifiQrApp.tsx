import React from 'react';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Placeholder from 'react-bootstrap/Placeholder';
import Row from 'react-bootstrap/Row';

import useDebouncedValue from './hooks/useDebouncedValue';
import InputForm from './components/InputForm';
import type { FormValues, UpdateValuesCallback } from './types';

import { createQRCode, encodeWifiConfig } from 'wifi-qr';

function WifiQrApp() {
  const [values, setValues] = React.useState<FormValues>({
    ssid: '',
    password: '',
    type: 'nopass',
    hidden: false,
  });

  const [qrData, setQrData] = React.useState<string>('');
  const [qrCode, setQrCode] = React.useState<string>('');

  const debouncedValues = useDebouncedValue<FormValues>(values, 250);

  React.useEffect(() => {
    const wifiConfig: FormValues = {
      ...debouncedValues,
      password: debouncedValues.type === 'nopass' ? undefined : debouncedValues.password,
    };

    const generate = async () => {
      const code = await createQRCode(wifiConfig, {}).toDataUrl({ scale: 16 });
      setQrData(code);
      setQrCode(encodeWifiConfig(wifiConfig));
    };

    if (wifiConfig.ssid) {
      generate().catch((err) => console.warn('something went wrong', err));
    }
  }, [debouncedValues]);

  const updateValue: UpdateValuesCallback = (field) => {
    return (event: any /*ChangeEventHandler*/) =>
      setValues({ ...values, [field]: event.target.value });
  };

  return (
    <Container>
      <Row mt={8}>
        <h1>WiFi QR code generator</h1>
      </Row>
      <Row>
        <Col md={8}>
          <InputForm values={values} updateValue={updateValue} />
        </Col>
        <Col md={4}>
          <Image fluid src={qrData} className="w-100" />
          <p className="font-monospace">{qrCode}</p>
        </Col>
      </Row>
    </Container>
  );
}

export default WifiQrApp;
