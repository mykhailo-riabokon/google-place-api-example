import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Input } from 'antd';

function RequestApiKeyModal(props) {
  const { getFieldDecorator, validateFields } = props.form;
  const onOk = () => {
    validateFields((errors, values) => {
      if (!errors) {
        props.onSaveKey(values.apiKey);
      }
    });
  };

  return (
    <Modal
      title="Set Google API key"
      closable={false}
      visible={props.visible}
      okText="Save key"
      onOk={onOk}
      cancelButtonProps={{ style: { display: 'none' } }}
    >
      <p>
        Plase provide your own API key in order to try an example. You can find more details by this{' '}
        <a href="https://developers.google.com/places/web-service/get-api-key">link</a>.
      </p>
      <p>
        Key will be saved in your <code>localStorage</code>
      </p>
      <Form onSubmit={(event) => event.preventDefault()}>
        <Form.Item label="Api key" required>
          {getFieldDecorator('apiKey', {
            rules: [
              {
                required: true,
                message: 'Please specify API key',
              },
            ],
          })(<Input placeholder="Please specify API key" />)}
        </Form.Item>
      </Form>
    </Modal>
  );
}

RequestApiKeyModal.propTypes = {
  visible: PropTypes.bool,
  onSaveKey: PropTypes.func.isRequired,
  form: PropTypes.shape({
    getFieldDecorator: PropTypes.func.isRequired,
    validateFields: PropTypes.func.isRequired,
  }).isRequired,
};

export default Form.create()(RequestApiKeyModal);
