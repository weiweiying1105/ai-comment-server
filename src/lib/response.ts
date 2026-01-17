import { NextResponse } from 'next/server';

// 响应状态码常量
export const ResponseCode = {
    // ===== HTTP 通用状态码 =====
    SUCCESS: 200,           // 请求成功
    CREATED: 201,           // 资源创建成功
    BAD_REQUEST: 400,       // 请求参数错误
    UNAUTHORIZED: 401,      // 未认证（未登录或 token 无效）
    FORBIDDEN: 403,         // 已认证，但没有权限
    NOT_FOUND: 404,         // 请求的资源不存在
    INTERNAL_ERROR: 500,    // 服务器内部错误

    // ===== 业务自定义状态码 =====
    LOGIN_SUCCESS: 1000,    // 登录成功
    LOGIN_FAILED: 1001,     // 登录失败（账号或密码错误）
    USER_NOT_FOUND: 1002,   // 用户不存在
    INVALID_CODE: 1003,     // 验证码无效（例如短信/邮箱验证码错误）
    WECHAT_API_ERROR: 1004, // 微信接口调用失败
    TOKEN_EXPIRED: 1005,    // token 过期，需要重新登录
    PERMISSION_DENIED: 1006 // 拒绝访问，没有对应的业务权限
} as const;


// 响应消息常量
export const ResponseMessage = {
    SUCCESS: '操作成功',
    CREATED: '创建成功',
    BAD_REQUEST: '请求参数错误',
    UNAUTHORIZED: '未授权访问',
    FORBIDDEN: '禁止访问',
    NOT_FOUND: '资源不存在',
    INTERNAL_ERROR: '服务器内部错误',

    // 业务消息
    LOGIN_SUCCESS: '登录成功',
    LOGIN_FAILED: '登录失败',
    USER_NOT_FOUND: '用户不存在',
    INVALID_CODE: '无效的授权码',
    WECHAT_API_ERROR: '微信接口调用失败',
    TOKEN_EXPIRED: 'Token已过期',
    PERMISSION_DENIED: '权限不足',
} as const;

// 统一响应接口
export interface ApiResponse<T = unknown> {
    code: number;
    message: string;
    data: T | null;
    timestamp?: number;
}

// 响应工具类
export class ResponseUtil {
    /**
     * NOTE ：
     * 1）非static属性和方法是定义在原型（prototype）上的
     * 2）加了static的属性和方法在类本身身上，不在原型链对象上
     */



    /**
     * 
     * @param data 
     * @param message 
     * @param code 
     * @returns 
     */
    /**
     * 成功响应
     */
    static success<T>(data: T, message: string = ResponseMessage.SUCCESS, code: number = ResponseCode.SUCCESS): ApiResponse<T> {
        return {
            code,
            message,
            data,
            timestamp: Date.now()
        };
    }

    /**
     * 失败响应
     */
    static error(message: string, code: number = ResponseCode.BAD_REQUEST, data: unknown = null): ApiResponse {
        return {
            code,
            message,
            data,
            timestamp: Date.now()
        };
    }

    /**
     * 登录成功响应
     */
    static loginSuccess(data: unknown): ApiResponse {
        return this.success(data, ResponseMessage.LOGIN_SUCCESS, ResponseCode.LOGIN_SUCCESS);
    }

    /**
     * 登录失败响应
     */
    static loginFailed(message: string = ResponseMessage.LOGIN_FAILED): ApiResponse {
        return this.error(message, ResponseCode.LOGIN_FAILED);
    }

    /**
     * 无效授权码响应
     */
    static invalidCode(): ApiResponse {
        return this.error(ResponseMessage.INVALID_CODE, ResponseCode.INVALID_CODE);
    }

    /**
     * 微信API错误响应
     */
    static wechatApiError(message: string = ResponseMessage.WECHAT_API_ERROR): ApiResponse {
        return this.error(message, ResponseCode.WECHAT_API_ERROR);
    }

    /**
     * 服务器错误响应
     */
    static serverError(message: string = ResponseMessage.INTERNAL_ERROR): ApiResponse {
        return this.error(message, ResponseCode.INTERNAL_ERROR);
    }

    /**
     * 未授权响应
     */
    static unauthorized(message: string = ResponseMessage.UNAUTHORIZED): ApiResponse {
        return this.error(message, ResponseCode.UNAUTHORIZED);
    }

    /**
     * 资源不存在响应
     */
    static notFound(message: string = ResponseMessage.NOT_FOUND): ApiResponse {
        return this.error(message, ResponseCode.NOT_FOUND);
    }
}

// 创建带有正确Content-Type和CORS头的NextResponse
export function createJsonResponse(data: any, options?: ResponseInit) {
    return NextResponse.json(data, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*', // 允许所有来源访问，生产环境可配置为特定域名
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS', // 允许的HTTP方法
            'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With', // 允许的请求头
            ...options?.headers
        }
    });
}