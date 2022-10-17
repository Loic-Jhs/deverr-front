import React, { useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from 'react-router-dom';
import superagent from 'superagent';
import { yupResolver } from '@hookform/resolvers/yup';
import schema from './loginValidation';
import './login.scss';
import LoginInput from '../../models/loginInput';

const Login = () => {
  const [loginInput, setLoginInput] = useState<LoginInput>({
    email: "",
    password: "",
  });

}

export default Login