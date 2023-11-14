type valueKey='account'|'password'|'name'|'schoolName';


export const loginItem = [
    { icon: "User", model: "account" as valueKey, placeholder: "帐号"},
    {icon: "Lock", model: "password" as valueKey, placeholder: "密码"}
]



export const registerItem = [
    {icon:'User',model:'name' as valueKey,placeholder:'姓名'},
    {icon:'School',model:'schoolName' as valueKey,placeholder:'学校名称'},
    { icon: "User", model: "account" as valueKey, placeholder: "帐号"},
    {icon: "Lock", model: "password" as valueKey, placeholder: "密码"},

]