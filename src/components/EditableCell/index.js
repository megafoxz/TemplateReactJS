import React, { useState, useEffect, useRef } from 'react';
import { Input,  Form } from 'antd';
import 'moment/dist/locale/vi';
import moment from 'moment';
import './editTableCell.scss'
import _ from 'lodash'

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  isTime,
  handleSave,
  form,
  componentInput,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  
  
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };


  const save = async () => {
    if(form){
      const values = await form.validateFields();
      if(values && !_.isEmpty(values)) {
        //validate if user click then blur, not passing params or edit
        let arr = []
        Object.keys(values).map(key => {
          if(values[key])
            arr.push(key)
        })
        if(arr.length === 0) {
          setEditing(!editing);
          return
        }
        else {
          if(values.customerRecordCheckExpiredDate) {
            values.customerRecordCheckExpiredDate = moment(values.customerRecordCheckExpiredDate, "DD/MM/YYYY").format('DD/MM/YYYY')
          }
          const isUpdated = handleSave({ 
            ...record, 
            ...values
          });
          if(isUpdated) {
            toggleEdit()
          }
        }
        
      }
    }
  };

  let childNode = children;
  
  if(children && typeof children[1] === 'string') {
    if(children[1].split('/').length === 3) {
      form.setFieldsValue({
        customerRecordCheckExpiredDate: moment(children, 'DD/MM/YYYY')
      })
    } else if(children[1] === 'Invalid date') {
      form.setFieldsValue({
        customerRecordCheckExpiredDate: moment()
      })
    }
  }

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
      >
        {
          componentInput ? componentInput(inputRef, save) : <Input ref={inputRef} onPressEnter={save} onBlur={save} />
        }
      </Form.Item>
    ) : (
      <div
        className={`editable-cell-value-wrap ${!record[dataIndex] ? 'editable-cell__wrap_null' : 'editable-cell__wrap'}` }
        style={{
          paddingRight: 24
        }}
        onClick={() => {
          toggleEdit()
        }}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

export default EditableCell