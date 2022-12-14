//第一次安装注册页面
export const setupFormRule: any[] = [
  {
    type: 'input',
    field: 'customerName',
    title: '用户名',
    info: '',
    props: {
      type: 'text',
      placeholder: '请输入用户名',
      prefixIcon: 'User',
    },
    _fc_drag_tag: 'input',
    hidden: false,
    display: true,
    $required: '请输入用户名',
    value: 'iotmaster@iotsharp.net',
  },
  {
    type: 'input',
    field: 'email',
    title: '邮箱',
    info: '',
    props: {
      type: 'text',
      placeholder: '请输入邮箱',
      showPassword: false,
      prefixIcon: 'Message',
    },
    _fc_drag_tag: 'input',
    hidden: false,
    display: true,
    validate: [
      {
        trigger: 'change',
        message: '请输入正确的邮箱',
        pattern: '/^[a-z0-9]+([._\\\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/',
        type: 'email',
        required: true,
      },
    ] ,
  },
  {
    type: 'input',
    field: 'password',
    title: '密码',
    info: '',
    props: {
      placeholder: '请输入密码',
      showPassword: true,
      prefixIcon: 'Lock',
      type: 'password',
    },
    _fc_drag_tag: 'input',
    hidden: false,
    display: true,
    value: '',
    validate: [
      {
        trigger: 'change',
        mode: 'required',
        message: '请输入密码',
        required: true,
        type: 'string',
      },
    ],
  },
  {
    type: 'input',
    field: 'passwordCheck',
    title: '密码确认',
    info: '',
    props: {
      placeholder: '请再次输入密码',
      showPassword: true,
      prefixIcon: 'Lock',
      type: 'password',
    },
    _fc_drag_tag: 'input',
    hidden: false,
    display: true,
    value: '',
    validate: [],
  },
]
