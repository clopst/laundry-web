import React, { useEffect, useState } from 'react';
import { Card, Col, Form, message, Row } from 'antd';
import ProfileForm from '../../components/Form/ProfileForm/ProfileForm';
import ChangePasswordProfileForm from '../../components/Form/ProfileForm/ChangePasswordProfileForm/ChangePasswordProfileForm';
import { useAuthContext } from '../../context/AuthContext';
import { changePassword, updateProfile } from '../../services/auth';
import handleError from '../../helpers/handleError';


const Profile = (props) => {
  const { user, updateUser } = useAuthContext();

  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const [profileForm] = Form.useForm();
  const [changePasswordForm] = Form.useForm();

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchUser = () => {
    setLoading(true);
    updateUser(() => {
      setLoading(false);
      profileForm.setFieldsValue({
        ...user,
        avatar_path: null
      });
    });
  }

  const handleSubmitProfile = (values) => {
    setSubmitLoading(true);
    updateProfile(values)
      .then(res => {
        message.success('Berhasil mengubah data profil');
        updateUser();
      })
      .catch(err => handleError(err))
      .finally(() => setSubmitLoading(false));
  }

  const handleSubmitChangePassword = (values) => {
    setSubmitLoading(true);
    changePassword(values)
      .then(res => {
        message.success('Berhasil mengubah password');
        changePasswordForm.resetFields();
      })
      .catch(err => handleError(err))
      .finally(() => setSubmitLoading(false));
  }

  return (
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
      <Col className="gutter-row" span={14}>
        <Card title="Informasi Profil">
          <ProfileForm 
            form={profileForm} 
            onFinish={handleSubmitProfile} 
            loading={loading}
            submitLoading={submitLoading} />
        </Card>
      </Col>
      <Col className="gutter-row" span={10}>
        <Card title="Ubah Password">
          <ChangePasswordProfileForm 
            form={changePasswordForm}
            onFinish={handleSubmitChangePassword}
            submitLoading={submitLoading} />
        </Card>
      </Col>
    </Row>
  );
}

export default Profile;
