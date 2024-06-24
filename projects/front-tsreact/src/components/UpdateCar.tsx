import React, { useState } from 'react';
import { Button, Col, FloatingLabel, Form, Modal, Row } from 'react-bootstrap';

interface Props {
  modalShow: boolean;
  onHide: () => void;
}

export const UpdateCar: React.FC<Props> = ({ modalShow, onHide }) => {
  const [updateId, setId] = useState(-1);
  const handleUpdate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Update');
  };

  return (
    <Modal show={modalShow} onHide={onHide}>
      <Form onSubmit={handleUpdate}>
        <Modal.Header closeButton>
          <Modal.Title>Update Car</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="mb-2">
            <Col md>
              <FloatingLabel controlId="floatingUpdateBrand" label="Brand">
                <Form.Select aria-label="Brand" name="brand" required>
                  <option>Honda</option>
                  <option>Nissan</option>
                  <option>Toyota</option>
                  <option>Ford</option>
                </Form.Select>
              </FloatingLabel>
            </Col>
            <Col md>
              <FloatingLabel controlId="floatingUpdateModel" label="Model">
                <Form.Control
                  type="input"
                  placeholder="Model"
                  name="model"
                  required
                />
              </FloatingLabel>
            </Col>
          </Row>
          <Row className="mb-2">
            <Col md>
              <FloatingLabel controlId="floatingUpdateDesc" label="Description">
                <Form.Control
                  type="input"
                  placeholder="Description"
                  name="description"
                />
              </FloatingLabel>
            </Col>
            <Col md>
              <FloatingLabel controlId="floatingUpdateYear" label="Year">
                <Form.Select aria-label="Year" name="year">
                  <option></option>
                  {Array.from({ length: 21 }, (_, idx) => 2004 + idx).map(
                    (i) => (
                      <option key={i}>{i}</option>
                    )
                  )}
                </Form.Select>
              </FloatingLabel>
            </Col>
          </Row>
          <Row className="mb-2">
            <Col md>
              <FloatingLabel controlId="floatingUpdateKm" label="Kilometers">
                <Form.Control
                  type="text"
                  placeholder="1000"
                  name="kilometers"
                  required
                />
              </FloatingLabel>
            </Col>
            <Col md>
              <FloatingLabel controlId="floatingUpdatePrice" label="Price">
                <Form.Control
                  type="text"
                  placeholder="$100,000"
                  name="price"
                  required
                />
              </FloatingLabel>
            </Col>
          </Row>
          <div className="mt-3 d-flex justify-content-end"></div>
        </Modal.Body>
        <Modal.Footer>
          <Button type="button" onClick={onHide} variant="secondary">
            Close
          </Button>
          <Button type="submit" variant="primary">
            Update
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
