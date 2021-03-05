import React from 'react';
import { Card, Col, Row } from 'antd';
import ProfileForm from '../../components/Form/ProfileForm/ProfileForm';
import ChangePasswordProfileForm from '../../components/Form/ProfileForm/ChangePasswordProfileForm/ChangePasswordProfileForm';

const Profile = (props) => {
  return (
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
      <Col className="gutter-row" span={12}>
        <Card title="Informasi Profil">
          <ProfileForm wrapperCol={{ span: 14 }} />
        </Card>
      </Col>
      
      <Col className="gutter-row" span={12}>
        <Card title="Ubah Password">
          <ChangePasswordProfileForm wrapperCol={{ span: 14 }} />
        </Card>
      </Col>
    </Row>
  );
}

export default Profile;
