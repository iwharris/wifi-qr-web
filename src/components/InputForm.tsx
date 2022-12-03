import React from 'react';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import { TYPES } from '../helpers';
import { FormValues, UpdateValuesCallback } from '../types';

type Props = {
  values: FormValues;
  updateValue: UpdateValuesCallback;
};

const InputForm = ({ values, updateValue }: Props) => {
  return (
    <Form noValidate>
      <Row>
        <Col>
          <Form.Group controlId="ssid">
            <Form.Label>SSID</Form.Label>
            <Form.Control
              type="ssid"
              placeholder="Enter SSID"
              value={values.ssid}
              onChange={updateValue('ssid')}
            />
            <Form.Text className="text-muted">Your wifi network's SSID</Form.Text>
          </Form.Group>
        </Col>

        <Col>
          <Form.Group controlId="type">
            <Form.Label>Authentication type</Form.Label>
            <Form.Select aria-label="" value={values.type} onChange={updateValue('type')}>
              {Object.entries(TYPES).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Label> </Form.Label>
          <Form.Group controlId="isHiddenNetwork">
            <Form.Check
              type="checkbox"
              label="Hidden network?"
              value={values.hidden ? 'Y' : 'N'}
              onChange={updateValue('hidden')}
            />
            <Form.Text className="text-muted">Whether the network broadcasts its SSID</Form.Text>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={values.password}
              onChange={updateValue('password')}
              disabled={values.type === 'nopass'}
            />
            <Form.Text className="text-muted">Your wifi network's password</Form.Text>
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
};

export default InputForm;
