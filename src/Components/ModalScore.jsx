import { Button, Modal } from "antd";
import React, { useState } from "react";
import "./ModalScore.css";

export default function ModalScore(props) {
  return (
    <>
      <Modal
        title="Your Score"
        open={props.isModalOpen}
        onOk={props.handleOk}
        onCancel={props.handleCancel}
        footer={[
          <Button type="primary" onClick={props.handleOk}>
            Oke
          </Button>,
        ]}
      >
        <div className="wrap-score">
         

          <div className="score">
            <h1>{((100/props.length)*(props.answer)).toFixed()}</h1>
          </div>
        </div>
      </Modal>
    </>
  );
}
