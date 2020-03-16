import React, { useState } from "react";

import {
  FormGroup,
  FormControl,
  ButtonToolbar,
  Button,
  Form,
  Modal
} from "rsuite";

function CreateNewDecisionPopUp(props) {
  const [formValue, setFormValue] = useState({ title: "" });
  const [hasError, setHasError] = useState(false);
  const errorMessage = hasError ? "This field is required" : null;

  const handleSubmit = () => {
    !formValue.title ? setHasError(true) : props.onCreate(formValue.title);
  };

  const handleChange = formValue => {
    setFormValue(formValue);
    formValue.title ? setHasError(false) : setHasError(true);
  };

  return (
    <Modal size="xs" show={props.isVisible} onHide={props.onCancel}>
      <Modal.Header>
        <Modal.Title>Create New Decision</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onChange={handleChange} fluid>
          <FormGroup>
            <FormControl
              placeholder="What do we need to decide?"
              name="title"
              errorMessage={errorMessage}
              errorPlacement="bottomStart"
            />
          </FormGroup>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <ButtonToolbar>
          <Button appearance="primary" onClick={handleSubmit}>
            Submit
          </Button>
          <Button onClick={props.onCancel} appearance="subtle">
            Cancel
          </Button>
        </ButtonToolbar>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateNewDecisionPopUp;
