import React from 'react';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import Row from 'react-bootstrap/Row';

import useDebouncedValue from './hooks/useDebouncedValue';
import InputForm from './components/InputForm';
import type { FormValues, UpdateValuesCallback } from './types';

import { createQRCode, encodeWifiConfig } from 'wifi-qr';
import QrStringHideable from './components/QrStringHideable';
import QrImage from './components/QrImage';

function WifiQrApp() {
  const [values, setValues] = React.useState<FormValues>({
    ssid: '',
    password: '',
    type: 'nopass',
    hidden: false,
  });

  const [qrImageData, setQrImageData] = React.useState<string>('');
  const [qrString, setQrString] = React.useState<string>('');

  const debouncedValues = useDebouncedValue<FormValues>(values, 50);

  React.useEffect(() => {
    const wifiConfig: FormValues = {
      ...debouncedValues,
      password: debouncedValues.type === 'nopass' ? undefined : debouncedValues.password,
    };

    const generate = async () => {
      const code = await createQRCode(wifiConfig, {}).toDataUrl({ scale: 16 });
      setQrImageData(code);
      setQrString(encodeWifiConfig(wifiConfig));
    };

    if (wifiConfig.ssid) {
      generate().catch((err) => console.warn('something went wrong', err));
    } else {
      setQrImageData('');
      setQrString('');
    }
  }, [debouncedValues]);

  const updateValue: UpdateValuesCallback = (field) => {
    return (event) => {
      if (event.target.type === 'checkbox') {
        setValues({ ...values, [field]: event.target.checked });
      } else {
        setValues({ ...values, [field]: event.target.value });
      }
    };
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
          <Row>
            <QrImage qrData={qrImageData} fullWidth />
          </Row>
          {/* <Row>
            <QrStringHideable qrString={qrString} />
          </Row> */}
        </Col>
      </Row>
    </Container>
  );
}

export default WifiQrApp;
