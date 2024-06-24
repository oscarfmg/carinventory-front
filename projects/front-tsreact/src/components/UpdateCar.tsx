import { Button, Col, FloatingLabel, Form, Modal, Row } from 'react-bootstrap';
import { type Car as CarType } from '../types';

interface Props {
  visible: boolean;
  updateDlgData: CarType;
  hideDialog: () => void;
  updateCar: (updateCar: CarType) => void;
}

export const UpdateCar: React.FC<Props> = ({
  visible,
  updateDlgData,
  hideDialog,
  updateCar,
}) => {
  const handleUpdate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(`Update ${updateDlgData.id}`);

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const brand = formData.get('updtBrand') as string;
    const model = formData.get('updtModel') as string;
    const description = formData.get('updtDescription') as string;
    const year =
      formData.get('updtYear') === ''
        ? -1
        : (formData.get('updtYear') as unknown as number);
    const kilometers = formData.get('updtKilometers');
    const price = formData.get('updtPrice') as string;

    if (brand === '' || model === '' || kilometers == null || price === '') {
      return;
    }
    const newCar: CarType = {
      id: updateDlgData.id,
      brand,
      model,
      description,
      year,
      kilometers: kilometers as unknown as number,
      price,
    };

    updateCar(newCar);
    hideDialog();
  };

  return (
    <Modal show={visible} onHide={hideDialog}>
      <Form onSubmit={handleUpdate}>
        <Modal.Header closeButton>
          <Modal.Title>Update Car</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="mb-2">
            <Col md>
              <FloatingLabel controlId="floatingUpdateBrand" label="Brand">
                <Form.Select
                  aria-label="Brand"
                  name="updtBrand"
                  defaultValue={updateDlgData.brand}
                  required
                >
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
                  name="updtModel"
                  defaultValue={updateDlgData.model}
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
                  name="updtDescription"
                  defaultValue={updateDlgData.description}
                />
              </FloatingLabel>
            </Col>
            <Col md>
              <FloatingLabel controlId="floatingUpdateYear" label="Year">
                <Form.Select
                  aria-label="Year"
                  name="updtYear"
                  defaultValue={updateDlgData.year}
                >
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
                  name="updtKilometers"
                  defaultValue={updateDlgData.kilometers}
                  required
                />
              </FloatingLabel>
            </Col>
            <Col md>
              <FloatingLabel controlId="floatingUpdatePrice" label="Price">
                <Form.Control
                  type="text"
                  placeholder="$100,000"
                  name="updtPrice"
                  defaultValue={updateDlgData.price}
                  required
                />
              </FloatingLabel>
            </Col>
          </Row>
          <div className="mt-3 d-flex justify-content-end"></div>
        </Modal.Body>
        <Modal.Footer>
          <Button type="button" onClick={hideDialog} variant="secondary">
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
