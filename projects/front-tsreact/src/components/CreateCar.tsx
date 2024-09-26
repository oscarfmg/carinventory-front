import React from 'react';
import { Button, Col, FloatingLabel, Form, Row } from 'react-bootstrap';
import { type NewCar as NewCarType } from '../types';
import { useCarsActions } from '../hooks/useCarsActions';
import { Add as AddIcon } from '../assets/add';

//TODO: Fix create (let backend handles new id)

export const CreateCar: React.FC = () => {
  const { handleCreate: createCar } = useCarsActions();

  const handleCreate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const brand = formData.get('brand') as string;
    const model = formData.get('model') as string;
    const description = formData.get('description') as string;
    const year =
      formData.get('year') === ''
        ? -1
        : (formData.get('year') as unknown as number);
    const kilometers = formData.get('kilometers');
    const price = formData.get('price') as string;

    if (brand === '' || model === '' || kilometers == null || price === '') {
      return;
    }
    const newCar: NewCarType = {
      brand,
      model,
      description,
      year,
      kilometers: kilometers as unknown as number,
      price,
    };

    createCar(newCar);
    form.reset();
  };

  return (
    <Form onSubmit={handleCreate}>
      <Row className="mb-2">
        <Col md>
          <FloatingLabel controlId="floatingInputBrand" label="Brand">
            <Form.Select aria-label="Brand" name="brand" required>
              <option>Honda</option>
              <option>Nissan</option>
              <option>Toyota</option>
              <option>Ford</option>
            </Form.Select>
          </FloatingLabel>
        </Col>
        <Col md>
          <FloatingLabel controlId="floatingInputModel" label="Model">
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
          <FloatingLabel controlId="floatingInputDesc" label="Description">
            <Form.Control
              type="input"
              placeholder="Description"
              name="description"
            />
          </FloatingLabel>
        </Col>
        <Col md>
          <FloatingLabel controlId="floatingInputYear" label="Year">
            <Form.Select aria-label="Year" name="year">
              <option></option>
              {Array.from({ length: 21 }, (_, idx) => 2004 + idx).map((i) => (
                <option key={i}>{i}</option>
              ))}
            </Form.Select>
          </FloatingLabel>
        </Col>
      </Row>
      <Row className="mb-2">
        <Col md>
          <FloatingLabel controlId="floatingInputKm" label="Kilometers">
            <Form.Control
              type="text"
              placeholder="1000"
              name="kilometers"
              required
            />
          </FloatingLabel>
        </Col>
        <Col md>
          <FloatingLabel controlId="floatingInputPrice" label="Price">
            <Form.Control
              type="text"
              placeholder="$100,000"
              name="price"
              required
            />
          </FloatingLabel>
        </Col>
      </Row>
      <div className="mt-3 d-flex justify-content-end">
        <Button type="submit" variant="primary">
          <AddIcon /> New Car
        </Button>
      </div>
    </Form>
  );
};
