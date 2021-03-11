import React, { useEffect, useState } from 'react';
import { Card, Col, Descriptions, Form, message, Row } from 'antd';
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

  const renderInfo = () => {
    if (!user) return null;

    const { role } = user;

    if (role === 'owner') {
      return (
        <Descriptions.Item label="Outlet">
          <ul style={{ padding: 0, margin: 0, listStyleType: 'none' }}>
            {user.outlets.map(outlet => <li key={outlet.id}>{'- ' + outlet.name}</li>)}
          </ul>
        </Descriptions.Item>
      )
    } else if (role === 'cashier') {
      return (
        <Descriptions.Item label="Outlet">
          {user.outlets[0].name}
        </Descriptions.Item>
      )
    }

    return null;
  }

  return (
    <Row gutter={[32, 32]}>
      <Col className="gutter-row" span={14}>
        <Card title="Ubah Profil">
          <ProfileForm 
            form={profileForm} 
            onFinish={handleSubmitProfile} 
            loading={loading}
            submitLoading={submitLoading} />
        </Card>
      </Col>
      <Col className="gutter-row" span={10}>
        <Card title="Infomasi Akun">
          <Descriptions
            bordered
            column={1}
            size="small"
          >
            <Descriptions.Item label="Role">{user?.role}</Descriptions.Item>
            {renderInfo()}
          </Descriptions>
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
