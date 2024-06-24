import { Button, Col, FloatingLabel, Form, Modal, Row } from 'react-bootstrap';
import { type Car as CarType } from '../types';

interface Props {
  modalShow: boolean;
  updateId: number;
  hideModal: () => void;
  modalData: CarType;
  updateCar: (updateCar: CarType) => void;
}

export const UpdateCar: React.FC<Props> = ({
  modalShow,
  updateId,
  hideModal,
  modalData,
  updateCar,
}) => {
  const handleUpdate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(`Update ${updateId}`);

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
    const newCar: CarType = {
      id: updateId,
      brand,
      model,
      description,
      year,
      kilometers: kilometers as unknown as number,
      price,
    };

    updateCar(newCar);
    hideModal();
  };

  return (
    <Modal show={modalShow} onHide={hideModal}>
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
                  name="brand"
                  defaultValue={modalData.brand}
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
                  name="model"
                  defaultValue={modalData.model}
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
                  defaultValue={modalData.description}
                />
              </FloatingLabel>
            </Col>
            <Col md>
              <FloatingLabel controlId="floatingUpdateYear" label="Year">
                <Form.Select
                  aria-label="Year"
                  name="year"
                  defaultValue={modalData.year}
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
                  name="kilometers"
                  defaultValue={modalData.kilometers}
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
                  defaultValue={modalData.price}
                  required
                />
              </FloatingLabel>
            </Col>
          </Row>
          <div className="mt-3 d-flex justify-content-end"></div>
        </Modal.Body>
        <Modal.Footer>
          <Button type="button" onClick={hideModal} variant="secondary">
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
