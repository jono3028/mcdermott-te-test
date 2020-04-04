import React, { useState } from 'react';
import { Form, Button, Icon, Modal, Label, Input, TextArea} from 'semantic-ui-react';
import { v4 as uuid4 } from 'uuid';
import moment from 'moment';

const formReset = {
  boxOfficeTake: '',
  description: '',
  favorite: false,
  filmID: '',
  filmTitle: '',
  imageURL: '',
  leadActor: '',
  ukRelease: null
}
const regexString = /^\S[\w\d].+/;
const regexNumber = /\d+\.\d$|^[1-9]\d*$/
const regexDate = /^[\d,-]{10}$/

const formValidation = {
  boxOfficeTake: {touched: false, dirty: false, valid: regexNumber},
  description: {touched: false, dirty: false, valid: regexString},
  filmTitle: {touched: false, dirty: false, valid: regexString},
  imageURL: {touched: false, dirty: false, valid: regexString},
  leadActor: {touched: false, dirty: false, valid: regexString},
  ukRelease: {touched: false, dirty: false, valid: regexDate},
}

export const CreateFilm = props => {
  const { onSaveClick } = props;
  const [formValues, setFormValues] = useState(formReset);
  const [validation, setValidation] = useState(formValidation);
  const [showModal, setShowModal] = useState(false);

  function handleOnChange(fieldName) {
    return (evt) => {
      console.log(evt);
      const value = evt.target.value;
      setFormValues({...formValues, [fieldName]: value})
    }
  }
  function handleOnFocus(fieldName, onFocus) {
    let record = validation[fieldName];
    const isFocus = onFocus ? 'touched' : 'dirty';
    record[isFocus] = true;
    setValidation({...validation, [fieldName]: record})
  }

  function errorCheck(fieldName) {
    if (formValidation[fieldName].touched && formValidation[fieldName].dirty) {
      return !formValidation[fieldName].valid.test(formValues[fieldName]);
    }
    return false
  }

  const onCloseModal = () => {
    setShowModal(false); 
    setValidation(formValidation);
    setFormValues(formReset);
  }

  const onSave = () => {
    const newFilm = {
      ...formValues,
      ukRelease: moment(formValues.ukRelease),
      boxOfficeTake: `£${formValues.boxOfficeTake} million`,
      filmID: uuid4()
    }

    onSaveClick(newFilm)
    onCloseModal()
  }

  return (
    <>
    <Button className="moviegallery moviegallery_addbutton" onClick={() => setShowModal(true)}>
      <Button.Content visible>
        <Icon name="plus square"/>
        Add Film
      </Button.Content>
    </Button>

    <Modal  
      open={showModal}
      closeOnDimmerClick={false}
      centered={false}
    >
      <Modal.Header>Add Film</Modal.Header>
      <Modal.Content>
        <Form >
          <Form.Input 
            onFocus={() => handleOnFocus('filmTitle', true)}
            onBlur={() => handleOnFocus('filmTitle', false)} 
            error={errorCheck('filmTitle')}
            label="Film Title" 
            placeholder="Film Title" 
            value={formValues.filmTitle} 
            onChange={handleOnChange('filmTitle')}
          />
          <Form.Input 
            onFocus={() => handleOnFocus('leadActor', true)}
            onBlur={() => handleOnFocus('leadActor', false)} 
            error={errorCheck('leadActor')}
            label="Lead Actor" 
            placeholder="Lead Actor" 
            value={formValues.leadActor} 
            onChange={handleOnChange('leadActor')}
          />
          <Form.Group widths="equal">
            <Form.Field>
              <label>Box Office Earnings</label>
              <Input 
                onFocus={() => handleOnFocus('boxOfficeTake', true)}
                onBlur={() => handleOnFocus('boxOfficeTake', false)} 
                error={errorCheck('boxOfficeTake')}
                placeholder="Earnings" 
                labelPosition ="right" 
                value={formValues.boxOfficeTake} 
                onChange={handleOnChange('boxOfficeTake')}
              >
                <Label>£</Label>  
                <input />
                <Label>Million</Label>
              </Input>
            </Form.Field>
            <Form.Field>
              <label>UK Release Date</label>
              <input 
                type="date" 
                onFocus={() => handleOnFocus('ukRelease', true)}
                onBlur={() => handleOnFocus('ukRelease', false)} 
                error={errorCheck('ukRelease')}
              />
            </Form.Field>
          </Form.Group>
          <Form.Input 
            onFocus={() => handleOnFocus('imageURL', true)}
            onBlur={() => handleOnFocus('imageURL', false)} 
            error={errorCheck('imageURL')}
            label="Image URL" 
            placeholder="Image path" 
            value={formValues.imageURL} 
            onChange={handleOnChange('imageURL')} 
          />
          <Form.Field>
            <label>Description</label>
            <TextArea
              onFocus={() => handleOnFocus('description', true)}
              onBlur={() => handleOnFocus('description', false)} 
              error={errorCheck('description')} 
              placeholder="Film Description"
              value={formValues.description} 
              onChange={handleOnChange('description')} 
                />
          </Form.Field>
          <Form.Checkbox label="Favorite" toggle checked={formValues.favorite} onChange={handleOnChange('favorite')}/>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={onCloseModal}>Cancel</Button>
        <Button onClick={onSave} primary>
          <Icon name="save" />
          Save
        </Button>
      </Modal.Actions>
    </Modal>
  </>
  )
}