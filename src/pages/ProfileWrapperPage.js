import React from 'react';
import 'antd/dist/antd.css';
import * as auth from "../services/auth";
import { useHistory } from 'react-router-dom';

function ProfileWrapperPage() {
    const history = useHistory();

    if (auth.me()) {
        history.push('/profile');
    } else {
        history.push('/login');
    }

    return (<div/>);
}

export default ProfileWrapperPage;