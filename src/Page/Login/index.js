import React from 'react';
import { useTranslation } from 'react-i18next'
import './login.scss'
import { handleSignin } from "../../actions"
import { useDispatch } from 'react-redux';
import { Form, Input, Button, notification } from 'antd';
import LoginService from '../../services/loginService';

function Login(props) {
	const { t: translation } = useTranslation()
	const { history } = props

	 const dispatch = useDispatch()

	const onFinish = (values) => {
		LoginService.Signin(values).then((result) => {
			if(!result) {
				notification['error']({
					message: '',
					description: translation('landing.loginFail')
				})
				return
			}

			let data = Object.keys(result).length
			if(data > 0) {
				dispatch(handleSignin(result))
				history.push('/')
			} else {
				notification['error']({
					message: '',
					description: translation('landing.loginFail')
				})
			}

		})
	}

	return (
		<main  className="login">
					<div className="login_form__title">{translation('landing.login')}</div>
						<Form
							name="login"
							autoComplete="off"
							onFinish={onFinish}
						>
							<div className="row d-flex justify-content-center">
							<Form.Item
								name="username"
								rules={[
									{
										required: true,
										message: translation('landing.invalidAccount'),
									},
								]}
								className="col-12 col-md-6 col-lg-4"
							>
								<Input
									placeholder={translation('landing.account')}
									type="text"
									size="large"
								/>
							</Form.Item>
							</div>
							
							<div className="row d-flex justify-content-center">
							<Form.Item
								name="password"
								rules={[
									{
										required: true,
										message: translation('landing.invalidPassword'),
									},
								]}
								className="col-12 col-md-6 col-lg-4"
							>
								<Input
									type="password"
									placeholder={translation('landing.password')}
									size="large"
								/>
							</Form.Item>
							</div>
							<div className="w-100 d-flex justify-content-center">
								<Form.Item>
									<Button
										className="login-btn blue_button"
										data-loading-text={translation('landing.processing')}
										htmlType="submit"
										size="large"
									>
										{translation('landing.login')}
									</Button>
								</Form.Item>
							</div>
						</Form>
		</main>
	)
}
export default Login;