import { authHost } from '@/config'
import { Token } from '@/interfaces/token'
import auth from '@/utils/auth'
import request from '@/utils/request'
import { stringify } from 'qs'

interface LoginParam {
  mobilePhone: string
  countryCode: string
  password: string
  applicationId: string
}

/**
 * 用户登录
 *
 * @export
 * @param {LoginParam} body
 * @returns {Promise<Token>}
 */
export function userLogin(body: LoginParam): Promise<Token> {
  return request.post('/auth/login/normal', {
    body: stringify(body),
    baseURL: authHost,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Core-Token': null,
    },
  })
}

/**
 * 刷新 Token
 *
 * @export
 * @param {string} refreshToken
 * @returns {Promise<Token>}
 */
export async function refreshAccessToken(refreshToken: string): Promise<Token> {
  const accessToken = await request.get('/api/token/refresh/{refreshToken}', {
    headers: {
      'Core-Token': auth.getAuthorization(),
    },
    params: {
      refreshToken,
    },
  })
  return {
    refreshToken,
    accessToken,
  }
}

interface SendCodeParam {
  countryCode: string
  mobilePhone: string
  applicationId: string
  captcha: string
  type: 0 | 1 // 0 注册， 1 重置
}

/**
 * 发送短信验证码
 *
 * @export
 * @param {SendCodeParam} data
 * @returns {Promise<any>}
 */
export function sendCode(data: SendCodeParam): Promise<any> {
  const { type, captcha, ...restData } = data
  const url = type ? '/auth/forget/code/send' : '/auth/register/code/send'
  return request.post(url, {
    body: stringify(restData),
    baseURL: authHost,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      verification: captcha,
      'Core-Token': null,
    },
  })
}

interface CheckCodeParam {
  countryCode: string
  mobilePhone: string
  applicationId: string
  smsCode: string
}

/**
 * 验证短信验证码
 *
 * @export
 * @param {CheckCodeParam} data
 * @returns {Promise<any>}
 */
export function checkCode(data: CheckCodeParam): Promise<any> {
  return request.post('/auth/register/code/check', {
    body: stringify(data),
    baseURL: authHost,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Core-Token': null,
    },
  })
}

interface SignupParam {
  countryCode: string
  mobilePhone: string
  applicationId: string
  password: string
}

/**
 * 注册用户
 *
 * @export
 * @param {SignupParam} data
 * @returns {Promise<any>}
 */
export async function userSignup(data: SignupParam): Promise<any> {
  return request.post('/auth/register/save', {
    body: stringify(data),
    baseURL: authHost,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Core-Token': null,
    },
  })
}
interface ResetParam {
  countryCode: string
  mobilePhone: string
  applicationId: string
  newPassword: string
}

/**
 * 重置密码
 *
 * @export
 * @param {ResetParam} data
 * @returns {Promise<any>}
 */
export async function resetPassword(data: ResetParam): Promise<any> {
  return request.post('/auth/forget/password/reset', {
    body: stringify(data),
    baseURL: authHost,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Core-Token': null,
    },
  })
}
